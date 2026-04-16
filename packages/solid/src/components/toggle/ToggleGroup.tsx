import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

export interface ToggleGroupProps extends ComponentProps<typeof ArkToggleGroup.Root> {
	testId?: string;
}

export interface ToggleGroupItemProps extends ComponentProps<typeof ArkToggleGroup.Item> {}

export function ToggleGroup(props: ToggleGroupProps) {
	const [local, rest] = splitProps(props, ["testId"]);

	return <ArkToggleGroup.Root data-testid={local.testId} {...rest} />;
}

export const ToggleGroupItem = ArkToggleGroup.Item;
