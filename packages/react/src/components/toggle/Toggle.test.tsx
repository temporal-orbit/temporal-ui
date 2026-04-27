import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Toggle } from "./Toggle";

describe("Toggle", () => {
	it("should render", () => {
		render(<Toggle>Toggle me</Toggle>);
		expect(screen.getByRole("button", { name: "Toggle me" })).toBeInTheDocument();
	});

	it("should be disabled when disabled prop is true", () => {
		render(<Toggle disabled>Toggle me</Toggle>);
		expect(screen.getByRole("button", { name: "Toggle me" })).toBeDisabled();
	});

	it("should have pressed state when pressed prop is true", () => {
		render(<Toggle pressed>Toggle me</Toggle>);
		expect(screen.getByRole("button", { name: "Toggle me" })).toHaveAttribute("data-state", "on");
	});

	it("should have unpressed state when pressed prop is false", () => {
		render(<Toggle pressed={false}>Toggle me</Toggle>);
		expect(screen.getByRole("button", { name: "Toggle me" })).toHaveAttribute("data-state", "off");
	});

	it("wraps in Field and shows label, hint, and error", () => {
		render(
			<Toggle testId="my-toggle" label="Bold" hint="Applies bold formatting" error="Something went wrong">
				B
			</Toggle>,
		);
		expect(screen.getByText("Bold")).toBeInTheDocument();
		expect(screen.getByText("Applies bold formatting")).toBeInTheDocument();
		expect(screen.getByText("Something went wrong")).toBeInTheDocument();
		expect(screen.getByTestId("my-toggle-field--root")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "B" })).toHaveAttribute("aria-invalid", "true");
	});
});
