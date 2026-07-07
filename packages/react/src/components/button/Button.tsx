import type { ButtonProps as CoreButtonProps } from "@temporal-ui/core/button";
import type React from "react";
import { Loader } from "../loader";
import { Tooltip } from "../tooltip";

export interface ButtonProps
	extends CoreButtonProps<React.ReactNode>, React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
	const {
		variant = "primary",
		size = "md",
		icon = false,
		type = "button",
		className,
		children,
		disabled,
		loading,
		testId,
		disabledTooltip,
		...rest
	} = props;

	const isDisabled = disabled || loading;

	const button = (
		<button
			{...rest}
			type={type}
			className={className}
			disabled={isDisabled}
			data-component="button"
			data-size={size}
			data-variant={variant}
			data-icon={icon || undefined}
			data-loading={loading || undefined}
			data-testid={testId}
		>
			{loading && (
				<Loader
					size={size}
					className={"loading"}
					data-testid={testId ? `${testId}--loader` : undefined}
				/>
			)}
			<span className={"inner"}>{children}</span>
		</button>
	);

	if (disabledTooltip && isDisabled) {
		return (
			<Tooltip trigger={button} disabledTrigger>
				{disabledTooltip}
			</Tooltip>
		);
	}

	return button;
}
