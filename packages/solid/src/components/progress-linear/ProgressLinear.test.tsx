import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { ProgressLinear } from "./ProgressLinear";

describe("ProgressLinear", () => {
	it("renders a progressbar with label from Field", () => {
		render(() => <ProgressLinear label="Loading" value={40} max={100} testId="progress" />);
		expect(screen.getByText("Loading")).toBeInTheDocument();
		const bar = screen.getByRole("progressbar");
		expect(bar).toBeInTheDocument();
		expect(bar).toHaveAttribute("aria-valuenow", "40");
		expect(screen.getByTestId("progress--root")).toBeInTheDocument();
	});

	it("shows value text when showValueText is true", () => {
		render(() => <ProgressLinear label="Done" value={50} max={100} showValueText testId="p" />);
		expect(screen.getByTestId("p--value-text")).toBeInTheDocument();
	});

	it("renders indeterminate progress when value is null", () => {
		render(() => <ProgressLinear label="Wait" value={null} testId="ind" />);
		const bar = screen.getByRole("progressbar");
		expect(bar).not.toHaveAttribute("aria-valuenow");
	});
});
