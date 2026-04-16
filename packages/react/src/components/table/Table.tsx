import type { TableProps as CoreTableProps } from "@temporal-ui/core/table";

export interface TableProps extends CoreTableProps<React.ReactNode>, React.ComponentProps<"table"> {}

export function Table({ testId, ...props }: TableProps) {
	return (
		<div data-scope="table" data-part="container" data-testid={testId ? `${testId}--container` : undefined}>
			<table {...props} data-scope="table" data-part="table" data-testid={testId} />
		</div>
	);
}
