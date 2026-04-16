import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type { MenuRadioItemProps as CoreMenuRadioItemProps } from "@temporal-ui/core/menu";
import type React from "react";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface MenuRadioItemProps extends CoreMenuRadioItemProps, React.ComponentProps<typeof ArkMenu.RadioItem> {}

export function MenuRadioItem(props: MenuRadioItemProps) {
	const { testId, children, ...rest } = props;
	const tid = testIdFn(testId);

	return (
		<ArkMenu.RadioItem {...rest} data-testid={tid("--radio-item")}>
			<ArkMenu.ItemIndicator data-testid={tid("--indicator")}>
				<div data-part="item-radio-indicator" />
			</ArkMenu.ItemIndicator>
			<ArkMenu.ItemText data-testid={tid("--text")}>{children}</ArkMenu.ItemText>
		</ArkMenu.RadioItem>
	);
}
