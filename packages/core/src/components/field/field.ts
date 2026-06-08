// noinspection JSUnusedGlobalSymbols

import type { BaseComponent } from "../base";

export interface FieldBaseProps<T> extends BaseComponent<T> {
	/** The description of the field. */
	hint?: string;
	/** The error message to display. */
	error?: string;
	/** Whether the field is disabled. */
	disabled?: boolean;
	/** Custom CSS classes to apply */
	classes?: {
		root?: string;
		label?: string;
		hint?: string;
		error?: string;
		control?: string;
		indicator?: string;
		input?: string;
	};
}

export interface FieldProps<T> extends FieldBaseProps<T> {
	/** The label for the field. */
	label?: string;
	/** Whether the field is read-only. */
	readOnly?: boolean;
	/** Whether the field is required. */
	required?: boolean;
}

export interface FieldsetProps<T> extends FieldBaseProps<T> {
	legend?: string;
	variant?: "default";
}

export const fieldAttributes = [
	"label",
	"hint",
	"error",
	"required",
	"readOnly",
	"disabled",
	"classes",
	"testId",
] as const;
export const fieldsetAttributes = [
	"legend",
	"variant",
	"hint",
	"error",
	"disabled",
	"classes",
	"testId",
] as const;
