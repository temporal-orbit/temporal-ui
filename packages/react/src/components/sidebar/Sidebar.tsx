import type { SidebarProps as CoreSidebarProps } from "@temporal-ui/core/sidebar";
import { Box } from "../box";
import { useSidebar } from "./SidebarProvider";

export interface SidebarProps extends CoreSidebarProps<React.ReactNode>, React.ComponentProps<"div"> {}

export function Sidebar(props: SidebarProps) {
	const { state } = useSidebar();
	const { side = "left", collapsible = "offcanvas", variant = "sidebar", children, ...boxProps } = props;

	if (collapsible === "none") {
		return (
			<Box data-scope="sidebar" data-part="root" data-collapsible={collapsible} {...boxProps}>
				{children}
			</Box>
		);
	}

	return (
		<div
			data-scope="sidebar"
			data-part="root"
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			className={"group peer"}
		>
			{/* This is what handles the sidebar gap on desktop */}
			<div data-scope="sidebar" data-part="gap" data-variant={variant} data-side={side} />
			<Box data-scope="sidebar" data-part="container" data-variant={variant} data-side={side} {...boxProps}>
				<div data-scope="sidebar" data-part="inner">
					{children}
				</div>
			</Box>
		</div>
	);
}
