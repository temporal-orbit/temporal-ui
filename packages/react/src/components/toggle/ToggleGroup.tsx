import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react/toggle-group";
import type React from "react";

export interface ToggleGroupProps extends React.ComponentProps<typeof ArkToggleGroup.Root> {
	testId?: string;
}

export interface ToggleGroupItemProps extends React.ComponentProps<typeof ArkToggleGroup.Item> {}

export function ToggleGroup(props: ToggleGroupProps) {
	const { testId, ...rest } = props;

	return <ArkToggleGroup.Root data-testid={testId} {...rest} />;
}

export const ToggleGroupItem = ArkToggleGroup.Item;
