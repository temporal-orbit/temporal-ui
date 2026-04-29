import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import type { MenuSubProps as CoreMenuSubProps } from "@temporal-ui/core/menu";
import { testId } from "@temporal-ui/core/utils/string";
import { splitProps, type ComponentProps, type JSX, type ParentProps } from "solid-js";

const defaultSubPosition = {
	placement: "right-start" as const,
	gutter: -2,
};

export interface MenuSubProps
	extends CoreMenuSubProps<JSX.Element>,
		Omit<ComponentProps<typeof ArkMenu.Root>, "positioning" | "children" | "onSelect">,
		ParentProps {}

export function MenuSub(_props: MenuSubProps) {
	const [localProps, rootProps] = splitProps(_props, ["className", "testId", "position", "children", "onSelect"]);

	const tid = testId(localProps.testId);

	return (
		<ArkMenu.Root
			{...rootProps}
			class={localProps.className}
			onSelect={(details) => localProps.onSelect?.(details.value)}
			positioning={{
				...defaultSubPosition,
				...localProps.position,
			}}
			data-testid={tid("--sub-root")}
		>
			{localProps.children}
		</ArkMenu.Root>
	);
}
