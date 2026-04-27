import { Field as ArkField } from "@ark-ui/react/field";
import type { TextInputProps as CoreTextInputProps } from "@temporal-ui/core/text-input";
import type React from "react";
import { forwardRef } from "react";
import { Field } from "../field";

export interface TextInputProps
	extends
		CoreTextInputProps<React.ReactNode>,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value"> {}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		startSection,
		endSection,
		testId,
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
			<div data-component={"text-input"} data-slot={"wrapper"}>
				{startSection && (
					<div
						data-component={"text-input"}
						data-slot={"start-section"}
						data-testid={testId ? `${testId}--start-section` : undefined}
					>
						{startSection}
					</div>
				)}
				{endSection && (
					<div
						data-component={"text-input"}
						data-slot={"end-section"}
						data-testid={testId ? `${testId}--end-section` : undefined}
					>
						{endSection}
					</div>
				)}
				<ArkField.Input
					data-component={"text-input"}
					data-slot={"input"}
					{...rest}
					ref={ref}
					onInput={(e: React.FormEvent<HTMLInputElement>) => {
						onValueChange?.(e.currentTarget.value);
						(rest.onInput as ((e: React.FormEvent<HTMLInputElement>) => void) | undefined)?.(e);
					}}
					aria-invalid={error ? true : undefined}
					data-with-start-section={startSection ? true : undefined}
					data-with-end-section={endSection ? true : undefined}
					data-testid={testId ? `${testId}--input` : undefined}
				/>
			</div>
		</Field>
	);
});
