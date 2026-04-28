import {
	ProgressRange,
	ProgressRoot,
	ProgressTrack,
	ProgressValueText,
	type ProgressRootProps,
} from "@ark-ui/react/progress";
import type { ProgressLinearProps as CoreProgressLinearProps } from "@temporal-ui/core/progress-linear";
import type React from "react";
import { Field } from "../field";
import { forwardRef } from "react";

export interface ProgressLinearProps
	extends
		CoreProgressLinearProps<React.ReactNode>,
		Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {}

export const ProgressLinear = forwardRef<HTMLDivElement, ProgressLinearProps & ProgressRootProps>((props, ref) => {
	const { label, hint, error, required, readOnly, disabled, testId, showValueText, children, ...rootProps } = props;

	return (
		<Field
			label={label}
			hint={hint}
			required={required}
			readOnly={readOnly}
			disabled={disabled}
			error={error}
			testId={testId ? `${testId}-field` : undefined}
		>
			<ProgressRoot {...rootProps} ref={ref} data-testid={testId ? `${testId}--root` : undefined}>
				{children ?? (
					<>
						<ProgressTrack>
							<ProgressRange />
						</ProgressTrack>
						{showValueText && <ProgressValueText data-testid={testId ? `${testId}--value-text` : undefined} />}
					</>
				)}
			</ProgressRoot>
		</Field>
	);
});

ProgressLinear.displayName = "ProgressLinear";
