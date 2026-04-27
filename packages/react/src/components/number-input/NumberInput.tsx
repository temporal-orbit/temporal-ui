import type { NumberInputProps as CoreNumberInputProps } from "@temporal-ui/core/number-input";
import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input";
import type React from "react";
import { Field } from "../field";
import { ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef } from "react";

export interface NumberInputProps
	extends
		CoreNumberInputProps<React.ReactNode>,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "max" | "min" | "step" | "defaultValue" | "value"> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		startSection,
		min,
		max,
		step,
		testId,
		value,
		defaultValue,
		onValueChange,
		...rest
	} = props;
	return (
		<Field
			label={label}
			hint={hint}
			classes={classes}
			required={required}
			readOnly={readOnly}
			error={error}
			disabled={disabled}
			testId={testId ? `${testId}-field` : undefined}
		>
			<ArkNumberInput.Root
				min={min}
				max={max}
				step={step}
				value={value !== undefined ? String(value != null ? value : "") : undefined}
				defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
				onValueChange={(details) => onValueChange?.(details.value !== "" ? details.valueAsNumber : null)}
				data-with-start-section={startSection ? true : undefined}
				data-testid={testId ? `${testId}--root` : undefined}
			>
				<ArkNumberInput.Control>
					{startSection && (
						<div
							data-component={"number-input"}
							data-slot={"start-section"}
							data-testid={testId ? `${testId}--start-section` : undefined}
						>
							{startSection}
						</div>
					)}
					<ArkNumberInput.Input
						ref={ref}
						{...rest}
						data-with-start-section={startSection ? true : undefined}
						data-testid={testId ? `${testId}--input` : undefined}
					/>
					<ArkNumberInput.IncrementTrigger>
						<ChevronUp size={16} />
					</ArkNumberInput.IncrementTrigger>
					<ArkNumberInput.DecrementTrigger>
						<ChevronDown size={16} />
					</ArkNumberInput.DecrementTrigger>
				</ArkNumberInput.Control>
			</ArkNumberInput.Root>
		</Field>
	);
});
