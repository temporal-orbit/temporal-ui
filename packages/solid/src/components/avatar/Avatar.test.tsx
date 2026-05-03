import { render, screen, waitFor } from "@solidjs/testing-library";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("transitions to loaded when the image is already complete on first paint", async () => {
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
			render(() => <Avatar testId="avatar-sync" src="https://example.com/avatar.png" />);
			const img = await waitFor(() => screen.getByTestId("avatar-sync--image"));
			await waitFor(() => expect(img).toHaveAttribute("data-state", "visible"));
			expect(img).not.toHaveAttribute("hidden");
		} finally {
			if (completeDesc) Object.defineProperty(HTMLImageElement.prototype, "complete", completeDesc);
			if (naturalWidthDesc) Object.defineProperty(HTMLImageElement.prototype, "naturalWidth", naturalWidthDesc);
			if (naturalHeightDesc) Object.defineProperty(HTMLImageElement.prototype, "naturalHeight", naturalHeightDesc);
		}
	});
});
