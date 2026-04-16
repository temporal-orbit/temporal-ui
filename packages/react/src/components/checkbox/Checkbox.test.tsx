import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
	it("should render", () => {
		render(<Checkbox label="Accept terms and conditions" />);
		expect(screen.getByLabelText("Accept terms and conditions")).toBeInTheDocument();
	});

	it('should be disabled when "disabled" prop is true', () => {
		render(<Checkbox label="Accept terms and conditions" disabled />);
		expect(screen.getByLabelText("Accept terms and conditions")).toBeDisabled();
	});

	it('should be checked when "checked" prop is true', () => {
		render(<Checkbox label="Accept terms and conditions" checked />);
		expect(screen.getByLabelText("Accept terms and conditions")).toBeChecked();
	});
});
