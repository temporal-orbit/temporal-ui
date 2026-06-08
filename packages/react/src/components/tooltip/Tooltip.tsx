import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import type { BaseComponent } from "@temporal-ui/core/base";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";
import type React from "react";
import { TooltipContent } from "./TooltipContent";
import { useTooltipConfig } from "./TooltipProvider";

export interface TooltipProps
	extends
		Omit<React.ComponentProps<typeof ArkTooltip.Root>, "onOpenChange">,
		Pick<BaseComponent<React.ReactNode>, "testId" | "className" | "children"> {
	trigger?: React.ReactNode;
	onOpenChange?: (open: boolean) => void;
}

export function Tooltip(props: TooltipProps) {
	const { trigger, testId, className, children, onOpenChange, ...instanceRoot } = props;
	const arkRoot = { ...useTooltipConfig(), ...instanceRoot };
	const tid = testIdFn(testId);

	return (
		<ArkTooltip.Root
			{...arkRoot}
			onOpenChange={(details) => onOpenChange?.(details.open)}
			data-testid={tid("--root")}
		>
			{trigger && (
				<ArkTooltip.Trigger asChild data-testid={tid("--trigger")}>
					{trigger}
				</ArkTooltip.Trigger>
			)}
			<TooltipContent testId={testId} className={className}>
				{children}
			</TooltipContent>
		</ArkTooltip.Root>
	);
}
