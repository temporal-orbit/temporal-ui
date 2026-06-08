import type { FieldTextareaProps } from "@ark-ui/solid";
import { Field as ArkField } from "@ark-ui/solid/field";
import type { TextareaProps as CoreTextareaProps } from "@temporal-ui/core/textarea";
import { splitProps, type JSX } from "solid-js";
import { Field } from "../field";

export interface TextareaProps
	extends CoreTextareaProps<JSX.Element>, Omit<FieldTextareaProps, "value"> {
	onInput?: (
		e: InputEvent & { currentTarget: HTMLTextAreaElement; target: HTMLTextAreaElement },
	) => void;
}

export function Textarea(_props: TextareaProps) {
	const [fieldProps, textareaProps, restProps] = splitProps(
		_props,
		["label", "hint", "error", "required", "readOnly", "disabled", "classes", "testId"],
		["className", "class", "onValueChange"],
	);

	return (
		<Field
			label={fieldProps.label}
			hint={fieldProps.hint}
			error={fieldProps.error}
			required={fieldProps.required}
			disabled={fieldProps.disabled}
			readOnly={fieldProps.readOnly}
			classes={fieldProps.classes}
			testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}
		>
			<ArkField.Textarea
				data-component={"textarea"}
				data-slot={"field"}
				{...restProps}
				onInput={(e) => {
					textareaProps.onValueChange?.(e.target.value);
					restProps.onInput?.(e);
				}}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--input` : undefined}
			/>
		</Field>
	);
}
