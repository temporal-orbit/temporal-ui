import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";
import type React from "react";
import { createContext, useContext } from "react";

export type TooltipConfig = React.ComponentProps<typeof ArkTooltip.Root>;

export interface TooltipProviderProps extends TooltipConfig {
	children?: React.ReactNode;
}

const TooltipConfigContext = createContext<TooltipConfig>({});

export function TooltipProvider(props: TooltipProviderProps) {
	const { children, ...arkRoot } = props;
	const value = { ...useTooltipConfig(), ...arkRoot };

	return <TooltipConfigContext.Provider value={value}>{children}</TooltipConfigContext.Provider>;
}

export function useTooltipConfig(): TooltipConfig {
	return useContext(TooltipConfigContext);
}
