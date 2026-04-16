import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { cx } from "@temporal-ui/core/utils/cx";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface PopoverContentProps {
	testId?: string;
	title?: string;
	description?: string;
	className?: string;
	children?: React.ReactNode;
	classes?: {
		content?: string;
		title?: string;
		description?: string;
	};
}

export function PopoverContent(props: PopoverContentProps) {
	const tid = testIdFn(props.testId);

	return (
		<ArkPopover.Positioner data-testid={tid("--positioner")}>
			<ArkPopover.Content data-testid={tid("--content")} className={cx(props.classes?.content, props.className)}>
				{props.title && (
					<ArkPopover.Title className={props.classes?.title} data-testid={tid("--title")}>
						{props.title}
					</ArkPopover.Title>
				)}
				{props.description && (
					<ArkPopover.Description className={props.classes?.description} data-testid={tid("--description")}>
						{props.description}
					</ArkPopover.Description>
				)}
				{props.children}
			</ArkPopover.Content>
		</ArkPopover.Positioner>
	);
}
