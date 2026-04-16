import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import type { RadioGroupProps as CoreRadioGroupProps } from "@temporal-ui/core/radio-group";
import type { JSX } from "solid-js";
import { Index, splitProps } from "solid-js";
import { Field } from "../field";

export interface RadioGroupProps extends CoreRadioGroupProps<JSX.Element> {}

export type { RadioGroupItem } from "@temporal-ui/core/radio-group";

export function RadioGroup(_props: RadioGroupProps) {
	const [fieldProps, rootProps] = splitProps(_props, [
		"label",
		"hint",
		"error",
		"required",
		"readOnly",
		"disabled",
		"classes",
		"testId",
	]);

	return (
		<Field {...fieldProps} testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}>
			<ArkRadioGroup.Root
				{...rootProps}
				disabled={fieldProps.disabled}
				readOnly={fieldProps.readOnly}
				aria-required={fieldProps.required}
				onValueChange={(details) => rootProps.onValueChange?.(details.value)}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--group` : undefined}
			>
				<ArkRadioGroup.Indicator />
				<Index each={rootProps.items}>
					{(item) => (
						<ArkRadioGroup.Item
							value={item().value}
							disabled={item().disabled}
							invalid={!!fieldProps.error}
							data-testid={fieldProps.testId ? `${fieldProps.testId}--item-${item().value}` : undefined}
						>
							<ArkRadioGroup.ItemControl
								data-testid={fieldProps.testId ? `${fieldProps.testId}--item-control-${item().value}` : undefined}
							/>
							<ArkRadioGroup.ItemText
								data-testid={fieldProps.testId ? `${fieldProps.testId}--item-text-${item().value}` : undefined}
							>
								{item().label}
							</ArkRadioGroup.ItemText>
							<ArkRadioGroup.ItemHiddenInput
								data-testid={fieldProps.testId ? `${fieldProps.testId}--item-input-${item().value}` : undefined}
							/>
						</ArkRadioGroup.Item>
					)}
				</Index>
			</ArkRadioGroup.Root>
		</Field>
	);
}
