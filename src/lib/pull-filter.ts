type Listener = (brightness: number | null) => void;

const listeners = new Set<Listener>();

export function setPullFilter(brightness: number | null) {
	for (const listener of listeners) listener(brightness);
}

export function subscribePullFilter(listener: Listener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
