import type { MenuRadioItemGroupProps as CoreMenuRadioItemGroupProps } from "@temporal-ui/core/menu";
import { Menu as ArkMenu } from "@ark-ui/solid/menu";
import { Show, splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";
import { testId } from "@temporal-ui/core/utils/string";

export interface MenuRadioItemGroupProps
	extends
		CoreMenuRadioItemGroupProps,
		Omit<ComponentProps<typeof ArkMenu.RadioItemGroup>, "onValueChange"> {}

export function MenuRadioItemGroup(props: MenuRadioItemGroupProps) {
	const [localProps, radioItemGroupProps] = splitProps(props, [
		"className",
		"testId",
		"label",
		"children",
		"onValueChange",
	]);
	const tid = testId(localProps.testId);
	return (
		<ArkMenu.RadioItemGroup
			{...radioItemGroupProps}
			class={localProps.className}
			onValueChange={(details) => localProps.onValueChange?.(details.value)}
			data-testid={tid("--group")}
		>
			<Show when={localProps.label}>
				<ArkMenu.ItemGroupLabel data-testid={tid("--label")}>
					{localProps.label}
				</ArkMenu.ItemGroupLabel>
			</Show>
			{localProps.children}
		</ArkMenu.RadioItemGroup>
	);
}
