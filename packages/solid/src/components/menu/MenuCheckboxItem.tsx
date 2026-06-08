import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { testId } from "@temporal-ui/core/utils/string";
import { CheckIcon } from "lucide-solid";
import { splitProps, type ComponentProps } from "solid-js";
import type { MenuCheckboxItemProps as CoreMenuCheckboxItemProps } from "@temporal-ui/core/menu";

export interface MenuCheckboxItemProps
	extends CoreMenuCheckboxItemProps, ComponentProps<typeof ArkMenu.CheckboxItem> {}

export function MenuCheckboxItem(props: MenuCheckboxItemProps) {
	const [localProps, itemProps] = splitProps(props, ["className", "testId", "children"]);
	const tid = testId(localProps.testId);
	return (
		<ArkMenu.CheckboxItem
			{...itemProps}
			class={localProps.className}
			data-testid={tid("--checkbox-item")}
		>
			<div data-part="item-indicator-container">
				<ArkMenu.ItemIndicator data-testid={tid("--checkbox-item-indicator")}>
					<CheckIcon />
				</ArkMenu.ItemIndicator>
			</div>
			<ArkMenu.ItemText data-testid={tid("--checkbox-item-text")}>
				{localProps.children}
			</ArkMenu.ItemText>
		</ArkMenu.CheckboxItem>
	);
}
