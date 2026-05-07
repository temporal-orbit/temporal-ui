/** Ordered list of palette names; index order must stay stable for hashing. */
export const AVATAR_COLOR_VARIANTS = [
	"red",
	"orange",
	"amber",
	"yellow",
	"lime",
	"green",
	"teal",
	"cyan",
	"blue",
	"violet",
	"purple",
	"pink",
] as const;

export type AvatarNamedColorVariant = (typeof AVATAR_COLOR_VARIANTS)[number];

export type AvatarColorProp = AvatarNamedColorVariant | "auto" | "none";

/**
 * Pure, deterministic hash mapping a non-empty string to `[0, variantCount)`.
 * SSR-safe: same input always yields the same output (unsigned 32-bit FNV-style loop).
 */
export function getAvatarVariant(name: string, variantCount: number): number {
	let hash = 0;
	for (const char of name) {
		hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
	}
	return hash % variantCount;
}

/** Resolved `data-color` value for the avatar root (`none` or a named variant). */
export type AvatarResolvedDataColor = AvatarNamedColorVariant | "none";

/**
 * Resolves which named palette applies for `data-color` on the avatar root.
 * - `color === 'none'` → `'none'`
 * - explicit named color → that variant
 * - `color === 'auto'` (default) → hash from trimmed `name`, or `'none'` if no usable name
 */
export function resolveAvatarDataColor(
	name: string | undefined,
	color: AvatarColorProp | undefined,
): AvatarResolvedDataColor {
	const mode = color ?? "auto";
	if (mode === "none") {
		return "none";
	}
	if (mode === "auto") {
		const trimmed = name?.trim() ?? "";
		if (!trimmed) {
			return "none";
		}
		const index = getAvatarVariant(trimmed, AVATAR_COLOR_VARIANTS.length);
		return AVATAR_COLOR_VARIANTS[index]!;
	}
	return mode;
}
