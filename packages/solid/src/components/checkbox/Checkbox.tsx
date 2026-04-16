import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import type { CheckboxProps as CoreCheckboxProps } from "@temporal-ui/core/checkbox";
import type { JSX } from "solid-js";
import { Show, splitProps } from "solid-js";
import { Field } from "../field";
import type { HTMLProps } from "@ark-ui/solid";
import { CheckIcon } from "lucide-solid";
import { testId } from "@temporal-ui/core/utils/string";

export interface CheckboxProps
	extends CoreCheckboxProps<JSX.Element>, Omit<HTMLProps<"input">, "checked" | "onInput"> {}

export function Checkbox(_props: CheckboxProps) {
	const [fieldProps, rootProps] = splitProps(
		_props,
		["label", "hint", "error", "required", "readOnly", "disabled", "classes", "testId"],
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
			<ArkCheckbox.Root
				defaultChecked={rootProps.defaultChecked}
				checked={rootProps.checked}
				onCheckedChange={(details) => rootProps.onCheckedChange?.(details.checked)}
				disabled={fieldProps.disabled}
				readOnly={fieldProps.readOnly}
				invalid={!!fieldProps.error}
				required={fieldProps.required}
				data-testid={tid("--root")}
			>
				<ArkCheckbox.Control data-testid={tid("--control")} class={fieldProps.classes?.control}>
					<ArkCheckbox.Indicator data-testid={tid("--indicator")} class={fieldProps.classes?.indicator}>
						<CheckIcon />
					</ArkCheckbox.Indicator>
				</ArkCheckbox.Control>
				<Show when={fieldProps.label}>
					<ArkCheckbox.Label data-testid={tid("--label")} class={fieldProps.classes?.label}>
						{fieldProps.label}
					</ArkCheckbox.Label>
				</Show>
				<ArkCheckbox.HiddenInput data-testid={tid("--input")} class={fieldProps.classes?.input} />
			</ArkCheckbox.Root>
		</Field>
	);
}
