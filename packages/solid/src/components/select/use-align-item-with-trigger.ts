import type { useSelectContext } from "@ark-ui/solid/select";
import {
	ALIGN_ITEM_WITH_TRIGGER_MAX_RETRIES,
	alignItemWithTriggerFallbackPositioning,
	areAlignItemWithTriggerStylesEqual,
	computeAlignItemWithTrigger,
	querySelectedItemEl,
	type AlignItemWithTriggerStyles,
} from "@temporal-ui/core/select";
import { createEffect, createMemo, createSignal, onCleanup, untrack } from "solid-js";
import type { SelectContentProps } from "./SelectContent";

function runAfterLayout(callback: () => void) {
	requestAnimationFrame(() => {
		requestAnimationFrame(callback);
	});
}

/** Solid's `style` binding drops camelCase keys; convert to kebab-case. */
function toKebabStyles(styles: Record<string, string>): Record<string, string> {
	return Object.fromEntries(
		Object.entries(styles).map(([key, value]) => [
			key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`),
			value,
		]),
	);
}

function toSolidStyles(styles: AlignItemWithTriggerStyles): AlignItemWithTriggerStyles {
	return {
		positioner: toKebabStyles(styles.positioner),
		popup: toKebabStyles(styles.popup),
		content: toKebabStyles(styles.content),
		scrollTop: styles.scrollTop,
	};
}

export function useAlignItemWithTrigger(
	context: ReturnType<typeof useSelectContext>,
	props: () => Pick<
		SelectContentProps,
		"alignItemWithTrigger" | "alignItemWithTriggerMinHeight" | "openedWithTouch" | "selectIds"
	>,
) {
	const [alignedStyles, setAlignedStyles] = createSignal<AlignItemWithTriggerStyles | undefined>();
	const [alignEpoch, setAlignEpoch] = createSignal(0);
	const [readyEpoch, setReadyEpoch] = createSignal(0);
	const isOpen = createMemo(() => context().open);
	let sessionCounter = 0;

	const shouldAlign = createMemo(() => {
		const currentProps = props();
		return (
			!!currentProps.alignItemWithTrigger &&
			!currentProps.openedWithTouch &&
			!untrack(() => context().multiple) &&
			!!currentProps.selectIds
		);
	});

	const isAlignPending = createMemo(
		() => shouldAlign() && isOpen() && readyEpoch() !== alignEpoch(),
	);

	const showAligned = createMemo(() => !!alignedStyles() && isOpen() && !isAlignPending());

	createEffect(() => {
		if (!isOpen()) {
			return;
		}

		const currentProps = untrack(props);
		if (
			!currentProps.alignItemWithTrigger ||
			currentProps.openedWithTouch ||
			untrack(() => context().multiple) ||
			!currentProps.selectIds
		) {
			return;
		}

		const session = ++sessionCounter;
		setAlignEpoch(session);
		setAlignedStyles(undefined);

		let cancelled = false;
		let retries = 0;

		const fallbackToStandardPlacement = () => {
			setAlignedStyles(undefined);
			setReadyEpoch(session);
			untrack(() => context()).reposition(alignItemWithTriggerFallbackPositioning);
		};

		const alignOnce = () => {
			if (cancelled || sessionCounter !== session) {
				return;
			}

			const ids = currentProps.selectIds;
			if (!ids) {
				fallbackToStandardPlacement();
				return;
			}

			const controlEl = document.getElementById(ids.control);
			const triggerEl = document.getElementById(ids.trigger);
			const valueTextEl = document.getElementById(ids.valueText);
			const positionerEl = document.getElementById(ids.positioner);
			const contentEl = document.getElementById(ids.content);

			if (!controlEl || !triggerEl || !valueTextEl || !positionerEl || !contentEl) {
				if (++retries >= ALIGN_ITEM_WITH_TRIGGER_MAX_RETRIES) {
					fallbackToStandardPlacement();
					return;
				}
				runAfterLayout(alignOnce);
				return;
			}

			const selectedItemEl = querySelectedItemEl(contentEl);
			if (!selectedItemEl) {
				fallbackToStandardPlacement();
				return;
			}

			const result = computeAlignItemWithTrigger({
				controlEl,
				triggerEl,
				valueTextEl,
				contentEl,
				positionerEl,
				selectedItemEl,
				minHeight: currentProps.alignItemWithTriggerMinHeight,
			});

			if (cancelled || sessionCounter !== session) {
				return;
			}

			if (result.status === "fallback") {
				fallbackToStandardPlacement();
				return;
			}

			const styles = toSolidStyles(result.styles);
			setAlignedStyles((current) =>
				areAlignItemWithTriggerStylesEqual(current, styles) ? current : styles,
			);
			setReadyEpoch(session);
		};

		queueMicrotask(() => {
			runAfterLayout(alignOnce);
		});

		onCleanup(() => {
			cancelled = true;
		});
	});

	// Scroll after the aligned styles are committed: the target offset is computed
	// for the final popup height and would be clamped by the pending max-height.
	createEffect(() => {
		const styles = alignedStyles();
		const ids = props().selectIds;
		if (!styles || !isOpen() || !ids) {
			return;
		}
		const contentEl = document.getElementById(ids.content);
		if (contentEl) {
			contentEl.scrollTop = styles.scrollTop;
		}
	});

	return { alignedStyles, isAlignPending, showAligned, shouldAlign };
}
