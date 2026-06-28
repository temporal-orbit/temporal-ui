import { Switch as ArkSwitch } from "@ark-ui/react/switch";
import type { SwitchProps as CoreSwitchProps } from "@temporal-ui/core/switch";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";
import type React from "react";
import { forwardRef } from "react";
import { Field } from "../field";

export interface SwitchProps extends CoreSwitchProps<React.ReactNode> {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, ref) => {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		size = "md",
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
			<ArkSwitch.Root
				defaultChecked={defaultChecked}
				checked={checked}
				onCheckedChange={(details) => onCheckedChange?.(details.checked)}
				disabled={disabled}
				readOnly={readOnly}
				invalid={!!error}
				required={required}
				data-size={size}
				data-testid={tid("--root")}
			>
				<ArkSwitch.Control data-testid={tid("--control")} className={classes?.control}>
					<ArkSwitch.Thumb data-testid={tid("--thumb")} className={classes?.thumb} />
				</ArkSwitch.Control>
				<ArkSwitch.Label data-testid={tid("--label")} className={classes?.label}>
					{label}
				</ArkSwitch.Label>
				<ArkSwitch.HiddenInput
					ref={ref}
					data-testid={tid("--input")}
					className={classes?.input}
					{...rest}
				/>
			</ArkSwitch.Root>
		</Field>
	);
});
