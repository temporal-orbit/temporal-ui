import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { RadioGroup, type RadioGroupItem } from "./RadioGroup";

const items: RadioGroupItem[] = [
	{
		value: "option1",
		label: "Option 1",
	},
	{
		value: "option2",
		label: "Option 2",
	},
	{
		value: "option3",
		label: "Option 3",
	},
	{
		value: "option4",
		label: "Option 4",
	},
];

describe("RadioGroup", () => {
	it("should render all items", () => {
		render(() => <RadioGroup label="Select options" items={items} />);
		expect(screen.getByText("Select options")).toBeInTheDocument();
		items.forEach((item) => {
			expect(screen.getByLabelText(item.label)).toBeInTheDocument();
		});
	});

	it("applies classes to Ark radio group parts", () => {
		render(() => (
			<RadioGroup
				testId="rg"
				label="Pick one"
				items={items.slice(0, 2)}
				classes={{
					group: "slot-group",
					indicator: "slot-indicator",
					item: "slot-item",
					itemControl: "slot-control",
					itemText: "slot-text",
					itemInput: "slot-input",
				}}
			/>
		));
		expect(screen.getByTestId("rg--group")).toHaveClass("slot-group");
		expect(screen.getByTestId("rg--item-option1")).toHaveClass("slot-item");
		expect(screen.getByTestId("rg--item-control-option1")).toHaveClass("slot-control");
		expect(screen.getByTestId("rg--item-text-option1")).toHaveClass("slot-text");
		expect(screen.getByTestId("rg--item-input-option1")).toHaveClass("slot-input");
	});
});
