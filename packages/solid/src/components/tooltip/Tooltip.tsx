import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import type { TooltipProps as CoreTooltipProps } from "@temporal-ui/core/tooltip";
import { testId } from "@temporal-ui/core/utils/string";
import { mergeProps, Show, splitProps, type ComponentProps, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { TooltipContent as TemporalTooltipContent } from "./TooltipContent";

export interface TooltipProps
	extends CoreTooltipProps<JSX.Element>, Omit<ComponentProps<typeof ArkTooltip.Root>, "onOpenChange"> {
	trigger?: (props: Record<string, unknown>) => JSX.Element;
}

export function Tooltip(props: TooltipProps) {
	const [localProps, rootProps] = splitProps(
		mergeProps({ portal: true, lazyMount: true, unmountOnExit: true }, props),
		["trigger", "portal", "testId", "position", "onOpenChange", "classes", "className", "children", "showArrow"],
	);

	const tid = testId(localProps.testId);

	return (
		<ArkTooltip.Root
			{...rootProps}
			onOpenChange={(details) => localProps.onOpenChange?.(details.open)}
			positioning={localProps.position}
			data-testid={tid("--root")}
		>
			<Show when={localProps.trigger}>
				<ArkTooltip.Trigger
					asChild={(triggerProps) => localProps.trigger?.({ ...triggerProps() })}
					class={localProps.classes?.trigger}
					data-testid={tid("--trigger")}
				/>
			</Show>
			<Show when={localProps.portal}>
				<Portal>
					<TemporalTooltipContent
						testId={localProps.testId}
						className={localProps.className}
						classes={localProps.classes}
						showArrow={localProps.showArrow}
						children={localProps.children}
					/>
				</Portal>
			</Show>
			<Show when={!localProps.portal}>
				<TemporalTooltipContent
					testId={localProps.testId}
					className={localProps.className}
					classes={localProps.classes}
					showArrow={localProps.showArrow}
					children={localProps.children}
				/>
			</Show>
		</ArkTooltip.Root>
	);
}
