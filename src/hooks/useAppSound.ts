import { useSound } from "#/hooks/use-sound";
import { switchOffSound } from "#/lib/switch-off";
import { switchOnSound } from "#/lib/switch-on";

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
