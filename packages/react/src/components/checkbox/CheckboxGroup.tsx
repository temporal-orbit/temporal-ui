import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import type { CheckboxGroupProps as CoreCheckboxGroupProps } from "@temporal-ui/core/checkbox";
import { cx } from "@temporal-ui/core/utils/cx";
import { CheckIcon } from "lucide-react";
import type React from "react";

export interface CheckboxGroupProps extends CoreCheckboxGroupProps<React.ReactNode> {}

export type { CheckboxGroupItem } from "@temporal-ui/core/checkbox";

export function CheckboxGroup(props: CheckboxGroupProps) {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		name,
		items,
		defaultValues,
		values,
		testId,
		onValuesChange,
	} = props;

	return (
		<fieldset
			className={cx("field-root", classes?.root)}
			data-testid={testId ? `${testId}--fieldset` : undefined}
		>
			{label && (
				<legend
					className={cx("field-label", classes?.label)}
					data-testid={testId ? `${testId}--legend` : undefined}
				>
					{label}
					{required && <span title="required">*</span>}
				</legend>
			)}
			{hint && (
				<div
					className={cx("field-hint", classes?.hint)}
					aria-disabled={disabled}
					data-testid={testId ? `${testId}--hint` : undefined}
				>
					{hint}
				</div>
			)}
			<ArkCheckbox.Group
				name={name}
				value={values}
				disabled={disabled}
				invalid={!!error}
				readOnly={readOnly}
				defaultValue={defaultValues}
				onValueChange={onValuesChange}
				data-testid={testId ? `${testId}--group` : undefined}
			>
				{items.map((item, i) => (
					<ArkCheckbox.Root
						value={item.value}
						key={item.value}
						data-testid={testId ? `${testId}--item-${i}` : undefined}
					>
						<ArkCheckbox.Control data-testid={testId ? `${testId}--control-${i}` : undefined}>
							<ArkCheckbox.Indicator data-testid={testId ? `${testId}--indicator-${i}` : undefined}>
								<CheckIcon />
							</ArkCheckbox.Indicator>
						</ArkCheckbox.Control>
						<ArkCheckbox.Label data-testid={testId ? `${testId}--label-${i}` : undefined}>
							{item.label}
						</ArkCheckbox.Label>
						<ArkCheckbox.HiddenInput data-testid={testId ? `${testId}--input-${i}` : undefined} />
					</ArkCheckbox.Root>
				))}
			</ArkCheckbox.Group>
			{error && (
				<div
					className={cx("field-error", classes?.error)}
					data-testid={testId ? `${testId}--error` : undefined}
				>
					{error}
				</div>
			)}
		</fieldset>
	);
}
