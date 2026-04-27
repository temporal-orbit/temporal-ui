import type { ButtonProps as CoreButtonProps } from "@temporal-ui/core/button";
import type React from "react";
import { Loader } from "../loader";

export interface ButtonProps extends CoreButtonProps<React.ReactNode>, React.ButtonHTMLAttributes<HTMLButtonElement> {}

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
		...rest
	} = props;

	return (
		<button
			{...rest}
			type={type}
			className={className}
			disabled={disabled || loading}
			data-component="button"
			data-size={size}
			data-variant={variant}
			data-icon={icon || undefined}
			data-loading={loading || undefined}
			data-testid={testId}
		>
			{loading && <Loader size={size} className={"loading"} data-testid={testId ? `${testId}--loader` : undefined} />}
			<span className={"inner"}>{children}</span>
		</button>
	);
}
