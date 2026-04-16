import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import { cx } from "@temporal-ui/core/utils/cx";
import { testId } from "@temporal-ui/core/utils/string";
import { Show, type JSX } from "solid-js";

export interface TooltipContentProps {
	testId?: string;
	className?: string;
	children?: JSX.Element;
	classes?: {
		content?: string;
		arrow?: string;
	};
	showArrow?: boolean;
}

export function TooltipContent(props: TooltipContentProps) {
	const tid = testId(props.testId);

	return (
		<ArkTooltip.Positioner data-testid={tid("--positioner")}>
			<Show when={props.showArrow}>
				<ArkTooltip.Arrow data-testid={tid("--arrow")}>
					<ArkTooltip.ArrowTip class={props.classes?.arrow} />
				</ArkTooltip.Arrow>
			</Show>
			<ArkTooltip.Content data-testid={tid("--content")} class={cx(props.classes?.content, props.className)}>
				{props.children}
			</ArkTooltip.Content>
		</ArkTooltip.Positioner>
	);
}
