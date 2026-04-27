import { Toggle as ArkToggle } from "@ark-ui/react/toggle";
import type { ToggleProps as CoreToggleProps } from "@temporal-ui/core/toggle";
import type React from "react";
import { forwardRef } from "react";
import { Field } from "../field";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface ToggleProps
	extends
		CoreToggleProps<React.ReactNode>,
		Omit<React.ComponentProps<typeof ArkToggle.Root>, keyof CoreToggleProps<React.ReactNode>> {}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
	const { label, hint, error, required, readOnly, disabled, classes, testId, ...rest } = props;

	const tid = testIdFn(testId);

	return (
		<Field
			label={label}
			hint={hint}
			classes={classes}
			required={required}
			readOnly={readOnly}
			error={error}
			disabled={disabled}
			testId={tid("-field")}
		>
			<ArkToggle.Root
				ref={ref}
				disabled={disabled}
				aria-invalid={error ? true : undefined}
				aria-required={required}
				className={classes?.control}
				data-testid={tid("--root")}
				{...rest}
			/>
		</Field>
	);
});

export const ToggleIndicator = ArkToggle.Indicator;
