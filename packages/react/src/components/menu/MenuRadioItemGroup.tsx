import type { MenuRadioItemGroupProps as CoreMenuRadioItemGroupProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface MenuRadioItemGroupProps
	extends
		CoreMenuRadioItemGroupProps,
		Omit<React.ComponentProps<typeof ArkMenu.RadioItemGroup>, "onValueChange"> {}

export function MenuRadioItemGroup(props: MenuRadioItemGroupProps) {
	const { label, onValueChange, testId, children, ...restProps } = props;
	const tid = testIdFn(testId);

	return (
		<ArkMenu.RadioItemGroup
			{...restProps}
			onValueChange={(details) => onValueChange?.(details.value)}
			data-testid={tid("--group")}
		>
			{label && (
				<ArkMenu.ItemGroupLabel data-testid={tid("--label")}>{label}</ArkMenu.ItemGroupLabel>
			)}
			{children}
		</ArkMenu.RadioItemGroup>
	);
}
