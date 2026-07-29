const DEFAULT_OVERFLOW_PADDING = 8;
const SCROLL_EDGE_TOLERANCE = 1;

export interface AlignSelectDropdownOptions {
	/** Floating positioner element (`[data-part="positioner"]`). */
	positioner: HTMLElement;
	/** Select content element (`[data-part="content"]`). */
	content: HTMLElement;
	/** Select trigger element. */
	trigger: HTMLElement;
	/**
	 * Currently selected item element, if any.
	 * When omitted, the menu aligns to the top of the trigger (first-item style).
	 */
	selectedItem?: HTMLElement | null;
	/** Viewport edge padding in CSS pixels. @default 8 */
	overflowPadding?: number;
	/** Optional hard cap on menu height (in addition to viewport). */
	maxHeight?: number;
}

export interface AlignSelectDropdownResult {
	canScrollUp: boolean;
	canScrollDown: boolean;
}

function getSelectScroller(content: HTMLElement): HTMLElement {
	return content.querySelector<HTMLElement>('[data-component="select"][data-slot="list"]') ?? content;
}

/**
 * Positions a select dropdown Linear-style: the menu overlays the trigger and
 * the selected item is vertically aligned with it, clamped to the viewport.
 */
export function alignSelectDropdown(options: AlignSelectDropdownOptions): AlignSelectDropdownResult {
	const {
		positioner,
		content,
		trigger,
		selectedItem = null,
		overflowPadding = DEFAULT_OVERFLOW_PADDING,
		maxHeight,
	} = options;

	const scroller = getSelectScroller(content);
	const triggerRect = trigger.getBoundingClientRect();
	const viewportHeight = document.documentElement.clientHeight;
	const viewportWidth = document.documentElement.clientWidth;
	const availableHeight = Math.max(0, viewportHeight - overflowPadding * 2);

	content.style.height = "auto";
	content.style.maxHeight = "none";
	scroller.style.maxHeight = "none";
	const fullHeight = scroller.scrollHeight;

	const constrainedHeight = Math.min(
		fullHeight,
		availableHeight,
		maxHeight ?? Number.POSITIVE_INFINITY,
	);
	const needsScroll = fullHeight > constrainedHeight + SCROLL_EDGE_TOLERANCE;

	content.style.maxHeight = `${constrainedHeight}px`;
	content.style.height = needsScroll ? `${constrainedHeight}px` : "auto";

	const itemOffset = selectedItem?.offsetTop ?? 0;
	let nextTop = triggerRect.top - itemOffset;
	let scrollTop = 0;

	const minTop = overflowPadding;
	const maxTop = viewportHeight - constrainedHeight - overflowPadding;

	if (nextTop < minTop) {
		scrollTop = minTop - nextTop;
		nextTop = minTop;
	} else if (nextTop > maxTop) {
		nextTop = Math.max(minTop, maxTop);
	}

	scroller.scrollTop = scrollTop;

	if (selectedItem) {
		const itemTop = selectedItem.offsetTop;
		const itemBottom = itemTop + selectedItem.offsetHeight;
		if (itemTop < scroller.scrollTop) {
			scroller.scrollTop = itemTop;
		} else if (itemBottom > scroller.scrollTop + constrainedHeight) {
			scroller.scrollTop = itemBottom - constrainedHeight;
		}
	}

	const positionerRect = positioner.getBoundingClientRect();
	const currentY = parseFloat(positioner.style.getPropertyValue("--y") || "0") || 0;
	const currentX = parseFloat(positioner.style.getPropertyValue("--x") || "0") || 0;

	const deltaY = nextTop - positionerRect.top;
	positioner.style.setProperty("--y", `${currentY + deltaY}px`);

	const menuWidth = positionerRect.width || content.offsetWidth;
	let nextLeft = positionerRect.left;
	const minLeft = overflowPadding;
	const maxLeft = viewportWidth - menuWidth - overflowPadding;
	if (nextLeft < minLeft) {
		nextLeft = minLeft;
	} else if (nextLeft > maxLeft) {
		nextLeft = Math.max(minLeft, maxLeft);
	}
	const deltaX = nextLeft - positionerRect.left;
	if (deltaX !== 0) {
		positioner.style.setProperty("--x", `${currentX + deltaX}px`);
	}

	return getSelectScrollState(scroller);
}

export function getSelectScrollState(scroller: HTMLElement): AlignSelectDropdownResult {
	const maxScrollTop = Math.max(0, scroller.scrollHeight - scroller.clientHeight);
	const scrollTop = scroller.scrollTop;
	return {
		canScrollUp: scrollTop > SCROLL_EDGE_TOLERANCE,
		canScrollDown: scrollTop < maxScrollTop - SCROLL_EDGE_TOLERANCE,
	};
}

/**
 * Resolves the trigger that controls a select content element via `aria-controls`.
 */
export function getSelectTriggerForContent(content: HTMLElement): HTMLElement | null {
	if (!content.id) return null;
	return document.querySelector<HTMLElement>(
		`[data-scope="select"][data-part="trigger"][aria-controls="${CSS.escape(content.id)}"]`,
	);
}

export function getSelectedSelectItem(content: HTMLElement): HTMLElement | null {
	return content.querySelector<HTMLElement>('[data-part="item"][data-state="checked"]');
}

export function getSelectContentScroller(content: HTMLElement): HTMLElement {
	return getSelectScroller(content);
}

export const SELECT_LINEAR_POSITIONING = {
	placement: "bottom-start" as const,
	gutter: 0,
	overlap: true,
	flip: false,
	slide: true,
	fitViewport: true,
	overflowPadding: DEFAULT_OVERFLOW_PADDING,
};
