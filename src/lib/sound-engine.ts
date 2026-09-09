let audioContext: AudioContext | null = null;
const bufferCache = new Map<string, AudioBuffer>();

export function getAudioContext(): AudioContext {
	if (!audioContext) {
		audioContext = new AudioContext();
	}
	return audioContext;
}

// iOS only unlocks an AudioContext when resume() runs synchronously inside a
// discrete tap (click/touchend), not a drag. Call this directly from such a
// handler so later drag-triggered playback (already-running context) works.
export function unlockAudioContext(): void {
	const ctx = getAudioContext();
	if (ctx.state === "suspended") {
		void ctx.resume();
	}
}

// `fetch` handles both data: URIs and plain asset URLs identically, so this
// works whether `src` is a hand-written base64 data URI or a real file
// pulled in via `import x from "./foo.mp3"`.
export async function decodeAudioData(src: string): Promise<AudioBuffer> {
	const cached = bufferCache.get(src);
	if (cached) return cached;

	const ctx = getAudioContext();
	const arrayBuffer = await fetch(src).then((res) => res.arrayBuffer());
	const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
	bufferCache.set(src, audioBuffer);
	return audioBuffer;
}

export interface PlaySoundOptions {
	volume?: number;
	playbackRate?: number;
	onEnd?: () => void;
}

export interface SoundPlayback {
	stop: () => void;
}

export async function playSound(
	src: string,
	options: PlaySoundOptions = {},
): Promise<SoundPlayback> {
	const { volume = 1, playbackRate = 1, onEnd } = options;
	const ctx = getAudioContext();
	if (ctx.state === "suspended") {
		await ctx.resume();
	}

	const buffer = await decodeAudioData(src);
	const source = ctx.createBufferSource();
	const gain = ctx.createGain();

	source.buffer = buffer;
	source.playbackRate.value = playbackRate;
	gain.gain.value = volume;

	source.connect(gain);
	gain.connect(ctx.destination);

	source.onended = () => {
		onEnd?.();
	};

	source.start(0);

	return {
		stop: () => {
			try {
				source.stop();
			} catch {
				// No-op if already stopped.
			}
		},
	};
}
