import type { MenuItemProps as CoreMenuItemProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";

export interface MenuItemProps
	extends CoreMenuItemProps, React.ComponentProps<typeof ArkMenu.Item> {}

export function MenuItem(props: MenuItemProps) {
	const { testId, ...rest } = props;

	return (
		<ArkMenu.Item {...rest} data-testid={testId}>
			{props.children}
		</ArkMenu.Item>
	);
}
