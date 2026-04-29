// noinspection JSUnusedGlobalSymbols

import type { FieldProps } from "../field";

export interface ProgressLinearProps<T> extends FieldProps<T> {
	/** When true, shows formatted progress text from Ark (respects `formatOptions` on the root). */
	showValueText?: boolean;
}
