import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Switch } from "./Switch";

describe("Switch", () => {
	it("should render", () => {
		render(() => <Switch label="Enable notifications" />);
		expect(screen.getByLabelText("Enable notifications")).toBeInTheDocument();
	});

	it('should be disabled when "disabled" prop is true', () => {
		render(() => <Switch label="Enable notifications" disabled />);
		expect(screen.getByLabelText("Enable notifications")).toBeDisabled();
	});

	it('should be checked when "checked" prop is true', () => {
		render(() => <Switch label="Enable notifications" checked />);
		expect(screen.getByLabelText("Enable notifications")).toBeChecked();
	});

	it("wraps in Field and shows hint and error", () => {
		render(() => (
			<Switch
				testId="my-switch"
				label="Enable notifications"
				hint="Receive email updates"
				error="This field is required"
			/>
		));
		expect(screen.getByText("Receive email updates")).toBeInTheDocument();
		expect(screen.getByText("This field is required")).toBeInTheDocument();
		expect(screen.getByTestId("my-switch-field--root")).toBeInTheDocument();
		expect(screen.getByLabelText("Enable notifications")).toHaveAttribute("aria-invalid", "true");
	});

	it("defaults data-size to md", () => {
		render(() => <Switch testId="my-switch" label="Enable notifications" />);
		expect(screen.getByTestId("my-switch--root")).toHaveAttribute("data-size", "md");
	});

	it("sets data-size from size prop", () => {
		render(() => <Switch testId="my-switch" label="Enable notifications" size="sm" />);
		expect(screen.getByTestId("my-switch--root")).toHaveAttribute("data-size", "sm");
	});
});
