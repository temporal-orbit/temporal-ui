import type { HTMLProps } from "@ark-ui/solid";
import type { ButtonProps as CoreButtonProps } from "@temporal-ui/core/button";
import type { JSX } from "solid-js";
import { mergeProps, Show, splitProps } from "solid-js";
import { Loader } from "../loader";
import { Tooltip } from "../tooltip";

export interface ButtonProps extends CoreButtonProps<JSX.Element>, HTMLProps<"button"> {}

export function Button(_props: ButtonProps) {
	const [props, elementProps] = splitProps(
		mergeProps<ButtonProps[]>(
			{ size: "md", variant: "primary", icon: false, type: "button" },
			_props,
		),
		[
			"size",
			"variant",
			"icon",
			"loading",
			"disabled",
			"children",
			"className",
			"class",
			"testId",
			"disabledTooltip",
		],
	);

	const isDisabled = () => props.disabled || props.loading;

	const renderButton = () => (
		<button
			{...elementProps}
			class={props.className || props.class}
			disabled={isDisabled()}
			data-component="button"
			data-size={props.size}
			data-variant={props.variant}
			data-icon={props.icon || undefined}
			data-loading={props.loading || undefined}
			data-testid={props.testId}
		>
			<Show when={props.loading}>
				<Loader
					size={props.size}
					className={"loading"}
					data-testid={props.testId ? `${props.testId}--loader` : undefined}
				/>
			</Show>
			<span class={"inner"}>{props.children}</span>
		</button>
	);

	return (
		<Show when={props.disabledTooltip && isDisabled()} fallback={renderButton()}>
			<Tooltip trigger={renderButton} disabledTrigger>
				{props.disabledTooltip}
			</Tooltip>
		</Show>
	);
}
