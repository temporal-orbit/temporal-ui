import {
	alignSelectDropdown,
	getSelectedSelectItem,
	getSelectTriggerForContent,
	SELECT_LINEAR_POSITIONING,
} from "./align-select";

export interface SelectPositioningUpdateDetails {
	updatePosition: () => Promise<void>;
	floatingElement: HTMLElement | null;
}

/**
 * Minimal positioning shape compatible with Ark/Zag `PositioningOptions`.
 * Kept loose so core stays free of `@zag-js/*` dependencies.
 */
export type SelectPositioningOptions = {
	placement?: "bottom-start" | "bottom" | "bottom-end" | "top-start" | "top" | "top-end" | (string & {});
	gutter?: number;
	overlap?: boolean;
	flip?: boolean | string[];
	slide?: boolean;
	fitViewport?: boolean;
	sameWidth?: boolean;
	overflowPadding?: number;
	updatePosition?: (details: SelectPositioningUpdateDetails) => void | Promise<void>;
};

export interface CreateLinearSelectPositioningOptions<T extends SelectPositioningOptions = SelectPositioningOptions> {
	maxHeight?: number;
	positioning?: T;
}

/**
 * Builds Ark/Zag positioning options that overlay the menu on the trigger and
 * align the selected item (Linear-style), while chaining any user `updatePosition`.
 */
export function createLinearSelectPositioning<T extends SelectPositioningOptions = SelectPositioningOptions>(
	options: CreateLinearSelectPositioningOptions<T> = {},
): T {
	const userPositioning = options.positioning;

	return {
		...SELECT_LINEAR_POSITIONING,
		...userPositioning,
		updatePosition: async (details: SelectPositioningUpdateDetails) => {
			if (userPositioning?.updatePosition) {
				await userPositioning.updatePosition(details);
			} else {
				await details.updatePosition();
			}

			const positioner = details.floatingElement;
			if (!positioner) return;

			const content = positioner.querySelector<HTMLElement>('[data-part="content"]');
			if (!content || content.hidden) return;

			const trigger = getSelectTriggerForContent(content);
			if (!trigger) return;

			alignSelectDropdown({
				positioner,
				content,
				trigger,
				selectedItem: getSelectedSelectItem(content),
				overflowPadding:
					userPositioning?.overflowPadding ?? SELECT_LINEAR_POSITIONING.overflowPadding,
				maxHeight: options.maxHeight,
			});
		},
	} as T;
}
