import { RadioGroup as ArkRadioGroup } from "@ark-ui/solid/radio-group";
import type { RadioGroupProps as CoreRadioGroupProps } from "@temporal-ui/core/radio-group";
import type { JSX } from "solid-js";
import { Index, splitProps } from "solid-js";
import { Field } from "../field";

export interface RadioGroupProps extends CoreRadioGroupProps<JSX.Element> {}

export type { RadioGroupClasses, RadioGroupItem } from "@temporal-ui/core/radio-group";

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

	const c = fieldProps.classes;

	return (
		<Field {...fieldProps} testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}>
			<ArkRadioGroup.Root
				{...rootProps}
				class={c?.group}
				disabled={fieldProps.disabled}
				readOnly={fieldProps.readOnly}
				aria-required={fieldProps.required}
				onValueChange={(details) => rootProps.onValueChange?.(details.value)}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--group` : undefined}
			>
				<ArkRadioGroup.Indicator class={c?.indicator} />
				<Index each={rootProps.items}>
					{(item) => (
						<ArkRadioGroup.Item
							class={c?.item}
							value={item().value}
							disabled={item().disabled}
							invalid={!!fieldProps.error}
							data-testid={
								fieldProps.testId ? `${fieldProps.testId}--item-${item().value}` : undefined
							}
						>
							<ArkRadioGroup.ItemControl
								class={c?.itemControl}
								data-testid={
									fieldProps.testId
										? `${fieldProps.testId}--item-control-${item().value}`
										: undefined
								}
							/>
							<ArkRadioGroup.ItemText
								class={c?.itemText}
								data-testid={
									fieldProps.testId ? `${fieldProps.testId}--item-text-${item().value}` : undefined
								}
							>
								{item().label}
							</ArkRadioGroup.ItemText>
							<ArkRadioGroup.ItemHiddenInput
								class={c?.itemInput}
								data-testid={
									fieldProps.testId ? `${fieldProps.testId}--item-input-${item().value}` : undefined
								}
							/>
						</ArkRadioGroup.Item>
					)}
				</Index>
			</ArkRadioGroup.Root>
		</Field>
	);
}
