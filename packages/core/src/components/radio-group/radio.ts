import type { FieldProps } from "../field";

export type RadioGroupItem = {
	value: string;
	label: string;
	disabled?: boolean;
};

/** Class slots for Field layout plus Ark `RadioGroup` parts. */
export type RadioGroupClasses = Pick<NonNullable<FieldProps<unknown>["classes"]>, "root" | "label" | "hint" | "error"> & {
	/** `RadioGroup.Root` */
	group?: string;
	/** `RadioGroup.Indicator` */
	indicator?: string;
	/** `RadioGroup.Item` */
	item?: string;
	/** `RadioGroup.ItemControl` */
	itemControl?: string;
	/** `RadioGroup.ItemText` */
	itemText?: string;
	/** `RadioGroup.ItemHiddenInput` */
	itemInput?: string;
};

export interface RadioGroupProps<T> extends Omit<FieldProps<T>, "classes"> {
	items: RadioGroupItem[];
	classes?: RadioGroupClasses;
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string | null) => void;
	orientation?: "horizontal" | "vertical";
}
