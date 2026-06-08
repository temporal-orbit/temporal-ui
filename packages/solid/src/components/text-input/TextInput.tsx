import type { TextInputProps as CoreTextInputProps } from "@temporal-ui/core/text-input";
import { type JSX, splitProps } from "solid-js";
import type { HTMLProps } from "@ark-ui/solid";
import { Field as ArkField } from "@ark-ui/solid/field";
import { Field } from "../field";

export interface TextInputProps
	extends CoreTextInputProps<JSX.Element>, Omit<HTMLProps<"input">, "value"> {
	onInput?: (
		e: InputEvent & {
			currentTarget: HTMLInputElement;
			target: HTMLInputElement;
		},
	) => void;
}

export function TextInput(_props: TextInputProps) {
	const [fieldProps, inputProps, restProps] = splitProps(
		_props,
		["label", "hint", "error", "required", "readOnly", "disabled", "classes", "testId"],
		["startSection", "endSection", "onValueChange"],
	);

	return (
		<Field {...fieldProps} testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}>
			<div data-component={"text-input"} data-slot={"wrapper"}>
				{inputProps.startSection && (
					<div
						data-component={"text-input"}
						data-slot={"start-section"}
						data-testid={fieldProps.testId ? `${fieldProps.testId}--start-section` : undefined}
					>
						{inputProps.startSection}
					</div>
				)}
				{inputProps.endSection && (
					<div
						data-component={"text-input"}
						data-slot={"end-section"}
						data-testid={fieldProps.testId ? `${fieldProps.testId}--end-section` : undefined}
					>
						{inputProps.endSection}
					</div>
				)}
				<ArkField.Input
					data-component={"text-input"}
					data-slot={"input"}
					{...restProps}
					onInput={(e) => {
						inputProps.onValueChange?.(e.currentTarget.value);
						restProps.onInput?.(e);
					}}
					data-with-start-section={inputProps.startSection || undefined}
					data-with-end-section={inputProps.endSection || undefined}
					aria-invalid={fieldProps.error ? true : undefined}
					data-testid={fieldProps.testId ? `${fieldProps.testId}--input` : undefined}
				/>
			</div>
		</Field>
	);
}
