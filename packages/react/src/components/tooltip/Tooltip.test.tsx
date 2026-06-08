import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Tooltip } from "./Tooltip";
import { TooltipProvider } from "./TooltipProvider";

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

	it("respects defaultOpen prop", () => {
		render(<Tooltip {...defaultProps} defaultOpen />);
		expect(screen.getByText("Tooltip content")).toBeVisible();
	});

	it("respects controlled open prop", async () => {
		const { rerender } = render(<Tooltip {...defaultProps} open={false} />);

		await waitFor(() => {
			expect(screen.getByText("Tooltip content")).not.toBeVisible();
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

	it("renders with testId for selectors", () => {
		render(<Tooltip {...defaultProps} testId="tooltip-test" defaultOpen />);
		expect(screen.getByTestId("tooltip-test--trigger")).toBeInTheDocument();
		expect(screen.getByTestId("tooltip-test--content")).toBeInTheDocument();
		expect(screen.getByTestId("tooltip-test--positioner")).toBeInTheDocument();
	});

	it("handles positioning prop", () => {
		render(<Tooltip {...defaultProps} positioning={{ placement: "bottom-start" }} defaultOpen />);
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
});

describe("TooltipProvider", () => {
	const defaultProps = {
		trigger: <button type="button">Hover me</button>,
		children: "Tooltip content",
	};

	beforeEach(() => {
		cleanup();
	});

	it("applies openDelay from provider", async () => {
		const onOpenChange = vi.fn();
		render(
			<TooltipProvider openDelay={500}>
				<Tooltip {...defaultProps} onOpenChange={onOpenChange} />
			</TooltipProvider>,
		);

		const trigger = screen.getByRole("button", { name: "Hover me" });
		fireEvent.pointerEnter(trigger);
		expect(onOpenChange).not.toHaveBeenCalled();

		await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true), { timeout: 1000 });
	});

	it("lets instance props override provider config", async () => {
		const onOpenChange = vi.fn();
		render(
			<TooltipProvider openDelay={500}>
				<Tooltip {...defaultProps} openDelay={0} onOpenChange={onOpenChange} />
			</TooltipProvider>,
		);

		fireEvent.pointerEnter(screen.getByRole("button", { name: "Hover me" }));

		await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true), { timeout: 200 });
	});

	it("uses the innermost nested provider config", async () => {
		const onOpenChange = vi.fn();
		render(
			<TooltipProvider openDelay={500}>
				<TooltipProvider openDelay={100}>
					<Tooltip {...defaultProps} onOpenChange={onOpenChange} />
				</TooltipProvider>
			</TooltipProvider>,
		);

		fireEvent.pointerEnter(screen.getByRole("button", { name: "Hover me" }));

		await waitFor(() => expect(onOpenChange).toHaveBeenCalledWith(true), { timeout: 500 });
	});

	it("applies interactive from provider", () => {
		render(
			<TooltipProvider interactive>
				<Tooltip {...defaultProps} defaultOpen testId="provider-interactive" />
			</TooltipProvider>,
		);

		expect(screen.getByTestId("provider-interactive--content")).toBeInTheDocument();
	});
});
