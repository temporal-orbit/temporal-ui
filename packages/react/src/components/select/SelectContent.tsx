import { Select as ArkSelect, useSelectContext } from "@ark-ui/react/select";
import type { SelectItem as CoreSelectItem } from "@temporal-ui/core/select";
import { CheckIcon } from "lucide-react";

export type SelectItem<D = unknown> = CoreSelectItem<D, React.ReactNode>;

export interface SelectContentProps {
	tid: (str: string) => string | undefined;
	maxHeight?: number;
	classes?: {
		content?: string;
		itemGroup?: string;
		itemGroupLabel?: string;
		item?: string;
		itemText?: string;
		itemIndicator?: string;
		positioner?: string;
		scrollArea?: string;
		input?: string;
	};
}

export function SelectContent(props: SelectContentProps) {
	const { tid, maxHeight = 500, classes } = props;
	const context = useSelectContext();
	return (
		<ArkSelect.Positioner className={classes?.positioner} data-testid={tid("--positioner")}>
			<ArkSelect.Content
				className={classes?.content}
				data-testid={tid("--content")}
				style={{ maxHeight: `${maxHeight}px` }}
			>
				<div data-component="select" data-slot="list" data-testid={tid("--content-list")}>
					{context.collection.group().map(([type, group]) => (
						<ArkSelect.ItemGroup
							key={type}
							className={classes?.itemGroup}
							data-testid={tid("--item-group")}
						>
							{type && (
								<ArkSelect.ItemGroupLabel
									className={classes?.itemGroupLabel}
									data-testid={tid("--item-group-label")}
								>
									{type}
								</ArkSelect.ItemGroupLabel>
							)}
							{group.map((item) => (
								<ArkSelect.Item
									key={item.value}
									className={classes?.item}
									data-testid={tid("--item")}
									item={item}
								>
									{item.icon}
									<ArkSelect.ItemText
										className={classes?.itemText}
										data-testid={tid("--item-text")}
									>
										{item.label}
									</ArkSelect.ItemText>
									<ArkSelect.ItemIndicator
										className={classes?.itemIndicator}
										data-testid={tid("--item-indicator")}
									>
										<CheckIcon />
									</ArkSelect.ItemIndicator>
								</ArkSelect.Item>
							))}
						</ArkSelect.ItemGroup>
					))}
				</div>
			</ArkSelect.Content>
		</ArkSelect.Positioner>
	);
}
