import type { NumberInputProps as CoreNumberInputProps } from "@temporal-ui/core/number-input";
import { type JSX, Show, splitProps } from "solid-js";
import type { HTMLProps } from "@ark-ui/solid";
import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import { Field } from "../field";
import { ChevronDown, ChevronUp } from "lucide-solid";

export interface NumberInputProps
	extends CoreNumberInputProps<JSX.Element>, Omit<HTMLProps<"input">, "max" | "min" | "step" | "value"> {}

export function NumberInput(_props: NumberInputProps) {
	const [fieldProps, rootProps, inputProps] = splitProps(
		_props,
		["label", "hint", "error", "required", "readOnly", "disabled", "classes", "testId"],
		["startSection", "min", "max", "step", "onValueChange", "value", "defaultValue"],
	);

	return (
		<Field {...fieldProps} testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}>
			<ArkNumberInput.Root
				min={rootProps.min}
				max={rootProps.max}
				step={rootProps.step}
				value={rootProps.value !== undefined ? String(rootProps.value != null ? rootProps.value : "") : undefined}
				defaultValue={rootProps.defaultValue !== undefined ? String(rootProps.defaultValue) : undefined}
				onValueChange={(details) => {
					rootProps.onValueChange?.(details.value !== "" ? details.valueAsNumber : null);
				}}
				data-with-start-section={rootProps.startSection || undefined}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--root` : undefined}
			>
				<ArkNumberInput.Control>
					<Show when={rootProps.startSection}>
						<div
							data-scope={"number-input"}
							data-part={"start-section"}
							data-testid={fieldProps.testId ? `${fieldProps.testId}--start-section` : undefined}
						>
							{rootProps.startSection}
						</div>
					</Show>
					<ArkNumberInput.Input
						{...inputProps}
						data-with-start-section={rootProps.startSection || undefined}
						data-testid={fieldProps.testId ? `${fieldProps.testId}--input` : undefined}
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
}
