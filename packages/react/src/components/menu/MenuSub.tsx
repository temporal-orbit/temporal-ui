import type { MenuSubProps as CoreMenuSubProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/react/menu";
import type React from "react";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

const defaultSubPosition = {
	placement: "right-start" as const,
	gutter: -2,
};

export interface MenuSubProps
	extends CoreMenuSubProps<React.ReactNode>,
		Omit<React.ComponentProps<typeof ArkMenu.Root>, "positioning" | "children" | "onSelect"> {
	children: React.ReactNode;
}

export function MenuSub(props: MenuSubProps) {
	const { children, className, position, testId, onSelect, ...rootProps } = props;
	const tid = testIdFn(testId);

	return (
		<ArkMenu.Root
			{...rootProps}
			className={className}
			onSelect={(details) => onSelect?.(details.value)}
			positioning={{
				...defaultSubPosition,
				...position,
			}}
			data-testid={tid("--sub-root")}
		>
			{children}
		</ArkMenu.Root>
	);
}
