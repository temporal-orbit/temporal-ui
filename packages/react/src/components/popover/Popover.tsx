import type { PopoverProps as CorePopoverProps } from "@temporal-ui/core/popover";
import { Popover as ArkPopover } from "@ark-ui/react/popover";
import type React from "react";
import { Portal } from "@ark-ui/react";
import { PopoverContent } from "./PopoverContent";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";

export interface PopoverProps
	extends
		CorePopoverProps<React.ReactNode>,
		Omit<React.ComponentProps<typeof ArkPopover.Root>, "onOpenChange"> {
	trigger?: React.ReactNode;
}

export function Popover(props: PopoverProps) {
	const {
		trigger,
		portal = true,
		lazyMount = true,
		unmountOnExit = true,
		position,
		testId,
		className,
		classes,
		title,
		onOpenChange,
		description,
		children,
		...rootProps
	} = props;

	const tid = testIdFn(testId);

	return (
		<ArkPopover.Root
			portalled={portal}
			lazyMount={lazyMount}
			unmountOnExit={unmountOnExit}
			{...rootProps}
			onOpenChange={(details) => onOpenChange?.(details.open)}
			positioning={position}
			data-testid={tid("--root")}
		>
			{trigger && (
				<ArkPopover.Trigger
					asChild
					className={props.classes?.trigger}
					data-testid={tid("--trigger")}
				>
					{trigger}
				</ArkPopover.Trigger>
			)}
			{portal && (
				<Portal>
					<PopoverContent
						testId={testId}
						title={title}
						description={description}
						className={className}
						classes={classes}
					>
						{children}
					</PopoverContent>
				</Portal>
			)}
			{!portal && (
				<PopoverContent
					testId={testId}
					title={title}
					description={description}
					className={className}
					classes={classes}
				>
					{children}
				</PopoverContent>
			)}
		</ArkPopover.Root>
	);
}
