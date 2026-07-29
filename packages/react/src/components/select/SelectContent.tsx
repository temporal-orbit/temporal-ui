import { Select as ArkSelect, useSelectContext } from "@ark-ui/react/select";
import type { SelectItem as CoreSelectItem } from "@temporal-ui/core/select";
import { getSelectScrollState, startSelectCaretAutoScroll } from "@temporal-ui/core/select";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

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
	const listRef = useRef<HTMLDivElement>(null);
	const stopAutoScrollRef = useRef<(() => void) | null>(null);
	const [canScrollUp, setCanScrollUp] = useState(false);
	const [canScrollDown, setCanScrollDown] = useState(false);

	const syncScrollState = useCallback(() => {
		const list = listRef.current;
		if (!list) return;
		const state = getSelectScrollState(list);
		setCanScrollUp(state.canScrollUp);
		setCanScrollDown(state.canScrollDown);
	}, []);

	useEffect(() => {
		if (!context.open) {
			setCanScrollUp(false);
			setCanScrollDown(false);
			stopAutoScrollRef.current?.();
			stopAutoScrollRef.current = null;
			return;
		}

		const frame = requestAnimationFrame(() => {
			syncScrollState();
		});

		return () => {
			cancelAnimationFrame(frame);
			stopAutoScrollRef.current?.();
			stopAutoScrollRef.current = null;
		};
	}, [context.open, context.value, syncScrollState]);

	useEffect(() => {
		const list = listRef.current;
		if (!list || !context.open) return;

		const observer = new ResizeObserver(() => {
			syncScrollState();
		});
		observer.observe(list);
		list.addEventListener("scroll", syncScrollState, { passive: true });

		return () => {
			observer.disconnect();
			list.removeEventListener("scroll", syncScrollState);
		};
	}, [context.open, syncScrollState]);

	const startCaretScroll = (direction: "up" | "down") => {
		stopAutoScrollRef.current?.();
		const list = listRef.current;
		if (!list) return;
		stopAutoScrollRef.current = startSelectCaretAutoScroll({
			scroller: list,
			direction,
			onScroll: (state) => {
				setCanScrollUp(state.canScrollUp);
				setCanScrollDown(state.canScrollDown);
			},
		});
	};

	const stopCaretScroll = () => {
		stopAutoScrollRef.current?.();
		stopAutoScrollRef.current = null;
	};

	return (
		<ArkSelect.Positioner className={classes?.positioner} data-testid={tid("--positioner")}>
			<ArkSelect.Content
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
					onMouseEnter={() => startCaretScroll("up")}
					onMouseLeave={stopCaretScroll}
				>
					<ChevronUp />
				</div>
				<div
					ref={listRef}
					data-component="select"
					data-slot="list"
					data-testid={tid("--content-list")}
					style={{ maxHeight: "100%", height: "100%" }}
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
					onMouseEnter={() => startCaretScroll("down")}
					onMouseLeave={stopCaretScroll}
				>
					<ChevronDown />
				</div>
			</ArkSelect.Content>
		</ArkSelect.Positioner>
	);
}
