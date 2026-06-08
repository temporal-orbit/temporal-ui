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
	info: () => <Info />,
	success: () => <CircleCheck />,
	warning: () => <TriangleAlert />,
	error: () => <CircleX />,
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
			data-component="alert"
			data-slot="root"
			class={cx(baseClass, props.className)}
			data-testid={props.testId}
		>
			{props.icon !== undefined ? props.icon() : icons[props.variant]?.()}
			{props.title && (
				<h2
					data-component="alert"
					data-slot="title"
					data-testid={props.testId ? `${props.testId}--title` : undefined}
				>
					{props.title}
				</h2>
			)}
			{props.description && (
				<section
					data-component="alert"
					data-slot="description"
					data-testid={props.testId ? `${props.testId}--description` : undefined}
				>
					{props.description}
				</section>
			)}
			{props.children && (
				<section data-component="alert" data-slot="content">
					{props.children}
				</section>
			)}
		</div>
	);
}
