import { render, screen } from "@solidjs/testing-library";
import { describe, expect, it } from "vitest";
import { DataTable } from "./DataTable";

// Mock data for testing
const mockData = [
	{ id: 1, name: "John Doe", email: "john@example.com" },
	{ id: 2, name: "Jane Smith", email: "jane@example.com" },
];

const mockColumns = [
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "email",
		header: "Email",
	},
];

describe("DataTable", () => {
	it("renders table elements properly", () => {
		render(() => <DataTable data={mockData} columns={mockColumns} testId="test-table" />);

		expect(screen.getByTestId("test-table--container")).toBeInTheDocument();
		expect(screen.getByTestId("test-table--table")).toBeInTheDocument();

		// Check data rows
		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("john@example.com")).toBeInTheDocument();
		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
		expect(screen.getByText("jane@example.com")).toBeInTheDocument();
	});

	it("renders loading state when loading is true", () => {
		render(() => (
			<DataTable data={mockData} columns={mockColumns} loading={true} testId="test-table" />
		));

		expect(screen.getByTestId("test-table--loading")).toBeInTheDocument();
	});

	it("does not render loading state when loading is false", () => {
		render(() => (
			<DataTable data={mockData} columns={mockColumns} loading={false} testId="test-table" />
		));

		expect(screen.queryByTestId("test-table--loading")).not.toBeInTheDocument();
	});
});
