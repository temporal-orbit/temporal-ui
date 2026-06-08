import { Select as ArkSelect, useSelect, type CollectionItem } from "@ark-ui/react/select";
import { Portal } from "@ark-ui/react/portal";
import type { SelectProps as CoreSelectProps } from "@temporal-ui/core/select";
import { cx } from "@temporal-ui/core/utils/cx";
import { Field } from "../field";
import { SelectContent, type SelectItem } from "./SelectContent";
import { testId } from "@temporal-ui/core/utils/string";
import { ChevronsUpDown, X } from "lucide-react";

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
		...rootProps
	} = props;

	const select = useSelect({
		...rootProps,
		disabled,
		invalid: !!error,
		required,
		readOnly,
	});

	const tid = testId(testIdProp);

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
			>
				<ArkSelect.Control
					aria-invalid={!!error}
					className={cx(classes?.control, className)}
					data-testid={tid("--control")}
				>
					<ArkSelect.Trigger className={classes?.trigger} data-testid={tid("--trigger")}>
						{select.selectedItems[0]?.icon || icon}
						<ArkSelect.ValueText
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
						<SelectContent tid={tid} maxHeight={maxDropdownHeight} classes={classes} />
					</Portal>
				)}
				{!portal && <SelectContent tid={tid} maxHeight={maxDropdownHeight} classes={classes} />}
				<ArkSelect.HiddenSelect data-testid={tid("--input")} />
			</ArkSelect.RootProvider>
		</Field>
	);
}
