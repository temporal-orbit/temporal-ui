import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import type { MenuSubContentProps as CoreMenuSubContentProps } from "@temporal-ui/core/menu";
import { testId } from "@temporal-ui/core/utils/string";
import { Portal } from "solid-js/web";
import { splitProps, type ComponentProps } from "solid-js";

export interface MenuSubContentProps
	extends CoreMenuSubContentProps, ComponentProps<typeof ArkMenu.Content> {}

export function MenuSubContent(props: MenuSubContentProps) {
	const [localProps, contentProps] = splitProps(props, ["className", "testId"]);

	const tid = testId(localProps.testId);

	return (
		<Portal>
			<ArkMenu.Positioner data-testid={tid("--sub-positioner")}>
				<ArkMenu.Content {...contentProps} class={localProps.className} data-testid={tid("--sub-content")} />
			</ArkMenu.Positioner>
		</Portal>
	);
}
