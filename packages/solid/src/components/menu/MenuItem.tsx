import type { MenuItemProps as CoreMenuItemProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { splitProps, type ComponentProps } from "solid-js";

export interface MenuItemProps extends CoreMenuItemProps, ComponentProps<typeof ArkMenu.Item> {}

export function MenuItem(props: MenuItemProps) {
	const [localProps, itemProps] = splitProps(props, ["className", "testId"]);
	return <ArkMenu.Item {...itemProps} class={localProps.className} data-testid={localProps.testId} />;
}
