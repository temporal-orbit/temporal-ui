import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import type { MenuRadioItemProps as CoreMenuRadioItemProps } from "@temporal-ui/core/menu";
import { testId } from "@temporal-ui/core/utils/string";
import { splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";

export interface MenuRadioItemProps
	extends CoreMenuRadioItemProps, ComponentProps<typeof ArkMenu.RadioItem> {}

export function MenuRadioItem(props: MenuRadioItemProps) {
	const [localProps, radioItemProps] = splitProps(props, ["className", "testId"]);

	const tid = testId(localProps.testId);

	return (
		<ArkMenu.RadioItem
			{...radioItemProps}
			class={localProps.className}
			data-testid={tid("--radio-item")}
		>
			<div data-part="item-indicator-container">
				<ArkMenu.ItemIndicator data-testid={tid("--indicator")}>
					<div data-part="item-radio-indicator" />
				</ArkMenu.ItemIndicator>
			</div>
			<ArkMenu.ItemText data-testid={tid("--text")}>{props.children}</ArkMenu.ItemText>
		</ArkMenu.RadioItem>
	);
}
