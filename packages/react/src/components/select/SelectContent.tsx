import { Select as ArkSelect, useSelectContext } from "@ark-ui/react/select";
import type { SelectItem as CoreSelectItem } from "@temporal-ui/core/select";
import {
	alignSelectDropdown,
	getSelectedSelectItem,
	getSelectScrollState,
	getSelectTriggerForContent,
	resetSelectLinearAlignment,
	startSelectCaretAutoScroll,
	type AlignSelectDropdownResult,
} from "@temporal-ui/core/select";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

export type SelectItem<D = unknown> = CoreSelectItem<D, React.ReactNode>;

export interface SelectContentProps {
	tid: (str: string) => string | undefined;
	maxHeight?: number;
	classes?: {
		content?: string;
		itemGroup?: string;
		itemGroupLabel?: string;
		item?: string;
		itemText?: string;
		itemIndicator?: string;
		positioner?: string;
		scrollArea?: string;
		input?: string;
		scrollCaret?: string;
	};
}

export function SelectContent(props: SelectContentProps) {
	const { tid, maxHeight = 500, classes } = props;
	const context = useSelectContext();
	const contentRef = useRef<HTMLDivElement>(null);
	const listRef = useRef<HTMLDivElement>(null);
	const stopAutoScrollRef = useRef<(() => void) | null>(null);
	const [canScrollUp, setCanScrollUp] = useState(false);
	const [canScrollDown, setCanScrollDown] = useState(false);

	const applyScrollState = useCallback((state: AlignSelectDropdownResult) => {
		setCanScrollUp(state.canScrollUp);
		setCanScrollDown(state.canScrollDown);
	}, []);

	const syncScrollState = useCallback(() => {
		const list = listRef.current;
		if (!list) return;
		applyScrollState(getSelectScrollState(list));
	}, [applyScrollState]);

	const runLinearAlign = useCallback(() => {
		const content = contentRef.current;
		if (!content || content.hidden) return false;
		const positioner = content.closest<HTMLElement>('[data-part="positioner"]');
		const trigger = getSelectTriggerForContent(content);
		if (!positioner || !trigger) return false;

		const state = alignSelectDropdown({
			positioner,
			content,
			trigger,
			selectedItem: getSelectedSelectItem(content),
			hasValue: (context.value?.length ?? 0) > 0,
			maxHeight,
		});
		applyScrollState(state);
		return content.dataset.linearAligned === "true";
	}, [applyScrollState, context.value, maxHeight]);

	useLayoutEffect(() => {
		if (!context.open) {
			setCanScrollUp(false);
			setCanScrollDown(false);
			stopAutoScrollRef.current?.();
			stopAutoScrollRef.current = null;
			resetSelectLinearAlignment(contentRef.current);
			return;
		}

		// Clear any premature lock from floating-ui's first paint, then align.
		resetSelectLinearAlignment(contentRef.current);

		let retries = 0;
		let frame = 0;
		const tryAlign = () => {
			if (runLinearAlign() || retries++ >= 16) {
				syncScrollState();
				return;
			}
			frame = requestAnimationFrame(tryAlign);
		};
		frame = requestAnimationFrame(tryAlign);

		return () => {
			cancelAnimationFrame(frame);
			stopAutoScrollRef.current?.();
			stopAutoScrollRef.current = null;
		};
	}, [context.open, context.value, runLinearAlign, syncScrollState]);

	useEffect(() => {
		const content = contentRef.current;
		const list = listRef.current;
		if (!content || !list || !context.open) return;

		const onAligned = (event: Event) => {
			const detail = (event as CustomEvent<AlignSelectDropdownResult>).detail;
			if (detail) {
				applyScrollState(detail);
			} else {
				syncScrollState();
			}
		};

		const observer = new ResizeObserver(() => {
			syncScrollState();
		});
		observer.observe(list);
		content.addEventListener("temporal-ui:select-aligned", onAligned);
		list.addEventListener("scroll", syncScrollState, { passive: true });

		return () => {
			observer.disconnect();
			content.removeEventListener("temporal-ui:select-aligned", onAligned);
			list.removeEventListener("scroll", syncScrollState);
		};
	}, [context.open, applyScrollState, syncScrollState]);

	const startCaretScroll = (direction: "up" | "down") => {
		stopAutoScrollRef.current?.();
		const list = listRef.current;
		if (!list) return;
		stopAutoScrollRef.current = startSelectCaretAutoScroll({
			scroller: list,
			direction,
			onScroll: applyScrollState,
		});
	};

	const stopCaretScroll = () => {
		stopAutoScrollRef.current?.();
		stopAutoScrollRef.current = null;
	};

	return (
		<ArkSelect.Positioner className={classes?.positioner} data-testid={tid("--positioner")}>
			<ArkSelect.Content
				ref={contentRef}
				className={classes?.content}
				data-testid={tid("--content")}
				style={{ maxHeight: `${maxHeight}px` }}
			>
				<div
					aria-hidden
					className={classes?.scrollCaret}
					data-component="select"
					data-slot="scroll-caret"
					data-direction="up"
					data-visible={canScrollUp ? "" : undefined}
					data-testid={tid("--scroll-caret-up")}
					onPointerEnter={() => startCaretScroll("up")}
					onPointerLeave={stopCaretScroll}
				>
					<ChevronUp />
				</div>
				<div
					ref={listRef}
					data-component="select"
					data-slot="list"
					data-testid={tid("--content-list")}
					onScroll={syncScrollState}
				>
					{context.collection.group().map(([type, group]) => (
						<ArkSelect.ItemGroup
							key={type}
							className={classes?.itemGroup}
							data-testid={tid("--item-group")}
						>
							{type && (
								<ArkSelect.ItemGroupLabel
									className={classes?.itemGroupLabel}
									data-testid={tid("--item-group-label")}
								>
									{type}
								</ArkSelect.ItemGroupLabel>
							)}
							{group.map((item) => (
								<ArkSelect.Item
									key={item.value}
									className={classes?.item}
									data-testid={tid("--item")}
									item={item}
								>
									{item.icon}
									<ArkSelect.ItemText
										className={classes?.itemText}
										data-testid={tid("--item-text")}
									>
										{item.label}
									</ArkSelect.ItemText>
									<ArkSelect.ItemIndicator
										className={classes?.itemIndicator}
										data-testid={tid("--item-indicator")}
									>
										<CheckIcon />
									</ArkSelect.ItemIndicator>
								</ArkSelect.Item>
							))}
						</ArkSelect.ItemGroup>
					))}
				</div>
				<div
					aria-hidden
					className={classes?.scrollCaret}
					data-component="select"
					data-slot="scroll-caret"
					data-direction="down"
					data-visible={canScrollDown ? "" : undefined}
					data-testid={tid("--scroll-caret-down")}
					onPointerEnter={() => startCaretScroll("down")}
					onPointerLeave={stopCaretScroll}
				>
					<ChevronDown />
				</div>
			</ArkSelect.Content>
		</ArkSelect.Positioner>
	);
}
