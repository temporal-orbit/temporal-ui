import type { MenuCheckboxItemProps as CoreMenuCheckboxItemProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";
import { CheckIcon } from "lucide-react";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface MenuCheckboxItemProps
	extends CoreMenuCheckboxItemProps, React.ComponentProps<typeof ArkMenu.CheckboxItem> {}

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
	const { testId, children, ...rest } = props;
	const tid = testIdFn(testId);

	return (
		<ArkMenu.CheckboxItem {...rest} data-testid={tid("--checkbox-item")}>
			<div data-part="item-indicator-container">
				<ArkMenu.ItemIndicator data-testid={tid("--checkbox-item-indicator")}>
					<CheckIcon />
				</ArkMenu.ItemIndicator>
			</div>
			<ArkMenu.ItemText data-testid={tid("--checkbox-item-text")}>{children}</ArkMenu.ItemText>
		</ArkMenu.CheckboxItem>
	);
}
