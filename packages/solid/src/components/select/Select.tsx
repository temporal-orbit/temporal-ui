import { Select as ArkSelect, useSelect } from "@ark-ui/solid/select";
import type { SelectProps as CoreSelectProps } from "@temporal-ui/core/select";
import { alignItemWithTriggerPositioning } from "@temporal-ui/core/select";
import { cx } from "@temporal-ui/core/utils/cx";
import { testId } from "@temporal-ui/core/utils/string";
import { ChevronsUpDown, X } from "lucide-solid";
import {
	createEffect,
	createMemo,
	createSignal,
	createUniqueId,
	mergeProps,
	Show,
	splitProps,
	type JSX,
} from "solid-js";
import { Portal } from "solid-js/web";
import { Field, fieldAttributes } from "../field";
import { SelectContent, type SelectItem } from "./SelectContent";

export interface SelectProps<D = unknown>
	extends CoreSelectProps<JSX.Element>, ArkSelect.RootProps<SelectItem<D>> {}

export function Select<D = unknown>(_props: SelectProps<D>) {
	const [fieldProps, controlProps, rootProps] = splitProps(_props, fieldAttributes, [
		"portal",
		"icon",
		"maxDropdownHeight",
		"className",
		"class",
		"deselectable",
		"placeholder",
		"alignItemWithTrigger",
		"alignItemWithTriggerMinHeight",
	]);

	const [openedWithTouch, setOpenedWithTouch] = createSignal(false);
	const selectInstanceId = createUniqueId();
	const selectIds = createMemo(() => {
		if (!controlProps.alignItemWithTrigger) {
			return undefined;
		}
		const id = selectInstanceId;
		return {
			control: `${id}-control`,
			trigger: `${id}-trigger`,
			valueText: `${id}-value-text`,
			positioner: `${id}-positioner`,
			content: `${id}-content`,
		};
	});

	const useSelectProps = mergeProps(rootProps, {
		disabled: fieldProps.disabled,
		invalid: !!fieldProps.error,
		required: fieldProps.required,
		readOnly: fieldProps.readOnly,
		ids:
			controlProps.alignItemWithTrigger && selectIds()
				? {
						...rootProps.ids,
						control: selectIds()!.control,
						trigger: selectIds()!.trigger,
						positioner: selectIds()!.positioner,
						content: selectIds()!.content,
					}
				: rootProps.ids,
		positioning: controlProps.alignItemWithTrigger
			? {
					...alignItemWithTriggerPositioning,
					...rootProps.positioning,
					getAnchorElement: () => document.getElementById(selectIds()!.control),
				}
			: rootProps.positioning,
	});

	const select = useSelect(useSelectProps);

	const tid = testId(fieldProps.testId);

	createEffect(() => {
		if (!select().open) {
			setOpenedWithTouch(false);
		}
	});

	const contentProps = () => ({
		tid,
		maxHeight: controlProps.maxDropdownHeight,
		classes: fieldProps.classes,
		alignItemWithTrigger: controlProps.alignItemWithTrigger,
		alignItemWithTriggerMinHeight: controlProps.alignItemWithTriggerMinHeight,
		openedWithTouch: openedWithTouch(),
		selectIds: selectIds(),
	});

	return (
		<Field {...fieldProps} testId={tid("-field")}>
			<ArkSelect.RootProvider
				value={select}
				class={fieldProps.classes?.selectRoot}
				data-testid={tid("--root")}
				data-align-item-with-trigger={controlProps.alignItemWithTrigger ? "" : undefined}
			>
				<ArkSelect.Control
					id={selectIds()?.control}
					aria-invalid={!!fieldProps.error}
					class={cx(fieldProps.classes?.control, controlProps.class, controlProps.className)}
					data-testid={tid("--control")}
				>
					<ArkSelect.Trigger
						id={selectIds()?.trigger}
						class={fieldProps.classes?.trigger}
						data-testid={tid("--trigger")}
						onPointerDown={
							controlProps.alignItemWithTrigger
								? (event) => {
										setOpenedWithTouch(event.pointerType === "touch");
									}
								: undefined
						}
					>
						{select().selectedItems[0]?.icon || controlProps.icon}
						<ArkSelect.ValueText
							id={selectIds()?.valueText}
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
						<SelectContent {...contentProps()} />
					</Portal>
				</Show>
				<Show when={!controlProps.portal}>
					<SelectContent {...contentProps()} />
				</Show>
				<ArkSelect.HiddenSelect data-testid={tid("--input")} />
			</ArkSelect.RootProvider>
		</Field>
	);
}
