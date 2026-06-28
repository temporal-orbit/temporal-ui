import type { FieldProps } from "../field";

export type SwitchSize = "sm" | "md" | "lg";

export type SwitchClasses = Pick<
	NonNullable<FieldProps<unknown>["classes"]>,
	"root" | "label" | "hint" | "error" | "input"
> & {
	control?: string;
	thumb?: string;
};

export interface SwitchProps<T> extends Omit<FieldProps<T>, "classes"> {
	size?: SwitchSize;
	defaultChecked?: boolean;
	checked?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	classes?: SwitchClasses;
}
