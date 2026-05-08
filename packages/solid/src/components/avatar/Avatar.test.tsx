import { render, screen, waitFor } from "@solidjs/testing-library";
import { AVATAR_COLOR_VARIANTS } from "@temporal-ui/core/avatar";
import { For } from "solid-js";
import { describe, expect, it } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	it("sets Ark data-scope and data-part on root and data-size from size prop", () => {
		render(() => <Avatar name="A" size="sm" testId="av" />);
		const root = screen.getByTestId("av");
		expect(root).toHaveAttribute("data-scope", "avatar");
		expect(root).toHaveAttribute("data-part", "root");
		expect(root).toHaveAttribute("data-size", "sm");
	});

	it("defaults data-size to md", () => {
		render(() => <Avatar name="B" testId="av" />);
		expect(screen.getByTestId("av")).toHaveAttribute("data-size", "md");
	});

	it.each(AVATAR_COLOR_VARIANTS)("sets data-color=%s on root for explicit color", (variant) => {
		render(() => <Avatar name="Test" color={variant} testId="av" />);
		expect(screen.getByTestId("av")).toHaveAttribute("data-color", variant);
	});

	it('sets data-color="none" for color="none"', () => {
		render(() => <Avatar name="N" color="none" testId="av" />);
		expect(screen.getByTestId("av")).toHaveAttribute("data-color", "none");
	});

	it('sets data-color="none" when name is empty and color is auto', () => {
		render(() => <Avatar name="" color="auto" testId="av" />);
		expect(screen.getByTestId("av")).toHaveAttribute("data-color", "none");
	});

	it("explicit color overrides hash", () => {
		render(() => <Avatar name="Alice" color="orange" testId="av" />);
		expect(screen.getByTestId("av")).toHaveAttribute("data-color", "orange");
	});

	it("hides fallback when image is already decoded", async () => {
		const completeDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "complete");
		const naturalWidthDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "naturalWidth");
		const naturalHeightDesc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, "naturalHeight");

		Object.defineProperty(HTMLImageElement.prototype, "complete", {
			configurable: true,
			get() {
				return true;
			},
		});
		Object.defineProperty(HTMLImageElement.prototype, "naturalWidth", {
			configurable: true,
			get() {
				return 1;
			},
		});
		Object.defineProperty(HTMLImageElement.prototype, "naturalHeight", {
			configurable: true,
			get() {
				return 1;
			},
		});

		try {
			render(() => <Avatar src="https://example.com/a.png" name="Jane" color="pink" testId="av" />);
			await waitFor(() => {
				expect(screen.getByTestId("av--fallback")).toHaveAttribute("hidden");
			});
		} finally {
			if (completeDesc) Object.defineProperty(HTMLImageElement.prototype, "complete", completeDesc);
			if (naturalWidthDesc) Object.defineProperty(HTMLImageElement.prototype, "naturalWidth", naturalWidthDesc);
			if (naturalHeightDesc) Object.defineProperty(HTMLImageElement.prototype, "naturalHeight", naturalHeightDesc);
		}
	});

	it("snapshot of resolved data-color values for explicit variants", () => {
		render(() => (
			<div data-testid="avatar-table">
				<For each={AVATAR_COLOR_VARIANTS}>
					{(variant) => <Avatar name="Pat" color={variant} testId={`root-${variant}`} />}
				</For>
			</div>
		));
		const attrs = [...AVATAR_COLOR_VARIANTS].map((v) => screen.getByTestId(`root-${v}`).getAttribute("data-color"));
		expect(attrs).toMatchInlineSnapshot(`
			[
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
			]
		`);
	});
});
