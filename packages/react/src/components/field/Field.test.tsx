import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
	it("renders root, label, hint, error and children", () => {
		render(
			<Field label="My Label" hint="Helpful hint" error="Something went wrong" testId="field">
				<div data-testid="child">child</div>
			</Field>,
		);

		expect(screen.getByTestId("field--root")).toBeInTheDocument();
		expect(screen.getByTestId("field--label")).toHaveTextContent("My Label");
		expect(screen.getByTestId("field--hint")).toHaveTextContent("Helpful hint");
		expect(screen.getByTestId("field--error")).toHaveTextContent("Something went wrong");
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});

	it("omits optional parts when not provided", () => {
		render(
			<Field testId="field">
				<div data-testid="child">child</div>
			</Field>,
		);

		expect(screen.getByTestId("field--root")).toBeInTheDocument();
		expect(screen.queryByTestId("field--label")).toBeNull();
		expect(screen.queryByTestId("field--hint")).toBeNull();
		expect(screen.queryByTestId("field--error")).toBeNull();
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});
