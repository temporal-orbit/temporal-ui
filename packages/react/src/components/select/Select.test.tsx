import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { createListCollection, Select, type SelectItem } from ".";

const collection = createListCollection<SelectItem<unknown>>({
	items: [
		{ value: "a", label: "Alpha" },
		{ value: "b", label: "Beta" },
	],
});

describe("Select", () => {
	it("merges classes.control with className on the control element", () => {
		render(
			<Select
				testId="sel"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				className="from-prop"
				classes={{ control: "from-classes" }}
			/>,
		);
		const control = screen.getByTestId("sel--control");
		expect(control).toHaveClass("from-prop");
		expect(control).toHaveClass("from-classes");
	});

	it("applies trigger and valueText class slots", () => {
		render(
			<Select
				testId="sel2"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				classes={{ trigger: "slot-trigger", valueText: "slot-value" }}
			/>,
		);
		expect(screen.getByTestId("sel2--trigger")).toHaveClass("slot-trigger");
		expect(screen.getByTestId("sel2--value-text")).toHaveClass("slot-value");
	});

	it("sets data-align-item-with-trigger when alignItemWithTrigger is enabled", () => {
		render(
			<Select
				testId="sel3"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				alignItemWithTrigger
			/>,
		);
		expect(screen.getByTestId("sel3--root")).toHaveAttribute("data-align-item-with-trigger");
	});

	it("reopens after closing when alignItemWithTrigger is enabled", async () => {
		const user = userEvent.setup();
		render(
			<Select
				testId="sel4"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				alignItemWithTrigger
				defaultValue={["a"]}
			/>,
		);

		await user.click(screen.getByTestId("sel4--trigger"));
		expect(screen.getByTestId("sel4--trigger")).toHaveAttribute("aria-expanded", "true");
		expect(await screen.findByTestId("sel4--content")).toBeVisible();

		await user.keyboard("{Escape}");
		await waitFor(() => {
			expect(screen.getByTestId("sel4--trigger")).toHaveAttribute("aria-expanded", "false");
		});

		await user.click(screen.getByTestId("sel4--trigger"));
		await waitFor(() => {
			expect(screen.getByTestId("sel4--trigger")).toHaveAttribute("aria-expanded", "true");
		});
		expect(await screen.findByTestId("sel4--content")).toBeVisible();
	});

	it("shows dropdown when alignItemWithTrigger is enabled with no selection", async () => {
		const user = userEvent.setup();
		render(
			<Select
				testId="sel5"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				alignItemWithTrigger
			/>,
		);

		await user.click(screen.getByTestId("sel5--trigger"));

		expect(await screen.findByTestId("sel5--content")).toBeVisible();
		await waitFor(() => {
			expect(screen.getByTestId("sel5--positioner")).not.toHaveAttribute(
				"data-align-item-with-trigger-pending",
			);
		});
	});

	it("skips alignment when opened via touch", async () => {
		render(
			<Select
				testId="sel6"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				alignItemWithTrigger
				defaultValue={["a"]}
			/>,
		);

		const trigger = screen.getByTestId("sel6--trigger");
		fireEvent.pointerDown(trigger, { pointerType: "touch" });
		fireEvent.click(trigger);

		expect(await screen.findByTestId("sel6--content")).toBeVisible();
		expect(screen.getByTestId("sel6--positioner")).not.toHaveAttribute(
			"data-align-item-with-trigger",
		);
	});

	it("preserves custom ids when alignItemWithTrigger is disabled", () => {
		render(
			<Select
				testId="sel7"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				ids={{ trigger: "custom-trigger", content: "custom-content" }}
			/>,
		);

		expect(screen.getByTestId("sel7--trigger")).toHaveAttribute("id", "custom-trigger");
		expect(screen.getByTestId("sel7--content")).toHaveAttribute("id", "custom-content");
	});
});
