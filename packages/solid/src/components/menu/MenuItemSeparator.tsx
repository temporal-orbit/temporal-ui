import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import type { MenuItemSeparatorProps as CoreMenuItemSeparatorProps } from "@temporal-ui/core/menu";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

export interface MenuItemSeparatorProps extends CoreMenuItemSeparatorProps, ComponentProps<typeof ArkMenu.Separator> {}

export function MenuItemSeparator(props: MenuItemSeparatorProps) {
	const [localProps, separatorProps] = splitProps(props, ["className", "testId"]);
	return <ArkMenu.Separator {...separatorProps} class={localProps.className} data-testid={localProps.testId} />;
}
