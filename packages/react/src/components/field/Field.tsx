import { Field as ArkField } from "@ark-ui/react/field";
import type { FieldProps as CoreFieldProps } from "@temporal-ui/core/field";
import type React from "react";

export type FieldProps = CoreFieldProps<React.ReactNode>;

export function Field(props: FieldProps) {
	const { label, hint, error, children, disabled, readOnly, required, classes, testId } = props;

	return (
		<ArkField.Root
			className={classes?.root}
			invalid={!!error}
			data-testid={testId ? `${testId}--root` : undefined}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
		>
			{label && (
				<ArkField.Label
					className={classes?.label}
					data-testid={testId ? `${testId}--label` : undefined}
				>
					{label}
				</ArkField.Label>
			)}
			{hint && (
				<ArkField.HelperText
					className={classes?.hint}
					aria-disabled={disabled}
					data-testid={testId ? `${testId}--hint` : undefined}
				>
					{hint}
				</ArkField.HelperText>
			)}
			{children}
			{error && (
				<ArkField.ErrorText
					className={classes?.error}
					data-testid={testId ? `${testId}--error` : undefined}
				>
					{error}
				</ArkField.ErrorText>
			)}
		</ArkField.Root>
	);
}

export const FieldRoot = ArkField.Root;
export const FieldLabel = ArkField.Label;
export const FieldHint = ArkField.HelperText;
export const FieldError = ArkField.ErrorText;
