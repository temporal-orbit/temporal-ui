import type { DialogProps as CoreDialogProps } from "@temporal-ui/core/dialog";
import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { X } from "lucide-solid";
import { mergeProps, Show, splitProps, type ComponentProps, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import { testId } from "@temporal-ui/core/utils/string";
import { cx } from "@temporal-ui/core/utils/cx";

export interface DialogProps
	extends CoreDialogProps<JSX.Element>, Omit<ComponentProps<typeof ArkDialog.Root>, "onOpenChange"> {
	trigger?: (props: Record<string, unknown>) => JSX.Element;
}

export function Dialog(props: DialogProps) {
	const [localProps, rootProps] = splitProps(
		mergeProps({ lazyMount: true, unmountOnExit: true } as DialogProps, props),
		["testId", "onOpenChange", "className", "classes", "trigger", "children", "trigger", "title", "description"],
	);

	const tid = testId(localProps.testId);

	return (
		<ArkDialog.Root
			{...rootProps}
			onOpenChange={(details) => localProps.onOpenChange?.(details.open)}
			data-testid={tid("--root")}
		>
			<Show when={localProps.trigger}>
				<ArkDialog.Trigger
					data-testid={tid("--trigger")}
					class={localProps.classes?.trigger}
					asChild={(props) => localProps.trigger?.({ ...props() })}
				/>
			</Show>
			<Portal>
				<ArkDialog.Backdrop data-testid={tid("--backdrop")} class={localProps.classes?.backdrop} />
				<ArkDialog.Positioner data-testid={tid("--positioner")}>
					<ArkDialog.Content
						data-testid={tid("--content")}
						class={cx(localProps.classes?.content, localProps.className)}
					>
						<div data-component="dialog" data-slot="header" class={localProps.classes?.header}>
							<Show when={localProps.title}>
								<ArkDialog.Title class={localProps.classes?.title} data-testid={tid("--title")}>
									{localProps.title}
								</ArkDialog.Title>
							</Show>
							<Show when={localProps.description}>
								<ArkDialog.Description class={localProps.classes?.description} data-testid={tid("--description")}>
									{localProps.description}
								</ArkDialog.Description>
							</Show>
							<ArkDialog.CloseTrigger class={localProps.classes?.closeTrigger} data-testid={tid("--close-trigger")}>
								<X />
							</ArkDialog.CloseTrigger>
						</div>
						{localProps.children}
					</ArkDialog.Content>
				</ArkDialog.Positioner>
			</Portal>
		</ArkDialog.Root>
	);
}
