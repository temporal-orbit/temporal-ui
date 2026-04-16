import type { HTMLProps } from "@ark-ui/solid";
import { splitProps, type JSX } from "solid-js";
import type { TableProps as CoreTableProps } from "@temporal-ui/core/table";

export interface TableProps extends CoreTableProps<JSX.Element>, HTMLProps<"table"> {}

export function Table(_props: TableProps) {
	const [props, elementProps] = splitProps(_props, ["className", "class", "children", "testId"]);
	return (
		<div data-scope="table" data-part="container" data-testid={props.testId ? `${props.testId}--container` : undefined}>
			<table
				{...elementProps}
				class={props.className ?? props.class}
				data-scope="table"
				data-part="table"
				data-testid={props.testId}
			>
				{props.children}
			</table>
		</div>
	);
}
