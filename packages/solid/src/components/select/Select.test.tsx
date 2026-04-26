import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { createListCollection, Select, type SelectItem } from ".";

const collection = createListCollection<SelectItem<unknown>>({
	items: [
		{ value: "a", label: "Alpha" },
		{ value: "b", label: "Beta" },
	],
});

describe("Select", () => {
	it("merges classes.control with class prop on the control element", () => {
		render(() => (
			<Select
				testId="sel"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				class="from-prop"
				classes={{ control: "from-classes" }}
			/>
		));
		const control = screen.getByTestId("sel--control");
		expect(control).toHaveClass("from-prop");
		expect(control).toHaveClass("from-classes");
	});

	it("applies trigger and valueText class slots", () => {
		render(() => (
			<Select
				testId="sel2"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				classes={{ trigger: "slot-trigger", valueText: "slot-value" }}
			/>
		));
		expect(screen.getByTestId("sel2--trigger")).toHaveClass("slot-trigger");
		expect(screen.getByTestId("sel2--value-text")).toHaveClass("slot-value");
	});
});
