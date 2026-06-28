import type { HTMLProps } from "@ark-ui/solid";
import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import type { SwitchProps as CoreSwitchProps } from "@temporal-ui/core/switch";
import { testId } from "@temporal-ui/core/utils/string";
import type { JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { Field } from "../field";

export interface SwitchProps
	extends CoreSwitchProps<JSX.Element>, Omit<HTMLProps<"input">, "checked" | "onInput" | "size"> {}

export function Switch(_props: SwitchProps) {
	const [fieldProps, rootProps] = splitProps(
		_props,
		["label", "hint", "error", "required", "readOnly", "disabled", "classes", "testId", "size"],
		["defaultChecked", "checked", "onCheckedChange"],
	);

	const tid = testId(fieldProps.testId);

	return (
		<Field
			label={undefined}
			hint={fieldProps.hint}
			classes={fieldProps.classes}
			required={fieldProps.required}
			readOnly={fieldProps.readOnly}
			error={fieldProps.error}
			disabled={fieldProps.disabled}
			testId={tid("-field")}
		>
			<ArkSwitch.Root
				defaultChecked={rootProps.defaultChecked}
				checked={rootProps.checked}
				onCheckedChange={(details) => rootProps.onCheckedChange?.(details.checked)}
				disabled={fieldProps.disabled}
				readOnly={fieldProps.readOnly}
				invalid={!!fieldProps.error}
				required={fieldProps.required}
				data-size={fieldProps.size ?? "md"}
				data-testid={tid("--root")}
			>
				<ArkSwitch.Control data-testid={tid("--control")} class={fieldProps.classes?.control}>
					<ArkSwitch.Thumb data-testid={tid("--thumb")} class={fieldProps.classes?.thumb} />
				</ArkSwitch.Control>
				<Show when={fieldProps.label}>
					<ArkSwitch.Label data-testid={tid("--label")} class={fieldProps.classes?.label}>
						{fieldProps.label}
					</ArkSwitch.Label>
				</Show>
				<ArkSwitch.HiddenInput data-testid={tid("--input")} class={fieldProps.classes?.input} />
			</ArkSwitch.Root>
		</Field>
	);
}
