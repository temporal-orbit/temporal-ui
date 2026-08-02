import { Select as ArkSelect, useSelectContext } from "@ark-ui/react/select";
import type { SelectItem as CoreSelectItem } from "@temporal-ui/core/select";
import { CheckIcon } from "lucide-react";
import { useAlignItemWithTrigger } from "./use-align-item-with-trigger";

export type SelectItem<D = unknown> = CoreSelectItem<D, React.ReactNode>;

export interface SelectContentProps {
	tid: (str: string) => string | undefined;
	maxHeight?: number;
	alignItemWithTrigger?: boolean;
	alignItemWithTriggerMinHeight?: number;
	openedWithTouch?: boolean;
	selectIds?: {
		control: string;
		trigger: string;
		valueText: string;
		positioner: string;
		content: string;
	};
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
	const {
		tid,
		maxHeight = 500,
		classes,
		alignItemWithTrigger,
		alignItemWithTriggerMinHeight,
		openedWithTouch,
		selectIds,
	} = props;
	const context = useSelectContext();
	const { alignedStyles, isAlignPending, showAligned, shouldAlign } = useAlignItemWithTrigger(
		context,
		{
			alignItemWithTrigger,
			alignItemWithTriggerMinHeight,
			openedWithTouch,
			selectIds,
		},
	);

	return (
		<ArkSelect.Positioner
			id={selectIds?.positioner}
			className={classes?.positioner}
			data-testid={tid("--positioner")}
			data-align-item-with-trigger={shouldAlign ? "" : undefined}
			data-align-item-with-trigger-pending={isAlignPending ? "" : undefined}
			style={showAligned ? alignedStyles?.positioner : undefined}
		>
			<div
				data-align-item-with-trigger-active={showAligned ? "" : undefined}
				style={showAligned ? alignedStyles?.popup : { display: "contents" }}
			>
				<ArkSelect.Content
					id={selectIds?.content}
					className={classes?.content}
					data-testid={tid("--content")}
					style={showAligned ? alignedStyles?.content : { maxHeight: `${maxHeight}px` }}
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
										<ArkSelect.ItemIndicator
											className={classes?.itemIndicator}
											data-testid={tid("--item-indicator")}
										>
											<CheckIcon />
										</ArkSelect.ItemIndicator>
										{item.icon}
										<ArkSelect.ItemText
											className={classes?.itemText}
											data-testid={tid("--item-text")}
										>
											{item.label}
										</ArkSelect.ItemText>
									</ArkSelect.Item>
								))}
							</ArkSelect.ItemGroup>
						))}
					</div>
				</ArkSelect.Content>
			</div>
		</ArkSelect.Positioner>
	);
}
