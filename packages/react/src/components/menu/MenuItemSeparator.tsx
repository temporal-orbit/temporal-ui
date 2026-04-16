import type { MenuItemSeparatorProps as CoreMenuItemSeparatorProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";

export interface MenuItemSeparatorProps
	extends CoreMenuItemSeparatorProps, React.ComponentProps<typeof ArkMenu.Separator> {}

export function MenuItemSeparator(props: MenuItemSeparatorProps) {
	const { testId, ...rest } = props;

	return <ArkMenu.Separator {...rest} data-testid={testId} />;
}
