import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import type { MenuProps as CoreMenuProps } from "@temporal-ui/core/menu";
import { testId } from "@temporal-ui/core/utils/string";
import { splitProps, type ComponentProps, type JSX, type ParentProps } from "solid-js";
import { Portal } from "solid-js/web";

export interface MenuProps
	extends CoreMenuProps<JSX.Element>, Omit<ComponentProps<typeof ArkMenu.Root>, "onSelect" | "positioning"> {
	trigger: (props: ParentProps) => JSX.Element;
}

export function Menu(_props: MenuProps) {
	const [localProps, rootProps] = splitProps(_props, [
		"trigger",
		"testId",
		"position",
		"onSelect",
		"className",
		"children",
	]);

	const tid = testId(localProps.testId);

	return (
		<ArkMenu.Root
			{...rootProps}
			onSelect={(details) => localProps.onSelect?.(details.value)}
			positioning={localProps.position}
			data-testid={tid("--root")}
		>
			<ArkMenu.Trigger asChild={(props) => localProps.trigger(props())} data-testid={tid("--trigger")} />
			<Portal>
				<ArkMenu.Positioner data-testid={tid("--positioner")}>
					<ArkMenu.Content class={localProps.className} data-testid={localProps.testId}>
						{localProps.children}
					</ArkMenu.Content>
				</ArkMenu.Positioner>
			</Portal>
		</ArkMenu.Root>
	);
}
