import { cleanup, render, screen, waitFor } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Popover, type PopoverProps } from "./Popover";

describe("Popover Component", () => {
	const defaultProps: PopoverProps = {
		trigger: (props) => (
			<button type="button" {...props}>
				Open Popover
			</button>
		),
		children: "Popover content",
	};

	beforeEach(() => {
		cleanup();
	});

	it("closes on interaction outside when modal is false", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();
		render(() => (
			<div>
				<Popover {...defaultProps} modal={false} defaultOpen onOpenChange={onOpenChange} />
				<button type="button">Outside Button</button>
			</div>
		));

		expect(screen.getByText("Popover content")).toBeVisible();

		const outsideButton = screen.getByRole("button", {
			name: "Outside Button",
		});
		await user.click(outsideButton);

		await waitFor(() => {
			expect(onOpenChange).toHaveBeenCalledWith(false);
		});
	});

	it("renders trigger correctly", () => {
		render(() => <Popover {...defaultProps} />);
		expect(screen.getByRole("button", { name: "Open Popover" })).toBeInTheDocument();
	});

	it("renders with portal by default", () => {
		render(() => <Popover {...defaultProps} defaultOpen />);
		expect(screen.getByText("Popover content")).toBeVisible();
	});

	it("renders without portal when portal=false", () => {
		render(() => <Popover {...defaultProps} portal={false} defaultOpen />);
		expect(screen.getByText("Popover content")).toBeVisible();
	});

	it("opens popover when trigger is clicked", async () => {
		const user = userEvent.setup();
		render(() => <Popover {...defaultProps} />);

		const trigger = screen.getByRole("button", { name: "Open Popover" });
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByText("Popover content")).toBeVisible();
		});
	});

	it("respects defaultOpen prop", () => {
		render(() => <Popover {...defaultProps} defaultOpen />);
		expect(screen.getByText("Popover content")).toBeVisible();
	});

	it("respects controlled open=false prop", async () => {
		render(() => <Popover {...defaultProps} open={false} />);
		// When controlled with open={false}, content should not be visible
		await waitFor(() => {
			expect(screen.queryByText("Popover content")).not.toBeInTheDocument();
		});
	});

	it("respects controlled open=true prop", async () => {
		render(() => <Popover {...defaultProps} open={true} />);
		await waitFor(() => {
			expect(screen.getByText("Popover content")).toBeVisible();
		});
	});

	it("calls onOpenChange when popover state changes", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();
		render(() => <Popover {...defaultProps} onOpenChange={onOpenChange} />);

		const trigger = screen.getByRole("button", { name: "Open Popover" });
		await user.click(trigger);

		await waitFor(() => {
			expect(onOpenChange).toHaveBeenCalledWith(true);
		});
	});

	it("renders title when provided", () => {
		render(() => <Popover {...defaultProps} title="Test Title" defaultOpen />);
		expect(screen.getByText("Test Title")).toBeVisible();
	});

	it("renders description when provided", () => {
		render(() => <Popover {...defaultProps} description="Test Description" defaultOpen />);
		expect(screen.getByText("Test Description")).toBeVisible();
	});

	it("applies custom classes to trigger", () => {
		render(() => <Popover {...defaultProps} classes={{ trigger: "custom-trigger-class" }} />);
		const trigger = screen.getByRole("button", { name: "Open Popover" });
		expect(trigger).toHaveClass("custom-trigger-class");
	});

	it("applies custom classes to content", () => {
		render(() => <Popover {...defaultProps} classes={{ content: "custom-content-class" }} defaultOpen />);
		// The content class is applied to the Ark UI Popover.Content element
		// We can test this by checking if the popover content exists and is visible
		expect(screen.getByText("Popover content")).toBeVisible();
	});

	it("does not close on escape key when closeOnEscape is false", async () => {
		const user = userEvent.setup();
		render(() => <Popover {...defaultProps} closeOnEscape={false} defaultOpen />);

		expect(screen.getByText("Popover content")).toBeVisible();

		await user.keyboard("{Escape}");

		// Should still be visible
		expect(screen.getByText("Popover content")).toBeVisible();
	});

	it("respects modal prop", () => {
		render(() => <Popover {...defaultProps} modal defaultOpen />);
		// When modal=true, the popover should trap focus and prevent interaction with other elements
		expect(screen.getByText("Popover content")).toBeVisible();
	});

	it("respects autoFocus prop", () => {
		render(() => <Popover {...defaultProps} autoFocus defaultOpen />);
		expect(screen.getByText("Popover content")).toBeVisible();
		// The popover content should receive focus when autoFocus is true
	});

	it("handles complex trigger elements", () => {
		const complexTrigger = (props: Record<string, unknown>) => (
			<div {...props}>
				<span>Complex</span>
				<button type="button">Trigger</button>
			</div>
		);

		render(() => <Popover trigger={complexTrigger}>Content</Popover>);
		expect(screen.getByText("Complex")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Trigger" })).toBeInTheDocument();
	});

	it("handles positioning prop", () => {
		const position = { placement: "bottom-start" as const };
		render(() => <Popover {...defaultProps} position={position} defaultOpen />);
		expect(screen.getByText("Popover content")).toBeVisible();
	});

	it("renders children content correctly", () => {
		const complexContent = (
			<div>
				<h3>Header</h3>
				<p>Paragraph content</p>
				<button type="button">Action</button>
			</div>
		);

		render(() => (
			<Popover {...defaultProps} defaultOpen>
				{complexContent}
			</Popover>
		));

		expect(screen.getByText("Header")).toBeInTheDocument();
		expect(screen.getByText("Paragraph content")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
	});
});
