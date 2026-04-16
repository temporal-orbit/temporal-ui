import { render, screen } from "@testing-library/react";
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
		render(<RadioGroup label="Select options" items={items} />);
		expect(screen.getByText("Select options")).toBeInTheDocument();
		items.forEach((item) => {
			expect(screen.getByLabelText(item.label)).toBeInTheDocument();
		});
	});
});
