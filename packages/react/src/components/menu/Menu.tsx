import type { MenuProps as CoreMenuProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";
import { Portal } from "@ark-ui/react/portal";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface MenuProps
	extends
		CoreMenuProps<React.ReactNode>,
		Omit<React.ComponentProps<typeof ArkMenu.Root>, "onSelect"> {
	trigger: React.ReactNode;
}

export function Menu(props: MenuProps) {
	const { trigger, children, className, onSelect, testId, position, ...rootProps } = props;

	const tid = testIdFn(testId);

	return (
		<ArkMenu.Root
			{...rootProps}
			onSelect={(details) => onSelect?.(details.value)}
			data-testid={tid("--root")}
			positioning={position}
		>
			<ArkMenu.Trigger data-testid={tid("--trigger")} asChild>
				{trigger}
			</ArkMenu.Trigger>
			<Portal>
				<ArkMenu.Positioner data-testid={tid("--positioner")}>
					<ArkMenu.Content className={className} data-testid={tid("--content")}>
						{children}
					</ArkMenu.Content>
				</ArkMenu.Positioner>
			</Portal>
		</ArkMenu.Root>
	);
}
