import { type AccordionRootBaseProps, Accordion as ArkAccordion } from "@ark-ui/solid/accordion";
import type { AccordionProps as CoreAccordionProps } from "@temporal-ui/core/accordion";
import { mergeProps, splitProps, type JSX } from "solid-js";

export interface AccordionProps
	extends CoreAccordionProps<JSX.Element>, Omit<AccordionRootBaseProps, "onValueChange"> {}

export function Accordion(props: AccordionProps) {
	const merged = mergeProps(
		{
			variant: "default",
			collapsible: true,
			lazyMount: true,
			unmountOnExit: true,
		},
		props,
	);
	const [controlProps, rootProps] = splitProps(merged, [
		"variant",
		"className",
		"testId",
		"onValueChange",
	]);

	return (
		<ArkAccordion.Root
			class={controlProps.className}
			data-testid={controlProps.testId}
			data-variant={controlProps.variant}
			onValueChange={(details) => controlProps.onValueChange?.(details.value)}
			{...rootProps}
		/>
	);
}

export const AccordionItem = ArkAccordion.Item;
export const AccordionItemTrigger = ArkAccordion.ItemTrigger;
export const AccordionItemContent = ArkAccordion.ItemContent;
export const AccordionItemIndicator = ArkAccordion.ItemIndicator;
