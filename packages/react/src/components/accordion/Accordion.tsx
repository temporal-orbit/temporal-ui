import { type AccordionRootBaseProps, Accordion as ArkAccordion } from "@ark-ui/react/accordion";
import type { AccordionProps as CoreAccordionProps } from "@temporal-ui/core/accordion";

export interface AccordionProps
	extends CoreAccordionProps<React.ReactNode>, Omit<AccordionRootBaseProps, "onValueChange"> {}

export function Accordion(props: AccordionProps) {
	const {
		variant = "default",
		className,
		testId,
		onValueChange,
		collapsible = true,
		lazyMount = true,
		unmountOnExit = true,
		...rest
	} = props;

	return (
		<ArkAccordion.Root
			className={className}
			data-testid={testId}
			data-variant={variant}
			collapsible={collapsible}
			lazyMount={lazyMount}
			unmountOnExit={unmountOnExit}
			onValueChange={(details) => onValueChange?.(details.value)}
			{...rest}
		/>
	);
}

export const AccordionItem = ArkAccordion.Item;
export const AccordionItemTrigger = ArkAccordion.ItemTrigger;
export const AccordionItemContent = ArkAccordion.ItemContent;
export const AccordionItemIndicator = ArkAccordion.ItemIndicator;
