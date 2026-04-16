import type { StackProps as CoreStackProps } from "@temporal-ui/core/stack";
import type React from "react";
import { Box } from "../box";
import { cx } from "@temporal-ui/core/utils/cx";

export interface StackProps extends CoreStackProps<React.ReactNode>, React.HTMLAttributes<HTMLDivElement> {}

export function Stack({
	className,
	children,
	row = false,
	reverse = false,
	center = false,
	gap,
	align,
	justify,
	testId,
	...rest
}: StackProps) {
	const baseClass = center ? "stack-center" : ["stack", row && "row", reverse && "reverse"].filter(Boolean).join("-");

	const style: React.CSSProperties = {};

	if (gap) {
		style.gap = `calc(var(--spacing) * ${gap})`;
	}
	if (align) {
		style.alignItems = align;
	}
	if (justify) {
		style.justifyContent = justify;
	}

	return (
		<Box {...rest} className={cx(baseClass, className)} style={{ ...style, ...rest.style }} data-testid={testId}>
			{children}
		</Box>
	);
}
