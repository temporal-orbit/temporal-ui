import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import { testId } from "@temporal-ui/core/utils/string";
import type { JSX } from "solid-js";

export interface TooltipContentProps {
	testId?: string;
	className?: string;
	children?: JSX.Element;
}

export function TooltipContent(props: TooltipContentProps) {
	const tid = testId(props.testId);

	return (
		<ArkTooltip.Positioner data-testid={tid("--positioner")}>
			<ArkTooltip.Content data-testid={tid("--content")} class={props.className}>
				{props.children}
			</ArkTooltip.Content>
		</ArkTooltip.Positioner>
	);
}
