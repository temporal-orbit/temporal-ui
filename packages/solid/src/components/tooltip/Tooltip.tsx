import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import type { BaseComponent } from "@temporal-ui/core/base";
import {
	DISABLED_TOOLTIP_TRIGGER_TAB_INDEX,
	shouldWrapDisabledTooltipTrigger,
	type TooltipBaseProps,
} from "@temporal-ui/core/tooltip";
import { testId } from "@temporal-ui/core/utils/string";
import { mergeProps, Show, splitProps, type ComponentProps, type JSX } from "solid-js";
import { TooltipContent as TemporalTooltipContent } from "./TooltipContent";
import { useTooltipConfig } from "./TooltipProvider";

export interface TooltipProps
	extends
		Omit<ComponentProps<typeof ArkTooltip.Root>, "onOpenChange">,
		TooltipBaseProps<JSX.Element>,
		Pick<BaseComponent<JSX.Element>, "testId" | "className"> {
	trigger?: (props: Record<string, unknown>) => JSX.Element;
	onOpenChange?: (open: boolean) => void;
}

export function Tooltip(props: TooltipProps) {
	const [local, rest] = splitProps(props, [
		"trigger",
		"testId",
		"className",
		"children",
		"onOpenChange",
		"disabledTrigger",
	]);
	const arkRoot = mergeProps(useTooltipConfig(), rest);
	const tid = testId(local.testId);
	const wrapDisabledTrigger = () => shouldWrapDisabledTooltipTrigger(local.disabledTrigger, false);

	return (
		<ArkTooltip.Root
			{...arkRoot}
			onOpenChange={(details) => local.onOpenChange?.(details.open)}
			data-testid={tid("--root")}
		>
			<Show when={local.trigger}>
				<ArkTooltip.Trigger
					asChild={(triggerProps) => {
						if (wrapDisabledTrigger()) {
							return (
								<span
									{...triggerProps()}
									data-scope="tooltip"
									data-part="trigger-wrapper"
									tabIndex={DISABLED_TOOLTIP_TRIGGER_TAB_INDEX}
								>
									{local.trigger?.({})}
								</span>
							);
						}
						return local.trigger?.({ ...triggerProps() });
					}}
					data-testid={tid("--trigger")}
				/>
			</Show>
			<TemporalTooltipContent
				testId={local.testId}
				className={local.className}
				children={local.children}
			/>
		</ArkTooltip.Root>
	);
}
