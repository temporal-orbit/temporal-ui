import type { HTMLProps } from "@ark-ui/solid";
import type { BadgeProps as CoreBadgeProps } from "@temporal-ui/core/badge";
import { cx } from "@temporal-ui/core/utils/cx";
import { splitProps, type JSX } from "solid-js";

export interface BadgeProps extends CoreBadgeProps<JSX.Element>, HTMLProps<"span"> {}

export function Badge(_props: BadgeProps) {
	const [props, elementProps] = splitProps(_props, [
		"variant",
		"className",
		"class",
		"children",
		"testId",
	]);

	const baseClass = ["badge", props.variant].filter(Boolean).join("-");

	return (
		<span
			{...elementProps}
			class={cx(baseClass, props.className, props.class)}
			data-testid={props.testId}
		>
			{props.children}
		</span>
	);
}
