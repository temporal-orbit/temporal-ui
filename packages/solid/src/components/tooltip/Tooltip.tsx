import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import type { BaseComponent } from "@temporal-ui/core/base";
import { testId } from "@temporal-ui/core/utils/string";
import { mergeProps, Show, splitProps, type ComponentProps, type JSX } from "solid-js";
import { TooltipContent as TemporalTooltipContent } from "./TooltipContent";
import { useTooltipConfig } from "./TooltipProvider";

export interface TooltipProps
	extends
		Omit<ComponentProps<typeof ArkTooltip.Root>, "onOpenChange">,
		Pick<BaseComponent<JSX.Element>, "testId" | "className" | "children"> {
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
	]);
	const arkRoot = mergeProps(useTooltipConfig(), rest);
	const tid = testId(local.testId);

	return (
		<ArkTooltip.Root
			{...arkRoot}
			onOpenChange={(details) => local.onOpenChange?.(details.open)}
			data-testid={tid("--root")}
		>
			<Show when={local.trigger}>
				<ArkTooltip.Trigger
					asChild={(triggerProps) => local.trigger?.({ ...triggerProps() })}
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
