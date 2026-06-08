import type { MenuItemGroupProps as CoreMenuItemGroupProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface MenuItemGroupProps
	extends CoreMenuItemGroupProps, React.ComponentProps<typeof ArkMenu.ItemGroup> {}

export function MenuItemGroup(props: MenuItemGroupProps) {
	const { label, testId, children, ...restProps } = props;
	const tid = testIdFn(testId);

	return (
		<ArkMenu.ItemGroup {...restProps} data-testid={tid("--group")}>
			{label && (
				<ArkMenu.ItemGroupLabel data-testid={tid("--label")}>{label}</ArkMenu.ItemGroupLabel>
			)}
			{children}
		</ArkMenu.ItemGroup>
	);
}
