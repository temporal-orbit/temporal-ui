import { describe, expect, it } from "vitest";
import { AVATAR_COLOR_VARIANTS, getAvatarVariant, resolveAvatarDataColor } from "./index";

describe("getAvatarVariant", () => {
	it("is pure and deterministic for the same input", () => {
		const inputs = ["Ada Lovelace", "你好", "Émile", "x"];
		for (const s of inputs) {
			expect(getAvatarVariant(s, 12)).toBe(getAvatarVariant(s, 12));
			expect(getAvatarVariant(s, 12)).toBe(getAvatarVariant(s, 12));
		}
	});

	it("maps into [0, variantCount)", () => {
		for (let i = 0; i < 500; i++) {
			const v = getAvatarVariant(`user-${i}`, 12);
			expect(v).toBeGreaterThanOrEqual(0);
			expect(v).toBeLessThan(12);
		}
	});

	it("every variant index is reachable for some input string", () => {
		for (let target = 0; target < AVATAR_COLOR_VARIANTS.length; target++) {
			let found = false;
			for (let i = 0; i < 500_000 && !found; i++) {
				if (getAvatarVariant(`reach-${i}`, AVATAR_COLOR_VARIANTS.length) === target) {
					found = true;
				}
			}
			expect(found).toBe(true);
		}
	});
});

describe("resolveAvatarDataColor", () => {
	it('uses data-color "none" for color none and missing/empty name with auto', () => {
		expect(resolveAvatarDataColor(undefined, "none")).toBe("none");
		expect(resolveAvatarDataColor("", "auto")).toBe("none");
		expect(resolveAvatarDataColor("   ", "auto")).toBe("none");
		expect(resolveAvatarDataColor(undefined, "auto")).toBe("none");
	});

	it("uses explicit color without hashing", () => {
		expect(resolveAvatarDataColor(undefined, "purple")).toBe("purple");
		expect(resolveAvatarDataColor("Ignored Name", "cyan")).toBe("cyan");
	});

	it("auto derives from trimmed name", () => {
		const v = resolveAvatarDataColor("  Jane Doe  ", "auto");
		expect(AVATAR_COLOR_VARIANTS).toContain(v);
		expect(v).toBe(resolveAvatarDataColor("Jane Doe", "auto"));
	});
});
