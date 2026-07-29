import type { AlignSelectDropdownResult } from "./align-select";
import { getSelectScrollState } from "./align-select";

const DEFAULT_SCROLL_STEP_PX = 6;
const DEFAULT_SCROLL_INTERVAL_MS = 16;

export interface StartSelectCaretAutoScrollOptions {
	scroller: HTMLElement;
	direction: "up" | "down";
	/** Pixels scrolled per tick. @default 6 */
	step?: number;
	/** Interval between ticks in ms. @default 16 */
	intervalMs?: number;
	onScroll?: (state: AlignSelectDropdownResult) => void;
}

/**
 * Starts continuous scrolling while a scroll caret is hovered.
 * Returns a stop function (also stops automatically at scroll edges).
 */
export function startSelectCaretAutoScroll(options: StartSelectCaretAutoScrollOptions): () => void {
	const {
		scroller,
		direction,
		step = DEFAULT_SCROLL_STEP_PX,
		intervalMs = DEFAULT_SCROLL_INTERVAL_MS,
		onScroll,
	} = options;

	const delta = direction === "up" ? -step : step;

	const tick = () => {
		const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
		const next = Math.min(maxScrollTop, Math.max(0, scroller.scrollTop + delta));
		scroller.scrollTop = next;
		const state = getSelectScrollState(scroller);
		onScroll?.(state);

		const atEdge = direction === "up" ? !state.canScrollUp : !state.canScrollDown;
		if (atEdge) {
			stop();
		}
	};

	const id = window.setInterval(tick, intervalMs);

	function stop() {
		window.clearInterval(id);
	}

	return stop;
}
