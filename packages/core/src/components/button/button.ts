// noinspection JSUnusedGlobalSymbols

import type { BaseComponent } from "../base";

export interface ButtonProps<T> extends BaseComponent<T> {
	/** The visual variant of the button. */
	variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
	/** Whether the button should be disabled. */
	disabled?: boolean;
	/** Whether the button is loading. */
	loading?: boolean;
	/** The size of the button. */
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	/** Whether the button renders icon only. */
	icon?: boolean;
	/** Tooltip content shown when the button is disabled or loading. */
	disabledTooltip?: T;
}
