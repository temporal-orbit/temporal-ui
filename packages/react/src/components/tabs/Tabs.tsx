import { type TabsRootBaseProps, Tabs as ArkTabs } from "@ark-ui/react/tabs";
import type { TabsProps as CoreTabsProps } from "@temporal-ui/core/tabs";

export interface TabsProps
	extends CoreTabsProps<React.ReactNode>, Omit<TabsRootBaseProps, "defaultValue" | "onValueChange" | "value"> {}

export function Tabs(props: TabsProps) {
	const { variant = "default", onValueChange, ...rest } = props;

	return <ArkTabs.Root data-variant={variant} onValueChange={(details) => onValueChange?.(details.value)} {...rest} />;
}
export const TabsTrigger = ArkTabs.Trigger;
export const TabsList = ArkTabs.List;
export const TabsContent = ArkTabs.Content;
export const TabsIndicator = ArkTabs.Indicator;
