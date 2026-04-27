import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

describe("ToggleGroup", () => {
	it("should render all items", () => {
		render(
			<ToggleGroup>
				<ToggleGroupItem value="bold">B</ToggleGroupItem>
				<ToggleGroupItem value="italic">I</ToggleGroupItem>
				<ToggleGroupItem value="underline">U</ToggleGroupItem>
			</ToggleGroup>,
		);
		expect(screen.getByRole("radio", { name: "B" })).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: "I" })).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: "U" })).toBeInTheDocument();
	});

	it("should be disabled when disabled prop is true", () => {
		render(
			<ToggleGroup disabled>
				<ToggleGroupItem value="bold">B</ToggleGroupItem>
				<ToggleGroupItem value="italic">I</ToggleGroupItem>
				<ToggleGroupItem value="underline">U</ToggleGroupItem>
			</ToggleGroup>,
		);
		expect(screen.getByRole("radio", { name: "B" })).toBeDisabled();
		expect(screen.getByRole("radio", { name: "I" })).toBeDisabled();
		expect(screen.getByRole("radio", { name: "U" })).toBeDisabled();
	});

	it("should show selected state for controlled value", () => {
		render(
			<ToggleGroup value={["bold"]}>
				<ToggleGroupItem value="bold">B</ToggleGroupItem>
				<ToggleGroupItem value="italic">I</ToggleGroupItem>
				<ToggleGroupItem value="underline">U</ToggleGroupItem>
			</ToggleGroup>,
		);
		expect(screen.getByRole("radio", { name: "B" })).toHaveAttribute("data-state", "on");
		expect(screen.getByRole("radio", { name: "I" })).toHaveAttribute("data-state", "off");
	});

	it("should disable individual items", () => {
		render(
			<ToggleGroup>
				<ToggleGroupItem value="bold">B</ToggleGroupItem>
				<ToggleGroupItem value="italic" disabled>
					I
				</ToggleGroupItem>
				<ToggleGroupItem value="underline">U</ToggleGroupItem>
			</ToggleGroup>,
		);
		expect(screen.getByRole("radio", { name: "B" })).not.toBeDisabled();
		expect(screen.getByRole("radio", { name: "I" })).toBeDisabled();
		expect(screen.getByRole("radio", { name: "U" })).not.toBeDisabled();
	});

	it("wraps in Field and marks items invalid when error is set", () => {
		render(
			<ToggleGroup testId="fmt" label="Formatting" hint="Pick one or more" error="Required">
				<ToggleGroupItem value="bold">B</ToggleGroupItem>
				<ToggleGroupItem value="italic">I</ToggleGroupItem>
			</ToggleGroup>,
		);
		expect(screen.getByText("Formatting")).toBeInTheDocument();
		expect(screen.getByText("Pick one or more")).toBeInTheDocument();
		expect(screen.getByText("Required")).toBeInTheDocument();
		expect(screen.getByTestId("fmt-field--root")).toBeInTheDocument();
		expect(screen.getByTestId("fmt--root")).toBeInTheDocument();
		expect(screen.getByRole("radio", { name: "B" })).toHaveAttribute("aria-invalid", "true");
		expect(screen.getByRole("radio", { name: "I" })).toHaveAttribute("aria-invalid", "true");
	});
});
