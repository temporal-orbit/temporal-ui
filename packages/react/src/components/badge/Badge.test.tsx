import { render, screen } from "@testing-library/react";
import type React from "react";
import { Badge, type BadgeProps } from "./Badge";

describe("Badge Component", () => {
	const defaultProps: BadgeProps = {
		children: "Test Badge",
	};

	it("renders correctly with default props", () => {
		render(<Badge {...defaultProps} />);
		const badgeElement = screen.getByText("Test Badge");
		expect(badgeElement).toBeInTheDocument();
		expect(badgeElement).toHaveClass("badge");
	});

	it("renders children correctly", () => {
		render(<Badge>Hello World</Badge>);
		expect(screen.getByText("Hello World")).toBeInTheDocument();
	});

	it("renders with a specified variant", () => {
		render(<Badge {...defaultProps} variant="primary" />);
		const badgeElement = screen.getByText("Test Badge");
		expect(badgeElement).toHaveClass("badge-primary");
	});

	it("renders with an undefined variant (should only have base class)", () => {
		render(<Badge {...defaultProps} variant={undefined} />);
		const badgeElement = screen.getByText("Test Badge");
		expect(badgeElement).toHaveClass("badge");
		expect(badgeElement).not.toHaveClass("badge-undefined"); // Ensure it doesn't literally append "undefined"
	});

	it("applies custom className", () => {
		render(<Badge {...defaultProps} className="custom-class" />);
		const badgeElement = screen.getByText("Test Badge");
		expect(badgeElement).toHaveClass("badge");
		expect(badgeElement).toHaveClass("custom-class");
	});

	it("applies custom style", () => {
		const style: React.CSSProperties = { color: "red", fontSize: "16px" };
		render(<Badge {...defaultProps} style={style} />);
		const badgeElement = screen.getByText("Test Badge");
		expect(badgeElement).toHaveStyle("color: red");
		expect(badgeElement).toHaveStyle("font-size: 16px");
	});

	it("renders correctly when children is an array of ReactNodes", () => {
		render(
			<Badge>
				<span>Part 1</span>
				<span>Part 2</span>
			</Badge>,
		);
		expect(screen.getByText("Part 1")).toBeInTheDocument();
		expect(screen.getByText("Part 2")).toBeInTheDocument();
	});

	it("handles variant and custom class together", () => {
		render(<Badge {...defaultProps} variant="secondary" className="extra-style" />);
		const badgeElement = screen.getByText("Test Badge");
		expect(badgeElement).toHaveClass("badge-secondary");
		expect(badgeElement).toHaveClass("extra-style");
	});
});
