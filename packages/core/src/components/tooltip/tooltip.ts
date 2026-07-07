import type { BaseComponent } from "../base";

export interface TooltipBaseProps<T> extends Pick<BaseComponent<T>, "children"> {
	/**
	 * Wrap the trigger in a hoverable/focusable element so tooltips work on disabled controls.
	 * When omitted, wrapping is enabled automatically when the trigger has `disabled` or
	 * `aria-disabled`.
	 */
	disabledTrigger?: boolean;
}

/** Keyboard-focusable tab index for the disabled-trigger wrapper. */
export const DISABLED_TOOLTIP_TRIGGER_TAB_INDEX = 0;

export function isDisabledControlProps(props: Record<string, unknown>): boolean {
	return props.disabled === true || props["aria-disabled"] === true;
}

export function shouldWrapDisabledTooltipTrigger(
	disabledTrigger: boolean | undefined,
	isTriggerDisabled: boolean,
): boolean {
	if (disabledTrigger === true) {
		return true;
	}
	if (disabledTrigger === false) {
		return false;
	}
	return isTriggerDisabled;
}
