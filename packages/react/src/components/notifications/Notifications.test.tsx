import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Notifications, showNotification } from "./Notifications";

describe("Notifications", () => {
	beforeEach(() => {
		cleanup();
	});

	it("renders the toaster region with default placement", () => {
		render(<Notifications />);

		const region = screen.getByRole("region", { name: /Notifications/i });
		expect(region).toBeInTheDocument();
		expect(region).toHaveAttribute("data-placement", "bottom-end");
	});

	it("respects placement and gap props", () => {
		render(<Notifications placement="top-start" gap={10} />);

		const region = screen.getByRole("region", { name: /Notifications/i });
		expect(region).toHaveAttribute("data-placement", "top-start");
		expect(region).toHaveAttribute("style", expect.stringContaining("--gap: 10px"));
	});

	it("showNotification returns a handle and does not throw", () => {
		render(<Notifications />);

		const result = showNotification({
			title: "Title",
			message: "Message",
			type: "info",
			duration: 500,
		});

		expect(result).toBeTruthy();
	});

	it("renders an action trigger and calls its handler when clicked", async () => {
		const user = userEvent.setup();
		render(<Notifications />);

		const onAction = vi.fn();

		await act(async () => {
			showNotification({
				title: "With Action",
				message: "This notification has an action.",
				type: "info",
				duration: Infinity,
				action: {
					label: "Action",
					onClick: onAction,
				},
			});
		});

		await waitFor(async () => {
			const actionBtn = screen.getByRole("button", { name: "Action" });
			expect(actionBtn).toBeVisible();

			await user.click(actionBtn);
			expect(onAction).toHaveBeenCalledTimes(1);
		});
	});
});
