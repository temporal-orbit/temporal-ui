import { RadioGroup as ArkRadioGroup } from "@ark-ui/react/radio-group";
import type { RadioGroupProps as CoreRadioGroupProps } from "@temporal-ui/core/radio-group";
import type React from "react";
import { Field } from "../field";

export interface RadioGroupProps extends CoreRadioGroupProps<React.ReactNode> {}

export type { RadioGroupClasses, RadioGroupItem } from "@temporal-ui/core/radio-group";

export function RadioGroup(props: RadioGroupProps) {
	const {
		label,
		hint,
		error,
		disabled,
		items,
		classes,
		defaultValue,
		value,
		required,
		readOnly,
		onValueChange,
		orientation,
		testId,
	} = props;

	return (
		<Field
			label={label}
			hint={hint}
			error={error}
			disabled={disabled}
			required={required}
			readOnly={readOnly}
			classes={classes}
			testId={testId ? `${testId}-field` : undefined}
		>
			<ArkRadioGroup.Root
				className={classes?.group}
				defaultValue={defaultValue}
				disabled={disabled}
				value={value}
				onValueChange={(details) => onValueChange?.(details.value)}
				orientation={orientation}
				readOnly={readOnly}
				aria-required={required}
				data-testid={testId ? `${testId}--root` : undefined}
			>
				<ArkRadioGroup.Indicator className={classes?.indicator} />
				{items.map((item) => (
					<ArkRadioGroup.Item
						key={item.value}
						className={classes?.item}
						value={item.value}
						disabled={item.disabled}
						invalid={!!error}
						data-testid={testId ? `${testId}--item-${item.value}` : undefined}
					>
						<ArkRadioGroup.ItemControl
							className={classes?.itemControl}
							data-testid={testId ? `${testId}--item-control-${item.value}` : undefined}
						/>
						<ArkRadioGroup.ItemText
							className={classes?.itemText}
							data-testid={testId ? `${testId}--item-text-${item.value}` : undefined}
						>
							{item.label}
						</ArkRadioGroup.ItemText>
						<ArkRadioGroup.ItemHiddenInput
							className={classes?.itemInput}
							data-testid={testId ? `${testId}--item-input-${item.value}` : undefined}
						/>
					</ArkRadioGroup.Item>
				))}
			</ArkRadioGroup.Root>
		</Field>
	);
}
