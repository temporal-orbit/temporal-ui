import { ToggleGroup as ArkToggleGroup } from "@ark-ui/solid/toggle-group";
import type { ToggleGroupProps as CoreToggleGroupProps } from "@temporal-ui/core/toggle";
import type { Accessor, ComponentProps, JSX } from "solid-js";
import { createContext, createMemo, splitProps, useContext } from "solid-js";
import { Field } from "../field";

const ToggleGroupInvalidContext = createContext<Accessor<boolean> | undefined>();

export interface ToggleGroupProps
	extends
		CoreToggleGroupProps<JSX.Element>,
		Omit<ComponentProps<typeof ArkToggleGroup.Root>, keyof CoreToggleGroupProps<JSX.Element>> {}

export interface ToggleGroupItemProps extends ComponentProps<typeof ArkToggleGroup.Item> {}

export function ToggleGroup(_props: ToggleGroupProps) {
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

	const invalid = createMemo(() => !!fieldProps.error);

	return (
		<Field {...fieldProps} testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}>
			<ToggleGroupInvalidContext.Provider value={invalid}>
				<ArkToggleGroup.Root
					{...rootProps}
					disabled={fieldProps.disabled}
					aria-required={fieldProps.required}
					class={fieldProps.classes?.group}
					data-testid={fieldProps.testId ? `${fieldProps.testId}--root` : undefined}
				/>
			</ToggleGroupInvalidContext.Provider>
		</Field>
	);
}

export function ToggleGroupItem(props: ToggleGroupItemProps) {
	const invalid = useContext(ToggleGroupInvalidContext);
	const [local, rest] = splitProps(props, ["aria-invalid"]);
	const mergedInvalid = () => !!invalid?.() || local["aria-invalid"] === true || local["aria-invalid"] === "true";

	return <ArkToggleGroup.Item {...rest} aria-invalid={mergedInvalid() ? true : undefined} />;
}
