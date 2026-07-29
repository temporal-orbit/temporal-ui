import { Select as ArkSelect, useSelectContext } from "@ark-ui/solid/select";
import type { SelectItem as CoreSelectItem } from "@temporal-ui/core/select";
import { getSelectScrollState, startSelectCaretAutoScroll } from "@temporal-ui/core/select";
import { CheckIcon, ChevronDown, ChevronUp } from "lucide-solid";
import {
	createEffect,
	createSignal,
	For,
	mergeProps,
	onCleanup,
	Show,
	type JSX,
} from "solid-js";

export type SelectItem<D = unknown> = CoreSelectItem<D, JSX.Element>;

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

export function SelectContent(_props: SelectContentProps) {
	const props = mergeProps({ maxHeight: 500 }, _props);
	const context = useSelectContext();
	const [listEl, setListEl] = createSignal<HTMLDivElement | null>(null);
	const [canScrollUp, setCanScrollUp] = createSignal(false);
	const [canScrollDown, setCanScrollDown] = createSignal(false);
	let stopAutoScroll: (() => void) | null = null;

	const syncScrollState = () => {
		const list = listEl();
		if (!list) return;
		const state = getSelectScrollState(list);
		setCanScrollUp(state.canScrollUp);
		setCanScrollDown(state.canScrollDown);
	};

	createEffect(() => {
		const open = context().open;
		const value = context().value;

		if (!open) {
			setCanScrollUp(false);
			setCanScrollDown(false);
			stopAutoScroll?.();
			stopAutoScroll = null;
			return;
		}

		// Depend on value so re-open with a new selection refreshes caret state.
		void value;

		const frame = requestAnimationFrame(() => {
			syncScrollState();
		});

		onCleanup(() => {
			cancelAnimationFrame(frame);
			stopAutoScroll?.();
			stopAutoScroll = null;
		});
	});

	createEffect(() => {
		const list = listEl();
		const open = context().open;
		if (!list || !open) return;

		const observer = new ResizeObserver(() => {
			syncScrollState();
		});
		observer.observe(list);
		list.addEventListener("scroll", syncScrollState, { passive: true });

		onCleanup(() => {
			observer.disconnect();
			list.removeEventListener("scroll", syncScrollState);
		});
	});

	const startCaretScroll = (direction: "up" | "down") => {
		stopAutoScroll?.();
		const list = listEl();
		if (!list) return;
		stopAutoScroll = startSelectCaretAutoScroll({
			scroller: list,
			direction,
			onScroll: (state) => {
				setCanScrollUp(state.canScrollUp);
				setCanScrollDown(state.canScrollDown);
			},
		});
	};

	const stopCaretScroll = () => {
		stopAutoScroll?.();
		stopAutoScroll = null;
	};

	return (
		<ArkSelect.Positioner class={props.classes?.positioner} data-testid={props.tid("--positioner")}>
			<ArkSelect.Content
				class={props.classes?.content}
				data-testid={props.tid("--content")}
				style={{ "max-height": `${props.maxHeight}px` }}
			>
				<div
					aria-hidden
					class={props.classes?.scrollCaret}
					data-component="select"
					data-slot="scroll-caret"
					data-direction="up"
					data-visible={canScrollUp() ? "" : undefined}
					data-testid={props.tid("--scroll-caret-up")}
					onMouseEnter={() => startCaretScroll("up")}
					onMouseLeave={stopCaretScroll}
				>
					<ChevronUp />
				</div>
				<div
					ref={setListEl}
					data-component="select"
					data-slot="list"
					data-testid={props.tid("--content-list")}
					style={{ "max-height": "100%", height: "100%" }}
					onScroll={syncScrollState}
				>
					<For each={context().collection.group()}>
						{([type, group]) => (
							<ArkSelect.ItemGroup
								class={props.classes?.itemGroup}
								data-testid={props.tid("--item-group")}
							>
								<Show when={type}>
									<ArkSelect.ItemGroupLabel
										class={props.classes?.itemGroupLabel}
										data-testid={props.tid("--item-group-label")}
									>
										{type}
									</ArkSelect.ItemGroupLabel>
								</Show>
								<For each={group}>
									{(item) => (
										<ArkSelect.Item
											class={props.classes?.item}
											data-testid={props.tid("--item")}
											item={item}
										>
											<Show when={item.icon}>{item.icon}</Show>
											<ArkSelect.ItemText
												class={props.classes?.itemText}
												data-testid={props.tid("--item-text")}
											>
												{item.label}
											</ArkSelect.ItemText>
											<ArkSelect.ItemIndicator
												class={props.classes?.itemIndicator}
												data-testid={props.tid("--item-indicator")}
											>
												<CheckIcon />
											</ArkSelect.ItemIndicator>
										</ArkSelect.Item>
									)}
								</For>
							</ArkSelect.ItemGroup>
						)}
					</For>
				</div>
				<div
					aria-hidden
					class={props.classes?.scrollCaret}
					data-component="select"
					data-slot="scroll-caret"
					data-direction="down"
					data-visible={canScrollDown() ? "" : undefined}
					data-testid={props.tid("--scroll-caret-down")}
					onMouseEnter={() => startCaretScroll("down")}
					onMouseLeave={stopCaretScroll}
				>
					<ChevronDown />
				</div>
			</ArkSelect.Content>
		</ArkSelect.Positioner>
	);
}
