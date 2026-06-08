import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import type { PopoverProps as CorePopoverProps } from "@temporal-ui/core/popover";
import { testId } from "@temporal-ui/core/utils/string";
import { mergeProps, Show, splitProps, type ComponentProps, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { PopoverContent } from "./PopoverContent";

export interface PopoverProps
	extends
		CorePopoverProps<JSX.Element>,
		Omit<ComponentProps<typeof ArkPopover.Root>, "onOpenChange"> {
	trigger?: (props: Record<string, unknown>) => JSX.Element;
}

export function Popover(props: PopoverProps) {
	const [localProps, rootProps] = splitProps(
		mergeProps({ portal: true, lazyMount: true, unmountOnExit: true }, props),
		["trigger", "portal", "testId", "position", "onOpenChange", "classes", "className", "children"],
	);

	const tid = testId(localProps.testId);

	return (
		<ArkPopover.Root
			portalled={localProps.portal}
			{...rootProps}
			onOpenChange={(details) => localProps.onOpenChange?.(details.open)}
			positioning={localProps.position}
			data-testid={tid("--root")}
		>
			<Show when={localProps.trigger}>
				<ArkPopover.Trigger
					asChild={(props) => localProps.trigger?.({ ...props() })}
					class={localProps.classes?.trigger}
					data-testid={tid("--trigger")}
				/>
			</Show>
			<Show when={localProps.portal}>
				<Portal>
					<PopoverContent
						title={rootProps.title}
						description={rootProps.description}
						className={localProps.className}
						classes={localProps.classes}
						testId={localProps.testId}
						children={localProps.children}
					/>
				</Portal>
			</Show>
			<Show when={!localProps.portal}>
				<PopoverContent
					title={rootProps.title}
					description={rootProps.description}
					className={localProps.className}
					classes={localProps.classes}
					testId={localProps.testId}
					children={localProps.children}
				/>
			</Show>
		</ArkPopover.Root>
	);
}
