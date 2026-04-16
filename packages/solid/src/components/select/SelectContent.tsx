import { Select as ArkSelect, useSelectContext } from "@ark-ui/solid/select";
import type { SelectItem as CoreSelectItem } from "@temporal-ui/core/select";
import { CheckIcon } from "lucide-solid";
import { For, mergeProps, Show, type JSX } from "solid-js";

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
	};
}

export function SelectContent(_props: SelectContentProps) {
	const props = mergeProps({ maxHeight: 500 }, _props);
	const context = useSelectContext();

	return (
		<ArkSelect.Positioner class={props.classes?.positioner} data-testid={props.tid("--positioner")}>
			<ArkSelect.Content
				class={props.classes?.content}
				data-testid={props.tid("--content")}
				style={{ "max-height": `${props.maxHeight}px` }}
			>
				<div data-scope="select" data-part="content-list" data-testid={props.tid("--content-list")}>
					<For each={context().collection.group()}>
						{([type, group]) => (
							<ArkSelect.ItemGroup class={props.classes?.itemGroup} data-testid={props.tid("--item-group")}>
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
										<ArkSelect.Item class={props.classes?.item} data-testid={props.tid("--item")} item={item}>
											<Show when={item.icon}>{item.icon}</Show>
											<ArkSelect.ItemText class={props.classes?.itemText} data-testid={props.tid("--item-text")}>
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
			</ArkSelect.Content>
		</ArkSelect.Positioner>
	);
}
