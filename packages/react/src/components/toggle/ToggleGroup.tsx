import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react/toggle-group";
import type { ToggleGroupProps as CoreToggleGroupProps } from "@temporal-ui/core/toggle";
import { cx } from "@temporal-ui/core/utils/cx";
import type React from "react";
import { createContext, useContext } from "react";
import { Field } from "../field";

const ToggleGroupInvalidContext = createContext(false);

export interface ToggleGroupProps
	extends
		CoreToggleGroupProps<React.ReactNode>,
		Omit<React.ComponentProps<typeof ArkToggleGroup.Root>, keyof CoreToggleGroupProps<React.ReactNode>> {}

export interface ToggleGroupItemProps extends React.ComponentProps<typeof ArkToggleGroup.Item> {}

export function ToggleGroup(props: ToggleGroupProps) {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		testId,
		children,
		variant = "default",
		className,
		...rest
	} = props;

	const invalid = !!error;

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
			<ToggleGroupInvalidContext.Provider value={invalid}>
				<ArkToggleGroup.Root
					{...rest}
					disabled={disabled}
					aria-required={required}
					className={cx(classes?.group, className)}
					data-variant={variant}
					data-testid={testId ? `${testId}--root` : undefined}
				>
					{children}
				</ArkToggleGroup.Root>
			</ToggleGroupInvalidContext.Provider>
		</Field>
	);
}

export function ToggleGroupItem(props: ToggleGroupItemProps) {
	const invalid = useContext(ToggleGroupInvalidContext);
	const { "aria-invalid": ariaInvalid, ...rest } = props;
	const mergedInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";

	return <ArkToggleGroup.Item {...rest} aria-invalid={mergedInvalid || undefined} />;
}
