import type { MenuSubTriggerProps as CoreMenuSubTriggerProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";

export interface MenuSubTriggerProps
	extends CoreMenuSubTriggerProps, React.ComponentProps<typeof ArkMenu.TriggerItem> {}

export function MenuSubTrigger(props: MenuSubTriggerProps) {
	const { testId, className, ...rest } = props;

	return (
		<ArkMenu.TriggerItem {...rest} className={className} data-testid={testId}>
			{props.children}
		</ArkMenu.TriggerItem>
	);
}
