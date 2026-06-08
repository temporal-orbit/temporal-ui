import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import type { MenuSubTriggerProps as CoreMenuSubTriggerProps } from "@temporal-ui/core/menu";
import { splitProps, type ComponentProps } from "solid-js";

export interface MenuSubTriggerProps
	extends CoreMenuSubTriggerProps, ComponentProps<typeof ArkMenu.TriggerItem> {}

export function MenuSubTrigger(props: MenuSubTriggerProps) {
	const [localProps, triggerProps] = splitProps(props, ["className", "testId"]);

	return (
		<ArkMenu.TriggerItem
			{...triggerProps}
			class={localProps.className}
			data-testid={localProps.testId}
		/>
	);
}
