import { describe, expect, it } from "vitest";
import { isDisabledControlProps, shouldWrapDisabledTooltipTrigger } from "./tooltip";

describe("tooltip disabled-trigger helpers", () => {
	describe("isDisabledControlProps", () => {
		it("returns true when disabled is true", () => {
			expect(isDisabledControlProps({ disabled: true })).toBe(true);
		});

		it("returns true when aria-disabled is true", () => {
			expect(isDisabledControlProps({ "aria-disabled": true })).toBe(true);
		});

		it("returns false for enabled controls", () => {
			expect(isDisabledControlProps({ disabled: false })).toBe(false);
			expect(isDisabledControlProps({})).toBe(false);
		});
	});

	describe("shouldWrapDisabledTooltipTrigger", () => {
		it("wraps when disabledTrigger is true", () => {
			expect(shouldWrapDisabledTooltipTrigger(true, false)).toBe(true);
		});

		it("does not wrap when disabledTrigger is false", () => {
			expect(shouldWrapDisabledTooltipTrigger(false, true)).toBe(false);
		});

		it("auto-wraps when disabledTrigger is omitted and trigger is disabled", () => {
			expect(shouldWrapDisabledTooltipTrigger(undefined, true)).toBe(true);
		});

		it("does not auto-wrap when disabledTrigger is omitted and trigger is enabled", () => {
			expect(shouldWrapDisabledTooltipTrigger(undefined, false)).toBe(false);
		});
	});
});
