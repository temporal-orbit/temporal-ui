import { Field as ArkField } from "@ark-ui/react/field";
import type { TextareaProps as CoreTextareaProps } from "@temporal-ui/core/textarea";
import type React from "react";
import { forwardRef } from "react";
import { Field } from "../field";

export type TextareaProps = CoreTextareaProps<React.ReactNode> &
	React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
	const { label, hint, error, required, disabled, readOnly, classes, testId, ...rest } = props;

	return (
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			disabled={disabled}
			readOnly={readOnly}
			classes={classes}
			testId={testId ? `${testId}-field` : undefined}
		>
			<ArkField.Textarea
				data-component={"textarea"}
				data-slot={"field"}
				{...rest}
				ref={ref}
				aria-invalid={error ? true : undefined}
				data-testid={testId ? `${testId}--textarea` : undefined}
			/>
		</Field>
	);
});
