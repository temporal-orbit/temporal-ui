import type { MenuSubContentProps as CoreMenuSubContentProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";
import { Portal } from "@ark-ui/react/portal";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface MenuSubContentProps
	extends CoreMenuSubContentProps, React.ComponentProps<typeof ArkMenu.Content> {}

export function MenuSubContent(props: MenuSubContentProps) {
	const { testId, className, children, ...rest } = props;
	const tid = testIdFn(testId);

	return (
		<Portal>
			<ArkMenu.Positioner data-testid={tid("--sub-positioner")}>
				<ArkMenu.Content {...rest} className={className} data-testid={tid("--sub-content")}>
					{children}
				</ArkMenu.Content>
			</ArkMenu.Positioner>
		</Portal>
	);
}
