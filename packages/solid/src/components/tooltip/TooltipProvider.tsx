import { Tooltip as ArkTooltip } from "@ark-ui/solid/tooltip";
import {
	createContext,
	mergeProps,
	splitProps,
	useContext,
	type ComponentProps,
	type JSX,
} from "solid-js";

export type TooltipConfig = ComponentProps<typeof ArkTooltip.Root>;

export interface TooltipProviderProps extends TooltipConfig {
	children?: JSX.Element;
}

const TooltipConfigContext = createContext({} as TooltipConfig);

export function TooltipProvider(props: TooltipProviderProps) {
	const [local, arkRoot] = splitProps(props, ["children"]);
	const value = mergeProps(useTooltipConfig(), arkRoot);

	return (
		<TooltipConfigContext.Provider value={value}>{local.children}</TooltipConfigContext.Provider>
	);
}

export function useTooltipConfig() {
	return useContext(TooltipConfigContext);
}
