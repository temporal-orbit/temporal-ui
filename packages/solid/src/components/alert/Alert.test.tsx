import { render, screen } from "@solidjs/testing-library";
import { Button } from "../button";
import { Stack } from "../stack";
import { Alert } from "./Alert";

describe("Alert Component", () => {
	const defaultProps = {
		title: "Please confirm",
		description: "This is an alert with title and description.",
	};

	it("renders correctly with default props", () => {
		render(() => <Alert {...defaultProps} />);

		const alertElement = screen.getByRole("alert");
		expect(alertElement).toBeInTheDocument();
		expect(alertElement).toHaveClass("alert-default");

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Please confirm");
		expect(screen.getByText("This is an alert with title and description.")).toBeInTheDocument();
	});

	it("applies variant classes correctly", () => {
		render(() => (
			<>
				<Alert {...defaultProps} testId="info-alert" variant="info" />
				<Alert {...defaultProps} testId="success-alert" variant="success" />
				<Alert {...defaultProps} testId="warning-alert" variant="warning" />
				<Alert {...defaultProps} testId="error-alert" variant="error" />
			</>
		));
		expect(screen.getByTestId("info-alert")).toHaveClass("alert-info");
		expect(screen.getByTestId("success-alert")).toHaveClass("alert-success");
		expect(screen.getByTestId("warning-alert")).toHaveClass("alert-warning");
		expect(screen.getByTestId("error-alert")).toHaveClass("alert-error");
	});

	it("renders default icon for each variant", () => {
		render(() => (
			<>
				<Alert {...defaultProps} testId="info-alert" variant="info" />
				<Alert {...defaultProps} testId="success-alert" variant="success" />
				<Alert {...defaultProps} testId="warning-alert" variant="warning" />
				<Alert {...defaultProps} testId="error-alert" variant="error" />
			</>
		));

		expect(screen.getByTestId("info-alert")).toContainHTML("<svg");
		expect(screen.getByTestId("success-alert")).toContainHTML("<svg");
		expect(screen.getByTestId("warning-alert")).toContainHTML("<svg");
		expect(screen.getByTestId("error-alert")).toContainHTML("<svg");
	});

	it("renders without icon when icon prop is not set", () => {
		render(() => <Alert {...defaultProps} variant="info" />);

		expect(screen.queryByRole("svg", { hidden: true })).not.toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Please confirm");
	});

	it("renders without title when title is not set", () => {
		render(() => <Alert description="This alert has no title but has a description." title={undefined} />);

		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		expect(screen.getByText("This alert has no title but has a description.")).toBeInTheDocument();
	});

	it("renders without description when description is not set", () => {
		render(() => <Alert title="Alert without description" description={undefined} />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Alert without description");
		expect(screen.queryByText("This is an alert with title and description.")).not.toBeInTheDocument();
	});

	it("renders custom icon when provided", () => {
		render(() => <Alert title="Alert with custom icon" icon={() => <svg data-testid="custom-icon" />} />);

		expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Alert with custom icon");
	});

	it("renders children content", () => {
		const children = () => (
			<Stack row gap={1} mt={1}>
				<Button variant="primary" size="xs">
					Action
				</Button>
				<Button variant="secondary" size="xs">
					Secondary
				</Button>
			</Stack>
		);

		render(() => (
			<Alert {...defaultProps} title="Alert with children">
				{children()}
			</Alert>
		));

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Alert with children");
		expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Secondary" })).toBeInTheDocument();
	});

	it("applies custom className alongside base classes", () => {
		render(() => <Alert {...defaultProps} className="custom-class another-custom" />);

		const alertElement = screen.getByRole("alert");
		expect(alertElement).toHaveClass("alert-default");
		expect(alertElement).toHaveClass("custom-class");
		expect(alertElement).toHaveClass("another-custom");
	});

	it("spreads additional div props", () => {
		render(() => <Alert {...defaultProps} testId="custom-alert" />);

		const alertElement = screen.getByTestId("custom-alert");
		expect(alertElement).toBeInTheDocument();
	});

	it("handles all props together", () => {
		const children = () => <div>Custom content</div>;

		render(() => (
			<Alert
				variant="warning"
				title="Complex Alert"
				description="This alert has everything"
				icon={() => <svg data-testid="complex-icon" />}
				className="complex-alert"
				testId="complex-alert"
			>
				{children()}
			</Alert>
		));

		const alertElement = screen.getByTestId("complex-alert");
		expect(alertElement).toHaveClass("alert-warning");
		expect(alertElement).toHaveClass("complex-alert");
		expect(screen.getByTestId("complex-icon")).toBeInTheDocument();
		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Complex Alert");
		expect(screen.getByText("This alert has everything")).toBeInTheDocument();
		expect(screen.getByText("Custom content")).toBeInTheDocument();
	});

	it("handles minimal configuration", () => {
		render(() => <Alert />);

		const alertElement = screen.getByRole("alert");
		expect(alertElement).toHaveClass("alert-default");
		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		expect(screen.queryByText("description")).not.toBeInTheDocument();
	});

	it("renders only title without description", () => {
		render(() => <Alert title="Only title" />);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Only title");
		expect(screen.queryByText("description")).not.toBeInTheDocument();
	});

	it("renders only description without title", () => {
		render(() => <Alert description="Only description" />);

		expect(screen.queryByRole("heading")).not.toBeInTheDocument();
		expect(screen.getByText("Only description")).toBeInTheDocument();
	});
});
