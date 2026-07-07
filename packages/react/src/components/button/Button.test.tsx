import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
	const defaultProps = {
		children: "Test Button",
	};

	it("renders correctly with default props", () => {
		render(<Button {...defaultProps} />);
		const buttonElement = screen.getByRole("button", { name: "Test Button" });
		expect(buttonElement).toBeInTheDocument();
		// Default variant: "primary", Default size: "md"
		expect(buttonElement).toHaveAttribute("data-component", "button");
		expect(buttonElement).toHaveAttribute("data-variant", "primary");
		expect(buttonElement).toHaveAttribute("data-size", "md");
		expect(buttonElement).not.toBeDisabled();
		expect(buttonElement).not.toHaveAttribute("data-loading");
	});

	it("applies variant attributes correctly", () => {
		const { rerender } = render(<Button {...defaultProps} variant="secondary" />);
		expect(screen.getByRole("button", { name: "Test Button" })).toHaveAttribute(
			"data-variant",
			"secondary",
		);

		rerender(<Button {...defaultProps} variant="destructive" />);
		expect(screen.getByRole("button", { name: "Test Button" })).toHaveAttribute(
			"data-variant",
			"destructive",
		);
	});

	it("applies size attributes correctly", () => {
		const { rerender } = render(<Button {...defaultProps} size="sm" />);
		expect(screen.getByRole("button", { name: "Test Button" })).toHaveAttribute("data-size", "sm");

		rerender(<Button {...defaultProps} size="lg" />);
		expect(screen.getByRole("button", { name: "Test Button" })).toHaveAttribute("data-size", "lg");

		rerender(<Button {...defaultProps} size="md" />);
		expect(screen.getByRole("button", { name: "Test Button" })).toHaveAttribute("data-size", "md");
	});

	it("renders as an icon button with correct attribute", () => {
		render(<Button {...defaultProps} icon />);
		const buttonElement = screen.getByRole("button", { name: "Test Button" });
		expect(buttonElement).toHaveAttribute("data-icon");
	});

	it("handles disabled state", () => {
		render(<Button {...defaultProps} disabled />);
		expect(screen.getByRole("button", { name: "Test Button" })).toBeDisabled();
	});

	it("is disabled if loading is true, even if disabled prop is false", () => {
		render(<Button {...defaultProps} loading disabled={false} />);
		expect(screen.getByRole("button", { name: "Test Button" })).toBeDisabled();
	});

	it("is disabled if disabled prop is true, even if loading is false", () => {
		render(<Button {...defaultProps} disabled loading={false} />);
		expect(screen.getByRole("button", { name: "Test Button" })).toBeDisabled();
	});

	it("calls onClick handler when not disabled or loading", () => {
		const handleClick = vi.fn();
		render(<Button {...defaultProps} onClick={handleClick} />);
		fireEvent.click(screen.getByRole("button", { name: "Test Button" }));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("does not call onClick handler when disabled", () => {
		const handleClick = vi.fn();
		render(<Button {...defaultProps} onClick={handleClick} disabled />);
		fireEvent.click(screen.getByRole("button", { name: "Test Button" }));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it("applies custom className", () => {
		render(<Button {...defaultProps} className="custom-class another-custom" />);
		const buttonElement = screen.getByRole("button", { name: "Test Button" });
		expect(buttonElement).toHaveAttribute("data-component", "button");
		expect(buttonElement).toHaveClass("custom-class");
		expect(buttonElement).toHaveClass("another-custom");
	});

	it("handles combination of props: variant, size, and icon", () => {
		render(<Button {...defaultProps} variant="destructive" size="lg" icon />);
		const buttonElement = screen.getByRole("button", { name: "Test Button" });
		expect(buttonElement).toHaveAttribute("data-variant", "destructive");
		expect(buttonElement).toHaveAttribute("data-size", "lg");
		expect(buttonElement).toHaveAttribute("data-icon");
	});

	it("shows disabledTooltip when the button is disabled", async () => {
		const user = userEvent.setup();
		render(
			<Button disabled disabledTooltip="You cannot perform this action">
				Deactivate
			</Button>,
		);

		const button = screen.getByRole("button", { name: "Deactivate" });
		const wrapper = button.parentElement;

		expect(wrapper).toHaveAttribute("data-part", "trigger-wrapper");

		await user.hover(wrapper!);

		await waitFor(
			() => {
				expect(screen.getByText("You cannot perform this action")).toBeVisible();
			},
			{ timeout: 1000 },
		);
	});
});
