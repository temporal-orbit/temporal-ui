import type { BadgeProps as CoreBadgeProps } from "@temporal-ui/core/badge";
import { cx } from "@temporal-ui/core/utils/cx";
import type React from "react";

export interface BadgeProps extends CoreBadgeProps<React.ReactNode>, React.HTMLAttributes<HTMLSpanElement> {}

export function Badge(props: BadgeProps) {
	const { variant, className, testId, ...rest } = props;

	const baseClass = ["badge", variant].filter(Boolean).join("-");

	return (
		<span className={cx(baseClass, className)} data-testid={testId} {...rest}>
			{props.children}
		</span>
	);
}
