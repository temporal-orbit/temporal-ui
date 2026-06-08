import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";
import type React from "react";

export interface TooltipContentProps {
	testId?: string;
	className?: string;
	children?: React.ReactNode;
}

export function TooltipContent(props: TooltipContentProps) {
	const tid = testIdFn(props.testId);

	return (
		<ArkTooltip.Positioner data-testid={tid("--positioner")}>
			<ArkTooltip.Content data-testid={tid("--content")} className={props.className}>
				{props.children}
			</ArkTooltip.Content>
		</ArkTooltip.Positioner>
	);
}
