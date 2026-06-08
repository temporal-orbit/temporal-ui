import type { FieldProps } from "../field";

/** Class slots for Field layout plus optional control styling on `Toggle.Root`. */
export type ToggleClasses = Pick<
	NonNullable<FieldProps<unknown>["classes"]>,
	"root" | "label" | "hint" | "error"
> & {
	/** Applied to `Toggle.Root` (the button). */
	control?: string;
};

export interface ToggleProps<T> extends Omit<FieldProps<T>, "classes"> {
	classes?: ToggleClasses;
}

/** Class slots for Field layout plus optional `ToggleGroup.Root` styling. */
export type ToggleGroupClasses = Pick<
	NonNullable<FieldProps<unknown>["classes"]>,
	"root" | "label" | "hint" | "error"
> & {
	/** `ToggleGroup.Root` */
	group?: string;
};

export interface ToggleGroupProps<T> extends Omit<FieldProps<T>, "classes"> {
	classes?: ToggleGroupClasses;
	/** Presentation: separate outline toggles, or one bordered control with secondary selected segments. */
	variant?: "default" | "segmented";
}
