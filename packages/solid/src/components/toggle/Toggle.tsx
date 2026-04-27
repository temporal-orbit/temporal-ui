import { Toggle as ArkToggle } from "@ark-ui/solid/toggle";
import type { ToggleProps as CoreToggleProps } from "@temporal-ui/core/toggle";
import type { ComponentProps, JSX } from "solid-js";
import { splitProps } from "solid-js";
import { Field } from "../field";
import { testId } from "@temporal-ui/core/utils/string";

export interface ToggleProps
	extends
		CoreToggleProps<JSX.Element>,
		Omit<ComponentProps<typeof ArkToggle.Root>, keyof CoreToggleProps<JSX.Element>> {}

export function Toggle(_props: ToggleProps) {
	const [fieldProps, rootProps] = splitProps(_props, [
		"label",
		"hint",
		"error",
		"required",
		"readOnly",
		"disabled",
		"classes",
		"testId",
	]);

	const tid = testId(fieldProps.testId);

	return (
		<Field {...fieldProps} testId={tid("-field")}>
			<ArkToggle.Root
				{...rootProps}
				disabled={fieldProps.disabled}
				aria-invalid={fieldProps.error ? true : undefined}
				aria-required={fieldProps.required}
				class={fieldProps.classes?.control}
				data-testid={tid("--root")}
			/>
		</Field>
	);
}

export const ToggleIndicator = ArkToggle.Indicator;
