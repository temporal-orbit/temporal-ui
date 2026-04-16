import { Toggle as ArkToggle } from "@ark-ui/react/toggle";
import type React from "react";
import { forwardRef } from "react";

export interface ToggleProps extends React.ComponentProps<typeof ArkToggle.Root> {
	testId?: string;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
	const { testId, ...rest } = props;

	return <ArkToggle.Root ref={ref} data-testid={testId} {...rest} />;
});

export const ToggleIndicator = ArkToggle.Indicator;
