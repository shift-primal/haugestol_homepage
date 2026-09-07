import switchOffUrl from "#/assets/sfx/switch-off.mp3";
import switchOnUrl from "#/assets/sfx/switch-on.mp3";
import { useSound } from "#/hooks/use-sound";
import type { SoundAsset } from "#/lib/sound-types";

const switchOnSound: SoundAsset = { name: "switch-on", src: switchOnUrl };
const switchOffSound: SoundAsset = { name: "switch-off", src: switchOffUrl };

const SOUNDS = {
	dragUp: switchOffSound,
	dragDown: switchOnSound,
};

export const useAppSound = () => {
	const [playDragDown] = useSound(SOUNDS.dragDown);
	const [playDragUp] = useSound(SOUNDS.dragUp);

	return {
		playDragDown,
		playDragUp,
	};
};
