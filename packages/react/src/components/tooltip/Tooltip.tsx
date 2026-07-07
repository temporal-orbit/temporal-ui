import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import type { BaseComponent } from "@temporal-ui/core/base";
import {
	DISABLED_TOOLTIP_TRIGGER_TAB_INDEX,
	isDisabledControlProps,
	shouldWrapDisabledTooltipTrigger,
	type TooltipBaseProps,
} from "@temporal-ui/core/tooltip";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";
import type React from "react";
import { isValidElement } from "react";
import { TooltipContent } from "./TooltipContent";
import { useTooltipConfig } from "./TooltipProvider";

export interface TooltipProps
	extends
		Omit<React.ComponentProps<typeof ArkTooltip.Root>, "onOpenChange">,
		TooltipBaseProps<React.ReactNode>,
		Pick<BaseComponent<React.ReactNode>, "testId" | "className"> {
	trigger?: React.ReactNode;
	onOpenChange?: (open: boolean) => void;
}

function isTriggerDisabled(trigger: React.ReactNode): boolean {
	if (!isValidElement(trigger)) {
		return false;
	}
	return isDisabledControlProps(trigger.props as Record<string, unknown>);
}

export function Tooltip(props: TooltipProps) {
	const { trigger, testId, className, children, onOpenChange, disabledTrigger, ...instanceRoot } =
		props;
	const arkRoot = { ...useTooltipConfig(), ...instanceRoot };
	const tid = testIdFn(testId);
	const wrapDisabledTrigger = shouldWrapDisabledTooltipTrigger(
		disabledTrigger,
		trigger ? isTriggerDisabled(trigger) : false,
	);

	return (
		<ArkTooltip.Root
			{...arkRoot}
			onOpenChange={(details) => onOpenChange?.(details.open)}
			data-testid={tid("--root")}
		>
			{trigger && (
				<ArkTooltip.Trigger asChild data-testid={tid("--trigger")}>
					{wrapDisabledTrigger ? (
						<span
							data-scope="tooltip"
							data-part="trigger-wrapper"
							tabIndex={DISABLED_TOOLTIP_TRIGGER_TAB_INDEX}
						>
							{trigger}
						</span>
					) : (
						trigger
					)}
				</ArkTooltip.Trigger>
			)}
			<TooltipContent testId={testId} className={className}>
				{children}
			</TooltipContent>
		</ArkTooltip.Root>
	);
}
