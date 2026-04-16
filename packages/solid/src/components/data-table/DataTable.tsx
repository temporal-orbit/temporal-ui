import {
	createSolidTable,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	type TableOptions,
} from "@tanstack/solid-table";
import type { DataTableProps as CoreDataTableProps } from "@temporal-ui/core/data-table";
import { For, mergeProps, Show, splitProps, type JSX } from "solid-js";
import { Loader } from "../loader";
import { Table } from "../table";
import { testId } from "@temporal-ui/core/utils/string";

export interface DataTableProps<TData>
	extends CoreDataTableProps<JSX.Element>, Omit<TableOptions<TData>, "getCoreRowModel"> {
	getCoreRowModel?: TableOptions<TData>["getCoreRowModel"];
}

export function DataTable<TData>(props: DataTableProps<TData>) {
	const [controlProps, tableProps] = splitProps(props, ["loading", "testId"]);

	const createTableProps = mergeProps(tableProps, {
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
	});

	const table = createSolidTable(createTableProps);

	const tid = testId(props.testId);

	return (
		<div data-scope="data-table" data-part="container" data-testid={tid("--container")}>
			<Table testId={tid("--table")} data-rows={controlProps.loading ? undefined : table.getRowModel().rows?.length}>
				<thead data-testid={tid("--head")}>
					<For each={table.getHeaderGroups()}>
						{(headerGroup, index) => (
							<tr
								data-testid={tid(`--header-row-${headerGroup.id}`)}
								data-row-id={headerGroup.id}
								data-row-index={index()}
							>
								<For each={headerGroup.headers}>
									{(header) => (
										<th data-testid={tid(`--header-cell-${header.id}`)}>
											<Show when={!header.isPlaceholder} fallback={null}>
												{flexRender(header.column.columnDef.header, header.getContext())}
											</Show>
										</th>
									)}
								</For>
							</tr>
						)}
					</For>
				</thead>
				<tbody data-testid={tid("--body")}>
					<Show when={table.getRowModel().rows?.length}>
						<For each={table.getRowModel().rows}>
							{(row, rowIndex) => (
								<tr
									data-state={row.getIsSelected() && "selected"}
									data-testid={tid(`--row-${row.id}`)}
									data-row-id={row.id}
									data-row-index={rowIndex()}
								>
									<For each={row.getVisibleCells()}>
										{(cell, cellIndex) => (
											<td data-testid={tid(`--cell-${cell.id}`)} data-cell-id={cell.id} data-cell-index={cellIndex()}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</td>
										)}
									</For>
								</tr>
							)}
						</For>
					</Show>
					<Show when={!table.getRowModel().rows?.length}>
						<tr data-testid={tid("--empty-row")}>
							<td colSpan={props.columns.length} data-scope="data-table" data-part="empty" data-testid={tid("--empty")}>
								<Show when={controlProps.loading}>Loading...</Show>
								<Show when={!controlProps.loading}>No results.</Show>
							</td>
						</tr>
					</Show>
				</tbody>
			</Table>
			<Show when={controlProps.loading}>
				<div data-scope="data-table" data-part="loading" data-testid={tid("--loading")}>
					<Loader size="xl" testId={tid("--loader")} />
				</div>
			</Show>
		</div>
	);
}
