import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { testId } from "@temporal-ui/core/utils/string";
import type { ComponentProps } from "solid-js";
import { Show, splitProps } from "solid-js";
import type { MenuItemGroupProps as CoreMenuItemGroupProps } from "@temporal-ui/core/menu";

export interface MenuItemGroupProps extends CoreMenuItemGroupProps, ComponentProps<typeof ArkMenu.ItemGroup> {}

export function MenuItemGroup(props: MenuItemGroupProps) {
	const [localProps, itemGroupProps] = splitProps(props, ["className", "testId", "label", "children"]);

	const tid = testId(localProps.testId);

	return (
		<ArkMenu.ItemGroup {...itemGroupProps} class={localProps.className} data-testid={tid("--group")}>
			<Show when={localProps.label}>
				<ArkMenu.ItemGroupLabel data-testid={tid("--label")}>{localProps.label}</ArkMenu.ItemGroupLabel>
			</Show>
			{localProps.children}
		</ArkMenu.ItemGroup>
	);
}
