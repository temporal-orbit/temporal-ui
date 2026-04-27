import { flexRender, getCoreRowModel, useReactTable, type TableOptions } from "@tanstack/react-table";
import type { DataTableProps as CoreDataTableProps } from "@temporal-ui/core/data-table";
import { testId as createTestId } from "@temporal-ui/core/utils/string";
import { Loader } from "../loader";
import { Table } from "../table";

export interface DataTableProps<TData>
	extends CoreDataTableProps<React.ReactNode>, Omit<TableOptions<TData>, "getCoreRowModel"> {
	getCoreRowModel?: TableOptions<TData>["getCoreRowModel"];
}

export function DataTable<TData>(props: DataTableProps<TData>) {
	const { loading, testId, ...tableProps } = props;
	const tid = createTestId(testId);

	const table = useReactTable({
		getCoreRowModel: getCoreRowModel(),
		...tableProps,
	});

	return (
		<div data-component="data-table" data-slot="container" data-testid={tid("--container")}>
			<Table testId={tid("--table")} data-rows={loading ? undefined : table.getRowModel().rows?.length}>
				<thead data-testid={tid("--head")}>
					{table.getHeaderGroups().map((headerGroup, index) => (
						<tr
							key={headerGroup.id}
							data-testid={tid(`--header-row-${headerGroup.id}`)}
							data-row-id={headerGroup.id}
							data-row-index={index}
						>
							{headerGroup.headers.map((header) => {
								return (
									<th key={header.id} data-testid={tid(`--header-cell-${header.id}`)}>
										{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								);
							})}
						</tr>
					))}
				</thead>
				<tbody data-testid={tid("--body")}>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row, rowIndex) => (
							<tr
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
								data-testid={tid(`--row-${row.id}`)}
								data-row-id={row.id}
								data-row-index={rowIndex}
							>
								{row.getVisibleCells().map((cell, cellIndex) => (
									<td
										key={cell.id}
										data-testid={tid(`--cell-${cell.id}`)}
										data-cell-id={cell.id}
										data-cell-index={cellIndex}
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))
					) : (
						<tr data-testid={tid("--empty-row")}>
							<td
								colSpan={props.columns.length}
								data-component="data-table"
								data-slot="empty"
								data-testid={tid("--empty")}
							>
								{loading ? "Loading..." : "No results."}
							</td>
						</tr>
					)}
				</tbody>
			</Table>
			{loading && (
				<div data-component="data-table" data-slot="loading" data-testid={tid("--loading")}>
					<Loader size="xl" testId={tid("--loader")} />
				</div>
			)}
		</div>
	);
}
