import { Select as ArkSelect, useSelect } from "@ark-ui/solid/select";
import type { SelectProps as CoreSelectProps } from "@temporal-ui/core/select";
import { cx } from "@temporal-ui/core/utils/cx";
import { testId } from "@temporal-ui/core/utils/string";
import { ChevronsUpDown, X } from "lucide-solid";
import { mergeProps, Show, splitProps, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { Field, fieldAttributes } from "../field";
import { SelectContent, type SelectItem } from "./SelectContent";

export interface SelectProps<D = unknown> extends CoreSelectProps<JSX.Element>, ArkSelect.RootProps<SelectItem<D>> {}

export function Select<D = unknown>(_props: SelectProps<D>) {
	const [fieldProps, controlProps, rootProps] = splitProps(_props, fieldAttributes, [
		"portal",
		"icon",
		"maxDropdownHeight",
		"className",
		"class",
		"deselectable",
		"placeholder",
	]);

	const useSelectProps = mergeProps(rootProps, {
		disabled: fieldProps.disabled,
		invalid: !!fieldProps.error,
		required: fieldProps.required,
		readOnly: fieldProps.readOnly,
	});

	const select = useSelect(useSelectProps);

	const tid = testId(fieldProps.testId);

	return (
		<Field {...fieldProps} testId={tid("-field")}>
			<ArkSelect.RootProvider value={select} class={fieldProps.classes?.selectRoot} data-testid={tid("--root")}>
				<ArkSelect.Control
					aria-invalid={!!fieldProps.error}
					class={cx(fieldProps.classes?.control, controlProps.class)}
					data-testid={tid("--control")}
				>
					<ArkSelect.Trigger class={fieldProps.classes?.trigger} data-testid={tid("--trigger")}>
						{select().selectedItems[0]?.icon || controlProps.icon}
						<ArkSelect.ValueText
							class={fieldProps.classes?.valueText}
							placeholder={controlProps.placeholder}
							data-testid={tid("--value-text")}
						/>
						<Show when={!controlProps.deselectable || !select().hasSelectedItems}>
							<ChevronsUpDown />
						</Show>
					</ArkSelect.Trigger>
					<Show when={controlProps.deselectable && select().hasSelectedItems}>
						<ArkSelect.ClearTrigger data-testid={tid("--clear-trigger")}>
							<X />
						</ArkSelect.ClearTrigger>
					</Show>
				</ArkSelect.Control>
				<Show when={controlProps.portal}>
					<Portal>
						<SelectContent tid={tid} maxHeight={controlProps.maxDropdownHeight} classes={fieldProps.classes} />
					</Portal>
				</Show>
				<Show when={!controlProps.portal}>
					<SelectContent tid={tid} maxHeight={controlProps.maxDropdownHeight} classes={fieldProps.classes} />
				</Show>
				<ArkSelect.HiddenSelect data-testid={tid("--input")} />
			</ArkSelect.RootProvider>
		</Field>
	);
}
