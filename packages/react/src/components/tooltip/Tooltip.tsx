import type { TooltipProps as CoreTooltipProps } from "@temporal-ui/core/tooltip";
import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import type React from "react";
import { Portal } from "@ark-ui/react";
import { TooltipContent } from "./TooltipContent";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface TooltipProps
	extends CoreTooltipProps<React.ReactNode>, Omit<React.ComponentProps<typeof ArkTooltip.Root>, "onOpenChange"> {
	trigger?: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
	const {
		trigger,
		portal = true,
		lazyMount = true,
		unmountOnExit = true,
		position,
		testId,
		className,
		classes,
		showArrow = false,
		children,
		onOpenChange,
		...rootProps
	} = props;

	const tid = testIdFn(testId);

	const content = (
		<TooltipContent testId={testId} className={className} classes={classes} showArrow={showArrow}>
			{children}
		</TooltipContent>
	);

	return (
		<ArkTooltip.Root
			lazyMount={lazyMount}
			unmountOnExit={unmountOnExit}
			{...rootProps}
			onOpenChange={(details) => onOpenChange?.(details.open)}
			positioning={position}
			data-testid={tid("--root")}
		>
			{trigger && (
				<ArkTooltip.Trigger asChild className={props.classes?.trigger} data-testid={tid("--trigger")}>
					{trigger}
				</ArkTooltip.Trigger>
			)}
			{portal ? <Portal>{content}</Portal> : content}
		</ArkTooltip.Root>
	);
}
