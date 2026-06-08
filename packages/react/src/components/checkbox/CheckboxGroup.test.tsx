import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CheckboxGroup, type CheckboxGroupItem } from "./CheckboxGroup";

const items: CheckboxGroupItem[] = [
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

describe("CheckboxGroup", () => {
	it("should render all items", () => {
		render(<CheckboxGroup label="Select options" items={items} name="options" />);
		expect(screen.getByText("Select options")).toBeInTheDocument();
		items.forEach((item) => {
			expect(screen.getByLabelText(item.label)).toBeInTheDocument();
		});
	});

	it("should check items when checked prop is true", () => {
		render(
			<CheckboxGroup
				label="Select options"
				items={items}
				name="options"
				values={["option1", "option3"]}
			/>,
		);
		expect(screen.getByLabelText("Option 1")).toBeChecked();
		expect(screen.getByLabelText("Option 3")).toBeChecked();
		expect(screen.getByLabelText("Option 2")).not.toBeChecked();
		expect(screen.getByLabelText("Option 4")).not.toBeChecked();
	});
});
