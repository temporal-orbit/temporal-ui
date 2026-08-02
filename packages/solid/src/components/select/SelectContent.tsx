import { Select as ArkSelect, useSelectContext } from "@ark-ui/solid/select";
import type { SelectItem as CoreSelectItem } from "@temporal-ui/core/select";
import { CheckIcon } from "lucide-solid";
import { For, mergeProps, Show, type JSX } from "solid-js";
import { useAlignItemWithTrigger } from "./use-align-item-with-trigger";

export type SelectItem<D = unknown> = CoreSelectItem<D, JSX.Element>;

export interface SelectContentProps {
	tid: (str: string) => string | undefined;
	maxHeight?: number;
	alignItemWithTrigger?: boolean;
	alignItemWithTriggerMinHeight?: number;
	openedWithTouch?: boolean;
	selectIds?: {
		control: string;
		trigger: string;
		valueText: string;
		positioner: string;
		content: string;
	};
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
	};
}

export function SelectContent(_props: SelectContentProps) {
	const props = mergeProps({ maxHeight: 500 }, _props);
	const context = useSelectContext();
	const { alignedStyles, isAlignPending, showAligned, shouldAlign } = useAlignItemWithTrigger(
		context,
		() => ({
			alignItemWithTrigger: props.alignItemWithTrigger,
			alignItemWithTriggerMinHeight: props.alignItemWithTriggerMinHeight,
			openedWithTouch: props.openedWithTouch,
			selectIds: props.selectIds,
		}),
	);

	return (
		<ArkSelect.Positioner
			id={props.selectIds?.positioner}
			class={props.classes?.positioner}
			data-testid={props.tid("--positioner")}
			data-align-item-with-trigger={shouldAlign() ? "" : undefined}
			data-align-item-with-trigger-pending={isAlignPending() ? "" : undefined}
			style={showAligned() ? alignedStyles()?.positioner : undefined}
		>
			<div
				data-align-item-with-trigger-active={showAligned() ? "" : undefined}
				style={showAligned() ? alignedStyles()?.popup : { display: "contents" }}
			>
				<ArkSelect.Content
					id={props.selectIds?.content}
					class={props.classes?.content}
					data-testid={props.tid("--content")}
					style={
						showAligned() ? alignedStyles()?.content : { "max-height": `${props.maxHeight}px` }
					}
				>
					<div data-component="select" data-slot="list" data-testid={props.tid("--content-list")}>
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
												<ArkSelect.ItemIndicator
													class={props.classes?.itemIndicator}
													data-testid={props.tid("--item-indicator")}
												>
													<CheckIcon />
												</ArkSelect.ItemIndicator>
												<Show when={item.icon}>{item.icon}</Show>
												<ArkSelect.ItemText
													class={props.classes?.itemText}
													data-testid={props.tid("--item-text")}
												>
													{item.label}
												</ArkSelect.ItemText>
											</ArkSelect.Item>
										)}
									</For>
								</ArkSelect.ItemGroup>
							)}
						</For>
					</div>
				</ArkSelect.Content>
			</div>
		</ArkSelect.Positioner>
	);
}
