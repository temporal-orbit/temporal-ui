import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { createListCollection, Select, type SelectItem } from ".";

const collection = createListCollection<SelectItem<unknown>>({
	items: [
		{ value: "a", label: "Alpha" },
		{ value: "b", label: "Beta" },
		{ value: "c", label: "Charlie" },
		{ value: "d", label: "Delta" },
		{ value: "e", label: "Echo" },
		{ value: "f", label: "Foxtrot" },
		{ value: "g", label: "Golf" },
		{ value: "h", label: "Hotel" },
		{ value: "i", label: "India" },
		{ value: "j", label: "Juliet" },
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

	it("renders scroll carets when the open menu is constrained", async () => {
		const user = userEvent.setup();
		render(
			<div style={{ paddingTop: 8 }}>
				<Select
					testId="sel3"
					label="Pick"
					collection={collection}
					placeholder="Choose"
					portal={false}
					defaultValue={["j"]}
					maxDropdownHeight={120}
					defaultOpen
				/>
			</div>,
		);

		expect(screen.getByTestId("sel3--content")).toBeInTheDocument();
		expect(screen.getByTestId("sel3--scroll-caret-up")).toBeInTheDocument();
		expect(screen.getByTestId("sel3--scroll-caret-down")).toBeInTheDocument();

		// Close to ensure interactions still work
		await user.keyboard("{Escape}");
	});
});
