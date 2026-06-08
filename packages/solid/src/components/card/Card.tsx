import type { HTMLProps } from "@ark-ui/solid";
import type { CardProps as CoreCardProps } from "@temporal-ui/core/card";
import { cx } from "@temporal-ui/core/utils/cx";
import { splitProps, type JSX } from "solid-js";

export interface CardProps extends CoreCardProps<JSX.Element>, HTMLProps<"div"> {}
export function Card(_props: CardProps) {
	const [props, elementProps] = splitProps(_props, ["className", "class", "children", "testId"]);

	return (
		<div
			{...elementProps}
			class={cx("card", props.className, props.class)}
			data-testid={props.testId}
		>
			{props.children}
		</div>
	);
}
