import type { SidebarProps as CoreSidebarProps } from "@temporal-ui/core/sidebar";
import { Box } from "../box";
import { useSidebar } from "./SidebarProvider";

export interface SidebarProps extends CoreSidebarProps<React.ReactNode>, React.ComponentProps<"div"> {}

export function Sidebar(props: SidebarProps) {
	const { state } = useSidebar();
	const { side = "left", collapsible = "offcanvas", variant = "sidebar", children, ...boxProps } = props;

	if (collapsible === "none") {
		return (
			<Box data-component="sidebar" data-slot="root" data-collapsible={collapsible} {...boxProps}>
				{children}
			</Box>
		);
	}

	return (
		<div
			data-component="sidebar"
			data-slot="root"
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			className={"group peer"}
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div data-component="sidebar" data-slot="gap" data-variant={variant} data-side={side} />
			<Box data-component="sidebar" data-slot="container" data-variant={variant} data-side={side} {...boxProps}>
				<div data-component="sidebar" data-slot="inner">
					{children}
				</div>
			</Box>
		</div>
	);
}
