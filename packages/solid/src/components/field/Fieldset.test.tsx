import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { Fieldset } from "./Fieldset";

describe("Fieldset", () => {
	it("renders root, legend, hint, error and children", () => {
		render(() => (
			<Fieldset
				legend="Group Legend"
				hint="Helpful hint"
				error="Something went wrong"
				testId="fieldset"
			>
				<div data-testid="child">child</div>
			</Fieldset>
		));

		expect(screen.getByTestId("fieldset--root")).toBeInTheDocument();
		expect(screen.getByTestId("fieldset--label")).toHaveTextContent("Group Legend");
		expect(screen.getByTestId("fieldset--hint")).toHaveTextContent("Helpful hint");
		expect(screen.getByTestId("fieldset--error")).toHaveTextContent("Something went wrong");
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});

	it("omits optional parts when not provided", () => {
		render(() => (
			<Fieldset testId="fieldset">
				<div data-testid="child">child</div>
			</Fieldset>
		));

		expect(screen.getByTestId("fieldset--root")).toBeInTheDocument();
		expect(screen.queryByTestId("fieldset--label")).toBeNull();
		expect(screen.queryByTestId("fieldset--hint")).toBeNull();
		expect(screen.queryByTestId("fieldset--error")).toBeNull();
		expect(screen.getByTestId("child")).toBeInTheDocument();
	});
});
