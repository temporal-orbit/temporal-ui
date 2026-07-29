import { Select as ArkSelect, useSelectContext } from "@ark-ui/solid/select";
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
	const [contentEl, setContentEl] = createSignal<HTMLDivElement | null>(null);
	const [listEl, setListEl] = createSignal<HTMLDivElement | null>(null);
	const [canScrollUp, setCanScrollUp] = createSignal(false);
	const [canScrollDown, setCanScrollDown] = createSignal(false);
	let stopAutoScroll: (() => void) | null = null;

	const applyScrollState = (state: AlignSelectDropdownResult) => {
		setCanScrollUp(state.canScrollUp);
		setCanScrollDown(state.canScrollDown);
	};

	const syncScrollState = () => {
		const list = listEl();
		if (!list) return;
		applyScrollState(getSelectScrollState(list));
	};

	const runLinearAlign = () => {
		const content = contentEl();
		if (!content || content.hidden) return false;
		const positioner = content.closest<HTMLElement>('[data-part="positioner"]');
		const trigger = getSelectTriggerForContent(content);
		if (!positioner || !trigger) return false;

		const state = alignSelectDropdown({
			positioner,
			content,
			trigger,
			selectedItem: getSelectedSelectItem(content),
			hasValue: (context().value?.length ?? 0) > 0,
			maxHeight: props.maxHeight,
		});
		applyScrollState(state);
		return content.dataset.linearAligned === "true";
	};

	createEffect(() => {
		const open = context().open;
		const value = context().value;
		void value;

		if (!open) {
			setCanScrollUp(false);
			setCanScrollDown(false);
			stopAutoScroll?.();
			stopAutoScroll = null;
			resetSelectLinearAlignment(contentEl());
			return;
		}

		// Clear any premature lock from floating-ui's first paint, then align.
		resetSelectLinearAlignment(contentEl());

		let retries = 0;
		let frame = 0;
		const tryAlign = () => {
			const aligned = runLinearAlign();
			syncScrollState();
			if (aligned || retries++ >= 24) {
				return;
			}
			frame = requestAnimationFrame(tryAlign);
		};
		frame = requestAnimationFrame(tryAlign);
		const poll = window.setInterval(syncScrollState, 50);
		const stopPoll = window.setTimeout(() => window.clearInterval(poll), 1000);

		onCleanup(() => {
			cancelAnimationFrame(frame);
			window.clearInterval(poll);
			window.clearTimeout(stopPoll);
			stopAutoScroll?.();
			stopAutoScroll = null;
		});
	});

	createEffect(() => {
		const content = contentEl();
		const list = listEl();
		const open = context().open;
		if (!content || !list || !open) return;

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

		onCleanup(() => {
			observer.disconnect();
			content.removeEventListener("temporal-ui:select-aligned", onAligned);
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
			onScroll: applyScrollState,
		});
	};

	const stopCaretScroll = () => {
		stopAutoScroll?.();
		stopAutoScroll = null;
	};

	return (
		<ArkSelect.Positioner class={props.classes?.positioner} data-testid={props.tid("--positioner")}>
			<ArkSelect.Content
				ref={setContentEl}
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
					onPointerEnter={() => startCaretScroll("up")}
					onPointerLeave={stopCaretScroll}
				>
					<ChevronUp />
				</div>
				<div
					ref={setListEl}
					data-component="select"
					data-slot="list"
					data-testid={props.tid("--content-list")}
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
					onPointerEnter={() => startCaretScroll("down")}
					onPointerLeave={stopCaretScroll}
				>
					<ChevronDown />
				</div>
			</ArkSelect.Content>
		</ArkSelect.Positioner>
	);
}
