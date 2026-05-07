// noinspection JSUnusedGlobalSymbols

import type { BaseComponent } from "../base";
import type { AvatarColorProp } from "../../utils/avatar-variant";

export type { AvatarColorProp } from "../../utils/avatar-variant";

export interface AvatarProps extends BaseComponent<never> {
	/** The size of the avatar */
	size?: "sm" | "md" | "lg";
	/**
	 * Display name used for initials when no image is shown. When `color` is `"auto"` (default),
	 * a stable accent palette is chosen from this string; whitespace-only or missing values use
	 * the neutral fallback (`data-color="none"`).
	 */
	name?: string;
	/** The URL of the avatar */
	src?: string;
	/**
	 * Accent palette for the initials/icon fallback. `"auto"` derives a stable variant from `name`.
	 * `"none"` keeps the neutral muted fallback. Ignored for background once a photo loads successfully.
	 * @default 'auto'
	 */
	color?: AvatarColorProp;
}
