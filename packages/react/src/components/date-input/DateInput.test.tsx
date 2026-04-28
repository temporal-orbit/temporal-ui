import { cleanup, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { DateInput } from "./DateInput";

describe("DateInput presets", () => {
	beforeEach(() => {
		cleanup();
	});

	it("renders presets toolbar with secondary preset buttons when defaultOpen", async () => {
		render(
			<DateInput
				label={"Date"}
				testId={"di"}
				selectionMode={"range"}
				defaultOpen
				presets={{ last7Days: "Last 7 days" }}
			/>,
		);

		const toolbar = await waitFor(() => screen.getByTestId("di--presets-toolbar"));
		expect(toolbar).toHaveAttribute("data-component", "date-input");
		expect(toolbar).toHaveAttribute("data-slot", "presets-toolbar");

		const btn = within(toolbar).getByText("Last 7 days").closest("button");
		expect(btn).toBeTruthy();
		expect(btn).toHaveTextContent("Last 7 days");
		expect(btn).toHaveAttribute("data-variant", "secondary");
		expect(btn).toHaveAttribute("data-slot", "preset");
		expect(btn).toHaveAttribute("data-component", "button");
	});

	it("applies presetButtonProps overrides", async () => {
		render(
			<DateInput
				label={"Date"}
				testId={"di"}
				selectionMode={"range"}
				defaultOpen
				presets={{ last7Days: "Last 7 days" }}
				presetButtonProps={{ variant: "primary", className: "preset-extra" }}
			/>,
		);

		const toolbar = await waitFor(() => screen.getByTestId("di--presets-toolbar"));
		const btn = within(toolbar).getByText("Last 7 days").closest("button");
		expect(btn).toBeTruthy();
		expect(btn).toHaveAttribute("data-variant", "primary");
		expect(btn).toHaveClass("preset-extra");
	});

	it("calls onValueChange with a range when a preset is clicked", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();

		render(
			<DateInput
				label={"Date"}
				testId={"di"}
				selectionMode={"range"}
				defaultOpen
				presets={{ last7Days: "Last 7 days" }}
				onValueChange={onValueChange}
			/>,
		);

		const toolbar = await waitFor(() => screen.getByTestId("di--presets-toolbar"));
		const btn = within(toolbar).getByText("Last 7 days").closest("button");
		expect(btn).not.toBeNull();
		await user.click(btn as HTMLButtonElement);

		await waitFor(() => {
			expect(onValueChange).toHaveBeenCalled();
		});

		const first = onValueChange.mock.calls[0];
		expect(first).toBeDefined();
		const arg = first![0] as string[];
		expect(Array.isArray(arg)).toBe(true);
		expect(arg.length).toBe(2);
		expect(typeof arg[0]).toBe("string");
		expect(typeof arg[1]).toBe("string");
	});
});
