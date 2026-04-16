import { cleanup, render, screen, waitFor } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { Dialog, type DialogProps } from "./Dialog";

describe("Dialog Component", () => {
	const defaultProps: DialogProps = {
		trigger: (props) => (
			<button type="button" {...props}>
				Open Dialog
			</button>
		),
		children: "Dialog content",
		title: "Dialog Title",
		description: "Dialog Description",
	};

	beforeEach(() => {
		cleanup();
	});

	it("renders trigger correctly", () => {
		render(() => <Dialog {...defaultProps} />);
		expect(screen.getByRole("button", { name: "Open Dialog" })).toBeInTheDocument();
	});

	it("opens dialog when trigger is clicked", async () => {
		const user = userEvent.setup();
		render(() => <Dialog {...defaultProps} />);

		const trigger = screen.getByRole("button", { name: "Open Dialog" });
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByText("Dialog content")).toBeVisible();
			expect(screen.getByText("Dialog Title")).toBeVisible();
			expect(screen.getByText("Dialog Description")).toBeVisible();
		});
	});

	it("respects defaultOpen prop", () => {
		render(() => <Dialog {...defaultProps} defaultOpen />);
		expect(screen.getByText("Dialog content")).toBeVisible();
	});

	it("respects controlled open=false prop", async () => {
		render(() => <Dialog {...defaultProps} open={false} />);
		await waitFor(() => {
			expect(screen.queryByText("Dialog content")).not.toBeInTheDocument();
		});
	});

	it("respects controlled open=true prop", async () => {
		render(() => <Dialog {...defaultProps} open={true} />);
		await waitFor(() => {
			expect(screen.getByText("Dialog content")).toBeVisible();
		});
	});

	it("calls onOpenChange when dialog state changes", async () => {
		const user = userEvent.setup();
		const onOpenChange = vi.fn();
		render(() => <Dialog {...defaultProps} onOpenChange={onOpenChange} />);

		const trigger = screen.getByRole("button", { name: "Open Dialog" });
		await user.click(trigger);

		await waitFor(() => {
			expect(onOpenChange).toHaveBeenCalledWith(true);
		});
	});

	it("closes dialog when close button is clicked (using testId)", async () => {
		const user = userEvent.setup();
		render(() => <Dialog {...defaultProps} defaultOpen testId="test-dialog" />);

		expect(screen.getByText("Dialog content")).toBeVisible();

		const closeButton = screen.getByTestId("test-dialog--close-trigger");
		await user.click(closeButton);

		await waitFor(() => {
			expect(screen.queryByText("Dialog content")).not.toBeInTheDocument();
		});
	});

	it("applies custom classes", () => {
		render(() => (
			<Dialog
				{...defaultProps}
				defaultOpen
				classes={{
					content: "custom-content",
					title: "custom-title",
					description: "custom-description",
					backdrop: "custom-backdrop",
				}}
				testId="test-dialog"
			/>
		));

		expect(screen.getByTestId("test-dialog--content")).toHaveClass("custom-content");
		expect(screen.getByTestId("test-dialog--title")).toHaveClass("custom-title");
		expect(screen.getByTestId("test-dialog--description")).toHaveClass("custom-description");
		expect(screen.getByTestId("test-dialog--backdrop")).toHaveClass("custom-backdrop");
	});

	it("applies root className to content", () => {
		render(() => <Dialog {...defaultProps} defaultOpen className="root-class" testId="test-dialog" />);
		expect(screen.getByTestId("test-dialog--content")).toHaveClass("root-class");
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
			<Dialog {...defaultProps} defaultOpen>
				{complexContent}
			</Dialog>
		));

		expect(screen.getByText("Header")).toBeInTheDocument();
		expect(screen.getByText("Paragraph content")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
	});

	it("renders title only when provided", () => {
		const { title: _title, ...propsWithoutTitle } = defaultProps;

		render(() => (
			<Dialog
				{...propsWithoutTitle}
				// Explicitly pass undefined to override if it was somehow there, but mostly to match intent
				title={undefined}
				defaultOpen
				testId="no-title"
			/>
		));
		expect(screen.queryByTestId("no-title--title")).not.toBeInTheDocument();
	});

	it("renders description only when provided", () => {
		const { description: _description, ...propsWithoutDesc } = defaultProps;

		render(() => <Dialog {...propsWithoutDesc} description={undefined} defaultOpen testId="no-desc" />);
		expect(screen.queryByTestId("no-desc--description")).not.toBeInTheDocument();
	});
});
