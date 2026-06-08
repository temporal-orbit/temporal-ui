import type { TableProps as CoreTableProps } from "@temporal-ui/core/table";

export interface TableProps
	extends CoreTableProps<React.ReactNode>, React.ComponentProps<"table"> {}

export function Table({ testId, ...props }: TableProps) {
	return (
		<div
			data-component="table"
			data-slot="container"
			data-testid={testId ? `${testId}--container` : undefined}
		>
			<table {...props} data-component="table" data-slot="table" data-testid={testId} />
		</div>
	);
}
