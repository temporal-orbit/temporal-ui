import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

export interface ToggleProps extends ComponentProps<typeof ArkToggle.Root> {
	testId?: string;
}

export function Toggle(props: ToggleProps) {
	const [local, rest] = splitProps(props, ["testId"]);

	return <ArkToggle.Root data-testid={local.testId} {...rest} />;
}

export const ToggleIndicator = ArkToggle.Indicator;
