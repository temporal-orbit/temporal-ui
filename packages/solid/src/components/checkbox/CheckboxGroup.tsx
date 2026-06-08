import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import type { CheckboxGroupProps as CoreCheckboxGroupProps } from "@temporal-ui/core/checkbox";
import { cx } from "@temporal-ui/core/utils/cx";
import { CheckIcon } from "lucide-solid";
import type { JSX } from "solid-js";
import { For, splitProps } from "solid-js";

export interface CheckboxGroupProps extends CoreCheckboxGroupProps<JSX.Element> {}

export type { CheckboxGroupItem } from "@temporal-ui/core/checkbox";

export function CheckboxGroup(_props: CheckboxGroupProps) {
	const [fieldProps, groupProps] = splitProps(
		_props,
		["label", "hint", "error", "required", "readOnly", "disabled", "classes", "testId"],
		["name", "items", "defaultValues", "values", "onValuesChange"],
	);

	return (
		<fieldset
			class={cx("field-root", fieldProps.classes?.root)}
			data-testid={fieldProps.testId ? `${fieldProps.testId}--fieldset` : undefined}
		>
			{fieldProps.label && (
				<legend
					class={cx("field-label", fieldProps.classes?.label)}
					data-testid={fieldProps.testId ? `${fieldProps.testId}--legend` : undefined}
				>
					{fieldProps.label}
					{fieldProps.required && <span title="required">*</span>}
				</legend>
			)}
			{fieldProps.hint && (
				<div
					class={cx("field-hint", fieldProps.classes?.hint)}
					aria-disabled={fieldProps.disabled}
					data-testid={fieldProps.testId ? `${fieldProps.testId}--hint` : undefined}
				>
					{fieldProps.hint}
				</div>
			)}
			<ArkCheckbox.Group
				name={groupProps.name}
				value={groupProps.values ? () => groupProps.values || [] : undefined}
				disabled={fieldProps.disabled}
				invalid={!!fieldProps.error}
				readOnly={fieldProps.readOnly}
				defaultValue={groupProps.defaultValues}
				onValueChange={groupProps.onValuesChange}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--group` : undefined}
			>
				<For each={groupProps.items}>
					{(item, i) => (
						<ArkCheckbox.Root value={item.value} data-testid={`${fieldProps.testId}--item-${i()}`}>
							<ArkCheckbox.Control data-testid={`${fieldProps.testId}--control-${i()}`}>
								<ArkCheckbox.Indicator data-testid={`${fieldProps.testId}--indicator-${i()}`}>
									<CheckIcon />
								</ArkCheckbox.Indicator>
							</ArkCheckbox.Control>
							<ArkCheckbox.Label data-testid={`${fieldProps.testId}--label-${i()}`}>
								{item.label}
							</ArkCheckbox.Label>
							<ArkCheckbox.HiddenInput data-testid={`${fieldProps.testId}--input-${i()}`} />
						</ArkCheckbox.Root>
					)}
				</For>
			</ArkCheckbox.Group>
			{fieldProps.error && (
				<div
					class={cx("field-error", fieldProps.classes?.error)}
					data-testid={fieldProps.testId ? `${fieldProps.testId}--error` : undefined}
				>
					{fieldProps.error}
				</div>
			)}
		</fieldset>
	);
}
