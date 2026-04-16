import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Tooltip } from "./Tooltip";

describe("Tooltip Component", () => {
	const defaultProps = {
		trigger: <button type="button">Hover me</button>,
		children: "Tooltip content",
	};

	beforeEach(() => {
		cleanup();
	});

	it("renders trigger correctly", () => {
		render(<Tooltip {...defaultProps} />);
		expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument();
	});

	it("shows tooltip on hover", async () => {
		const user = userEvent.setup();
		render(<Tooltip {...defaultProps} />);

		const trigger = screen.getByRole("button", { name: "Hover me" });
		await user.hover(trigger);

		await waitFor(
			() => {
				expect(screen.getByText("Tooltip content")).toBeVisible();
			},
			{ timeout: 1000 },
		);
	});

	it("renders with portal by default", async () => {
		const user = userEvent.setup();
		render(<Tooltip {...defaultProps} />);

		const trigger = screen.getByRole("button", { name: "Hover me" });
		await user.hover(trigger);

		await waitFor(
			() => {
				expect(screen.getByText("Tooltip content")).toBeVisible();
			},
			{ timeout: 1000 },
		);
	});

	it("renders without portal when portal=false", async () => {
		const user = userEvent.setup();
		render(<Tooltip {...defaultProps} portal={false} />);

		const trigger = screen.getByRole("button", { name: "Hover me" });
		await user.hover(trigger);

		await waitFor(
			() => {
				expect(screen.getByText("Tooltip content")).toBeVisible();
			},
			{ timeout: 1000 },
		);
	});

	it("respects defaultOpen prop", () => {
		render(<Tooltip {...defaultProps} defaultOpen />);
		expect(screen.getByText("Tooltip content")).toBeVisible();
	});

	it("respects controlled open prop", async () => {
		const { rerender } = render(<Tooltip {...defaultProps} open={false} />);

		await waitFor(() => {
			expect(screen.queryByText("Tooltip content")).not.toBeInTheDocument();
		});

		rerender(<Tooltip {...defaultProps} open={true} />);
		await waitFor(() => {
			expect(screen.getByText("Tooltip content")).toBeVisible();
		});
	});

	it("calls onOpenChange when tooltip state changes", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();
		render(<Tooltip {...defaultProps} onOpenChange={onOpenChange} />);

		const trigger = screen.getByRole("button", { name: "Hover me" });
		await user.hover(trigger);

		await waitFor(
			() => {
				expect(onOpenChange).toHaveBeenCalledWith(true);
			},
			{ timeout: 1000 },
		);
	});

	it("applies custom classes to trigger", () => {
		render(<Tooltip {...defaultProps} classes={{ trigger: "custom-trigger-class" }} />);
		const trigger = screen.getByRole("button", { name: "Hover me" });
		expect(trigger).toHaveClass("custom-trigger-class");
	});

	it("renders with testId for selectors", () => {
		render(<Tooltip {...defaultProps} testId="tooltip-test" defaultOpen />);
		// Root may not render a DOM element; verify trigger and content have testIds
		expect(screen.getByTestId("tooltip-test--trigger")).toBeInTheDocument();
		expect(screen.getByTestId("tooltip-test--content")).toBeInTheDocument();
		expect(screen.getByTestId("tooltip-test--positioner")).toBeInTheDocument();
	});

	it("handles positioning prop", () => {
		const position = { placement: "bottom-start" as const };
		render(<Tooltip {...defaultProps} position={position} defaultOpen />);
		expect(screen.getByText("Tooltip content")).toBeVisible();
	});

	it("renders children content correctly", () => {
		const complexContent = (
			<div>
				<span>Header</span>
				<p>Paragraph content</p>
			</div>
		);

		render(
			<Tooltip {...defaultProps} defaultOpen>
				{complexContent}
			</Tooltip>,
		);

		expect(screen.getByText("Header")).toBeInTheDocument();
		expect(screen.getByText("Paragraph content")).toBeInTheDocument();
	});

	it("renders arrow when showArrow is true", () => {
		render(<Tooltip {...defaultProps} showArrow testId="tooltip-arrow" defaultOpen />);
		expect(screen.getByTestId("tooltip-arrow--arrow")).toBeInTheDocument();
	});
});
