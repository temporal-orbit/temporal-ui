import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import { cx } from "@temporal-ui/core/utils/cx";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface TooltipContentProps {
	testId?: string;
	className?: string;
	children?: React.ReactNode;
	classes?: {
		content?: string;
		arrow?: string;
	};
	showArrow?: boolean;
}

export function TooltipContent(props: TooltipContentProps) {
	const tid = testIdFn(props.testId);

	return (
		<ArkTooltip.Positioner data-testid={tid("--positioner")}>
			{props.showArrow && (
				<ArkTooltip.Arrow data-testid={tid("--arrow")}>
					<ArkTooltip.ArrowTip className={props.classes?.arrow} />
				</ArkTooltip.Arrow>
			)}
			<ArkTooltip.Content data-testid={tid("--content")} className={cx(props.classes?.content, props.className)}>
				{props.children}
			</ArkTooltip.Content>
		</ArkTooltip.Positioner>
	);
}
