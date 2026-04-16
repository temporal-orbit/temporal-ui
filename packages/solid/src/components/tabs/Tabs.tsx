import { type TabsRootBaseProps, Tabs as ArkTabs } from "@ark-ui/solid/tabs";
import type { TabsProps as CoreTabsProps } from "@temporal-ui/core/tabs";
import { mergeProps, splitProps, type JSX } from "solid-js";

export interface TabsProps
	extends CoreTabsProps<JSX.Element>, Omit<TabsRootBaseProps, "defaultValue" | "onValueChange" | "value"> {}

export function Tabs(props: TabsProps) {
	const [controlProps, rootProps] = splitProps(mergeProps({ variant: "default" }, props), ["variant", "onValueChange"]);

	return (
		<ArkTabs.Root
			data-variant={controlProps.variant}
			onValueChange={(details) => controlProps.onValueChange?.(details.value)}
			{...rootProps}
		/>
	);
}
export const TabsTrigger = ArkTabs.Trigger;
export const TabsList = ArkTabs.List;
export const TabsContent = ArkTabs.Content;
export const TabsIndicator = ArkTabs.Indicator;
