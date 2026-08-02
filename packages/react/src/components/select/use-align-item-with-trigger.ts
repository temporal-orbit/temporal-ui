import type { useSelectContext } from "@ark-ui/react/select";
import {
	ALIGN_ITEM_WITH_TRIGGER_MAX_RETRIES,
	alignItemWithTriggerFallbackPositioning,
	areAlignItemWithTriggerStylesEqual,
	computeAlignItemWithTrigger,
	querySelectedItemEl,
	type AlignItemWithTriggerStyles,
} from "@temporal-ui/core/select";
import { useLayoutEffect, useRef, useState } from "react";
import type { SelectContentProps } from "./SelectContent";

function runAfterLayout(callback: () => void) {
	requestAnimationFrame(() => {
		requestAnimationFrame(callback);
	});
}

export function useAlignItemWithTrigger(
	context: ReturnType<typeof useSelectContext>,
	props: Pick<
		SelectContentProps,
		"alignItemWithTrigger" | "alignItemWithTriggerMinHeight" | "openedWithTouch" | "selectIds"
	>,
) {
	const [alignedStyles, setAlignedStyles] = useState<AlignItemWithTriggerStyles | undefined>();
	const [alignEpoch, setAlignEpoch] = useState(0);
	const [readyEpoch, setReadyEpoch] = useState(0);
	const sessionRef = useRef(0);
	const propsRef = useRef(props);
	propsRef.current = props;

	const repositionRef = useRef(context.reposition);
	repositionRef.current = context.reposition;

	useLayoutEffect(() => {
		if (!context.open) {
			return;
		}

		const { alignItemWithTrigger, alignItemWithTriggerMinHeight, openedWithTouch, selectIds } =
			propsRef.current;

		if (!alignItemWithTrigger || openedWithTouch || context.multiple || !selectIds) {
			return;
		}

		sessionRef.current += 1;
		const session = sessionRef.current;
		setAlignEpoch(session);
		setAlignedStyles(undefined);

		let cancelled = false;
		let retries = 0;

		const fallbackToStandardPlacement = () => {
			setAlignedStyles(undefined);
			setReadyEpoch(session);
			repositionRef.current(alignItemWithTriggerFallbackPositioning);
		};

		const alignOnce = () => {
			if (cancelled || sessionRef.current !== session) {
				return;
			}

			const controlEl = document.getElementById(selectIds.control);
			const triggerEl = document.getElementById(selectIds.trigger);
			const valueTextEl = document.getElementById(selectIds.valueText);
			const positionerEl = document.getElementById(selectIds.positioner);
			const contentEl = document.getElementById(selectIds.content);

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
				minHeight: alignItemWithTriggerMinHeight,
			});

			if (cancelled || sessionRef.current !== session) {
				return;
			}

			if (result.status === "fallback") {
				fallbackToStandardPlacement();
				return;
			}

			setAlignedStyles((current) =>
				areAlignItemWithTriggerStylesEqual(current, result.styles) ? current : result.styles,
			);
			setReadyEpoch(session);
		};

		queueMicrotask(() => {
			runAfterLayout(alignOnce);
		});

		return () => {
			cancelled = true;
		};
	}, [context.open]);

	// Scroll after the aligned styles are committed: the target offset is computed
	// for the final popup height and would be clamped by the pending max-height.
	useLayoutEffect(() => {
		if (!alignedStyles || !context.open || !props.selectIds) {
			return;
		}
		const contentEl = document.getElementById(props.selectIds.content);
		if (contentEl) {
			contentEl.scrollTop = alignedStyles.scrollTop;
		}
	}, [alignedStyles, context.open, props.selectIds]);

	const shouldAlign = !!(
		props.alignItemWithTrigger &&
		!props.openedWithTouch &&
		!context.multiple &&
		props.selectIds
	);

	const isAlignPending = shouldAlign && context.open && readyEpoch !== alignEpoch;
	const showAligned = !!alignedStyles && context.open && !isAlignPending;

	return { alignedStyles, isAlignPending, showAligned, shouldAlign };
}
