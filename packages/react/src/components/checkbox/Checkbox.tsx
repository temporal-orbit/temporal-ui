import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import type { CheckboxProps as CoreCheckboxProps } from "@temporal-ui/core/checkbox";
import { CheckIcon } from "lucide-react";
import type React from "react";
import { forwardRef } from "react";
import { Field } from "../field";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface CheckboxProps extends CoreCheckboxProps<React.ReactNode> {}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		defaultChecked,
		checked,
		onCheckedChange,
		testId,
		...rest
	} = props;

	const tid = testIdFn(testId);

	return (
		<Field
			label={undefined}
			hint={hint}
			classes={classes}
			required={required}
			readOnly={readOnly}
			error={error}
			disabled={disabled}
			testId={tid("-field")}
		>
			<ArkCheckbox.Root
				defaultChecked={defaultChecked}
				checked={checked}
				onCheckedChange={(details) => onCheckedChange?.(details.checked)}
				data-testid={tid("--root")}
			>
				<ArkCheckbox.Control data-testid={tid("--control")} className={classes?.control}>
					<ArkCheckbox.Indicator data-testid={tid("--indicator")} className={classes?.indicator}>
						<CheckIcon />
					</ArkCheckbox.Indicator>
				</ArkCheckbox.Control>
				<ArkCheckbox.Label data-testid={tid("--label")} className={classes?.label}>
					{label}
				</ArkCheckbox.Label>
				<ArkCheckbox.HiddenInput
					ref={ref}
					data-testid={tid("--input")}
					className={classes?.input}
					{...rest}
				/>
			</ArkCheckbox.Root>
		</Field>
	);
});
