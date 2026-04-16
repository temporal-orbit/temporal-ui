import type { HTMLProps } from "@ark-ui/solid";
import type { AlertProps as CoreAlertProps } from "@temporal-ui/core/alert";
import { cx } from "@temporal-ui/core/utils/cx";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-solid";
import { type Accessor, type JSX, mergeProps, splitProps } from "solid-js";

export interface AlertProps extends CoreAlertProps<JSX.Element>, HTMLProps<"div"> {
	icon?: Accessor<JSX.Element>;
}

const icons: Record<string, Accessor<JSX.Element>> = {
	default: () => null,
	info: () => <Info data-scope="alert" data-part="icon" />,
	success: () => <CircleCheck data-scope="alert" data-part="icon" />,
	warning: () => <TriangleAlert data-scope="alert" data-part="icon" />,
	error: () => <CircleX data-scope="alert" data-part="icon" />,
};

export function Alert(_props: AlertProps) {
	const [props, divProps] = splitProps(mergeProps({ variant: "default" }, _props), [
		"variant",
		"icon",
		"title",
		"description",
		"children",
		"className",
		"testId",
	]);
	const baseClass = ["alert", props.variant].filter(Boolean).join("-");
	return (
		<div
			{...divProps}
			role="alert"
			data-scope="alert"
			data-part="root"
			class={cx(baseClass, props.className)}
			data-testid={props.testId}
		>
			{props.icon !== undefined ? props.icon() : icons[props.variant]?.()}
			{props.title && (
				<h2 data-scope="alert" data-part="title" data-testid={props.testId ? `${props.testId}--title` : undefined}>
					{props.title}
				</h2>
			)}
			{props.description && (
				<section
					data-scope="alert"
					data-part="description"
					data-testid={props.testId ? `${props.testId}--description` : undefined}
				>
					{props.description}
				</section>
			)}
			{props.children && (
				<section data-scope="alert" data-part="content">
					{props.children}
				</section>
			)}
		</div>
	);
}
