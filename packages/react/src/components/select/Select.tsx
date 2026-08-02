import { Portal } from "@ark-ui/react/portal";
import { Select as ArkSelect, useSelect, type CollectionItem } from "@ark-ui/react/select";
import type { SelectProps as CoreSelectProps } from "@temporal-ui/core/select";
import { alignItemWithTriggerPositioning } from "@temporal-ui/core/select";
import { cx } from "@temporal-ui/core/utils/cx";
import { testId } from "@temporal-ui/core/utils/string";
import { ChevronsUpDown, X } from "lucide-react";
import { useEffect, useId, useMemo, useState } from "react";
import { Field } from "../field";
import { SelectContent, type SelectItem } from "./SelectContent";

export interface SelectProps<D extends CollectionItem = never>
	extends CoreSelectProps<React.ReactNode>, ArkSelect.RootProps<SelectItem<D>> {}

export function Select<D extends CollectionItem>(props: SelectProps<D>) {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		testId: testIdProp,
		icon,
		placeholder,
		portal,
		className,
		maxDropdownHeight,
		deselectable,
		alignItemWithTrigger,
		alignItemWithTriggerMinHeight,
		positioning,
		ids,
		...rootProps
	} = props;

	const [openedWithTouch, setOpenedWithTouch] = useState(false);
	const instanceId = useId().replace(/:/g, "");
	const selectIds = useMemo(
		() =>
			alignItemWithTrigger
				? {
						control: `${instanceId}-control`,
						trigger: `${instanceId}-trigger`,
						valueText: `${instanceId}-value-text`,
						positioner: `${instanceId}-positioner`,
						content: `${instanceId}-content`,
					}
				: undefined,
		[instanceId, alignItemWithTrigger],
	);

	const select = useSelect({
		...rootProps,
		disabled,
		invalid: !!error,
		required,
		readOnly,
		ids:
			alignItemWithTrigger && selectIds
				? {
						...ids,
						control: selectIds.control,
						trigger: selectIds.trigger,
						positioner: selectIds.positioner,
						content: selectIds.content,
					}
				: ids,
		positioning: alignItemWithTrigger
			? {
					...alignItemWithTriggerPositioning,
					...positioning,
					getAnchorElement: () => document.getElementById(selectIds!.control),
				}
			: positioning,
	});

	const tid = testId(testIdProp);

	useEffect(() => {
		if (!select.open) {
			setOpenedWithTouch(false);
		}
	}, [select.open]);

	return (
		<Field
			label={label}
			hint={hint}
			classes={classes}
			required={required}
			readOnly={readOnly}
			error={error}
			disabled={disabled}
			testId={tid("-field")}
		>
			<ArkSelect.RootProvider
				value={select}
				className={classes?.selectRoot}
				data-testid={tid("--root")}
				data-align-item-with-trigger={alignItemWithTrigger ? "" : undefined}
			>
				<ArkSelect.Control
					id={selectIds?.control}
					aria-invalid={!!error}
					className={cx(classes?.control, className)}
					data-testid={tid("--control")}
				>
					<ArkSelect.Trigger
						id={selectIds?.trigger}
						className={classes?.trigger}
						data-testid={tid("--trigger")}
						onPointerDown={
							alignItemWithTrigger
								? (event) => {
										setOpenedWithTouch(event.pointerType === "touch");
									}
								: undefined
						}
					>
						{select.selectedItems[0]?.icon || icon}
						<ArkSelect.ValueText
							id={selectIds?.valueText}
							className={classes?.valueText}
							placeholder={placeholder}
							data-testid={tid("--value-text")}
						/>
						{(!deselectable || !select.hasSelectedItems) && <ChevronsUpDown />}
					</ArkSelect.Trigger>
					{deselectable && select.hasSelectedItems && (
						<ArkSelect.ClearTrigger data-testid={tid("--clear-trigger")}>
							<X />
						</ArkSelect.ClearTrigger>
					)}
				</ArkSelect.Control>
				{portal && (
					<Portal>
						<SelectContent
							tid={tid}
							maxHeight={maxDropdownHeight}
							classes={classes}
							alignItemWithTrigger={alignItemWithTrigger}
							alignItemWithTriggerMinHeight={alignItemWithTriggerMinHeight}
							openedWithTouch={openedWithTouch}
							selectIds={selectIds}
						/>
					</Portal>
				)}
				{!portal && (
					<SelectContent
						tid={tid}
						maxHeight={maxDropdownHeight}
						classes={classes}
						alignItemWithTrigger={alignItemWithTrigger}
						alignItemWithTriggerMinHeight={alignItemWithTriggerMinHeight}
						openedWithTouch={openedWithTouch}
						selectIds={selectIds}
					/>
				)}
				<ArkSelect.HiddenSelect data-testid={tid("--input")} />
			</ArkSelect.RootProvider>
		</Field>
	);
}
