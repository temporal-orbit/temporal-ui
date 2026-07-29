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
	/**
	 * Whether the select currently has a selected value.
	 * When true, alignment waits until `selectedItem` is present in the DOM.
	 */
	hasValue?: boolean;
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

function triggerHasSelectedValue(trigger: HTMLElement): boolean {
	if (trigger.getAttribute("data-placeholder-shown") != null) return false;
	const valueText = trigger.querySelector<HTMLElement>('[data-part="value-text"]');
	if (!valueText) return false;
	return valueText.getAttribute("data-placeholder-shown") == null && (valueText.textContent?.trim().length ?? 0) > 0;
}

function isAlignmentReady(
	content: HTMLElement,
	trigger: HTMLElement,
	selectedItem: HTMLElement | null,
	hasValue?: boolean,
) {
	const scroller = getSelectScroller(content);
	const hasItems = content.querySelector('[data-part="item"]') != null;
	if (!hasItems || scroller.scrollHeight === 0) return false;
	const expectsSelection = hasValue ?? triggerHasSelectedValue(trigger);
	if (expectsSelection && !selectedItem) return false;
	if (selectedItem && selectedItem.offsetHeight <= 0) return false;
	return true;
}

function isSelectedItemInView(scroller: HTMLElement, selectedItem: HTMLElement): boolean {
	const top = selectedItem.offsetTop;
	const bottom = top + selectedItem.offsetHeight;
	const viewTop = scroller.scrollTop;
	const viewBottom = viewTop + scroller.clientHeight;
	return top >= viewTop - SCROLL_EDGE_TOLERANCE && bottom <= viewBottom + SCROLL_EDGE_TOLERANCE;
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
		hasValue,
		overflowPadding = DEFAULT_OVERFLOW_PADDING,
		maxHeight,
	} = options;

	const scroller = getSelectScroller(content);
	const ready = isAlignmentReady(content, trigger, selectedItem, hasValue);
	let alreadyAligned = content.dataset.linearAligned === "true";

	if (!ready && !alreadyAligned) {
		return getSelectScrollState(scroller);
	}

	// Unlock if layout finished later and the selected row is no longer in view.
	if (
		alreadyAligned &&
		selectedItem &&
		scroller.clientHeight > 0 &&
		!isSelectedItemInView(scroller, selectedItem)
	) {
		alreadyAligned = false;
		content.removeAttribute("data-linear-aligned");
	}

	const triggerRect = trigger.getBoundingClientRect();
	const viewportHeight = document.documentElement.clientHeight;
	const viewportWidth = document.documentElement.clientWidth;
	const availableHeight = Math.max(0, viewportHeight - overflowPadding * 2);

	content.style.height = "auto";
	content.style.maxHeight = "none";
	scroller.style.height = "auto";
	scroller.style.maxHeight = "none";
	const fullHeight = Math.max(scroller.scrollHeight, scroller.offsetHeight);

	const constrainedHeight = Math.min(
		fullHeight,
		availableHeight,
		maxHeight ?? Number.POSITIVE_INFINITY,
	);
	const needsScroll = fullHeight > constrainedHeight + SCROLL_EDGE_TOLERANCE;

	content.style.maxHeight = `${constrainedHeight}px`;
	content.style.height = needsScroll ? `${constrainedHeight}px` : "auto";

	const positionerRect = positioner.getBoundingClientRect();
	const currentY = parseFloat(positioner.style.getPropertyValue("--y") || "0") || 0;
	const currentX = parseFloat(positioner.style.getPropertyValue("--x") || "0") || 0;

	if (!alreadyAligned) {
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

		const deltaY = nextTop - positionerRect.top;
		const nextY = currentY + deltaY;
		positioner.style.setProperty("--y", `${nextY}px`);
		content.dataset.linearY = `${nextY}px`;

		if (!selectedItem || isSelectedItemInView(scroller, selectedItem)) {
			content.dataset.linearAligned = "true";
		}
	} else if (content.dataset.linearY) {
		positioner.style.setProperty("--y", content.dataset.linearY);
	}

	let nextLeft = positionerRect.left;
	const minLeft = overflowPadding;
	const maxLeft = viewportWidth - (positionerRect.width || content.offsetWidth) - overflowPadding;
	if (nextLeft < minLeft) {
		nextLeft = minLeft;
	} else if (nextLeft > maxLeft) {
		nextLeft = Math.max(minLeft, maxLeft);
	}
	const deltaX = nextLeft - positionerRect.left;
	if (!alreadyAligned || deltaX !== 0) {
		const nextX = currentX + deltaX;
		positioner.style.setProperty("--x", `${nextX}px`);
		content.dataset.linearX = `${nextX}px`;
	} else if (content.dataset.linearX) {
		positioner.style.setProperty("--x", content.dataset.linearX);
	}

	const state = getSelectScrollState(scroller);
	content.dispatchEvent(
		new CustomEvent("temporal-ui:select-aligned", {
			bubbles: true,
			detail: state,
		}),
	);
	return state;
}

/** Clears one-shot alignment state so the next open can re-align to the selection. */
export function resetSelectLinearAlignment(content: HTMLElement | null | undefined) {
	content?.removeAttribute("data-linear-aligned");
	content?.removeAttribute("data-linear-y");
	content?.removeAttribute("data-linear-x");
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
