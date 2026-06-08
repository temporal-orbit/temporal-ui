import type { FieldsetProps as CoreFieldsetProps } from "@temporal-ui/core/field";
import { Fieldset as ArkFieldset } from "@ark-ui/react/fieldset";
import type React from "react";

export interface FieldsetProps extends CoreFieldsetProps<React.ReactNode> {}

export function Fieldset(props: FieldsetProps) {
	const { legend, variant, hint, error, children, disabled, classes, testId } = props;

	return (
		<ArkFieldset.Root
			data-variant={variant}
			className={classes?.root}
			invalid={!!error}
			data-testid={testId ? `${testId}--root` : undefined}
			disabled={disabled}
		>
			{legend && (
				<ArkFieldset.Legend
					className={classes?.label}
					data-testid={testId ? `${testId}--label` : undefined}
				>
					{legend}
				</ArkFieldset.Legend>
			)}
			{hint && (
				<ArkFieldset.HelperText
					className={classes?.hint}
					aria-disabled={disabled}
					data-testid={testId ? `${testId}--hint` : undefined}
				>
					{hint}
				</ArkFieldset.HelperText>
			)}
			{error && (
				<ArkFieldset.ErrorText
					className={classes?.error}
					data-testid={testId ? `${testId}--error` : undefined}
				>
					{error}
				</ArkFieldset.ErrorText>
			)}
			{children}
		</ArkFieldset.Root>
	);
}

export const FieldsetRoot = ArkFieldset.Root;
export const FieldsetLegend = ArkFieldset.Legend;
export const FieldsetHint = ArkFieldset.HelperText;
export const FieldsetError = ArkFieldset.ErrorText;
