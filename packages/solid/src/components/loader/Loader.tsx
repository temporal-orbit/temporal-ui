import type { HTMLProps } from "@ark-ui/solid";
import type { LoaderProps as CoreLoaderProps } from "@temporal-ui/core/loader";
import { cx } from "@temporal-ui/core/utils/cx";
import { mergeProps, splitProps, type JSX } from "solid-js";

export interface LoaderProps extends CoreLoaderProps<JSX.Element>, HTMLProps<"div"> {}
export function Loader(_props: LoaderProps) {
	const [props, elementProps] = splitProps(mergeProps<LoaderProps[]>({ size: "md" }, _props), [
		"size",
		"className",
		"class",
		"testId",
	]);

	const size = props.size !== "md" ? props.size : "";
	const baseClass = ["loader", size].filter(Boolean).join("-");

	return (
		<div
			{...elementProps}
			class={cx("loader", baseClass, props.className, props.class)}
			data-testid={props.testId}
		/>
	);
}
