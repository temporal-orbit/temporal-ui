import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import type { DialogProps as CoreDialogProps } from "@temporal-ui/core/dialog";
import { cx } from "@temporal-ui/core/utils/cx";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";
import { X } from "lucide-react";
import type React from "react";

export interface DialogProps
	extends CoreDialogProps<React.ReactNode>, Omit<React.ComponentProps<typeof ArkDialog.Root>, "onOpenChange"> {
	trigger?: React.ReactNode;
}

export function Dialog(props: DialogProps) {
	const {
		trigger,
		testId,
		open,
		onOpenChange,
		defaultOpen,
		classes,
		className,
		children,
		lazyMount = true,
		unmountOnExit = true,
		...rootProps
	} = props;

	const tid = testIdFn(testId);

	return (
		<ArkDialog.Root
			lazyMount={lazyMount}
			unmountOnExit={unmountOnExit}
			open={open}
			defaultOpen={defaultOpen}
			{...rootProps}
			onOpenChange={(details) => onOpenChange?.(details.open)}
			data-testid={testId ? `${testId}--root` : undefined}
		>
			{trigger && (
				<ArkDialog.Trigger asChild data-testid={tid("--trigger")} className={classes?.trigger}>
					{trigger}
				</ArkDialog.Trigger>
			)}
			<Portal>
				<ArkDialog.Backdrop className={classes?.backdrop} data-testid={tid("--backdrop")} />
				<ArkDialog.Positioner>
					<ArkDialog.Content className={cx(classes?.content, className)} data-testid={tid("--content")}>
						<div data-component="dialog" data-slot="header">
							{rootProps.title && (
								<ArkDialog.Title className={classes?.title} data-testid={tid("--title")}>
									{rootProps.title}
								</ArkDialog.Title>
							)}
							{rootProps.description && (
								<ArkDialog.Description className={classes?.description} data-testid={tid("--description")}>
									{rootProps.description}
								</ArkDialog.Description>
							)}
							<ArkDialog.CloseTrigger className={classes?.closeTrigger} data-testid={tid("--close-trigger")}>
								<X />
							</ArkDialog.CloseTrigger>
						</div>
						{children}
					</ArkDialog.Content>
				</ArkDialog.Positioner>
			</Portal>
		</ArkDialog.Root>
	);
}
