import type { HTMLProps } from "@ark-ui/solid";
import type { SidebarProps as CoreSidebarProps } from "@temporal-ui/core/sidebar";
import type { JSX } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { Box } from "../box";
import { useSidebar } from "./SidebarProvider";

export interface SidebarProps extends CoreSidebarProps<JSX.Element>, HTMLProps<"div"> {}

export function Sidebar(_props: SidebarProps) {
	const { state } = useSidebar();
	const [props, boxProps] = splitProps(
		mergeProps({ side: "left", collapsible: "offcanvas", variant: "sidebar" }, _props),
		["side", "collapsible", "variant", "children"],
	);

	if (props.collapsible === "none") {
		return (
			<Box data-scope="sidebar" data-part="root" data-collapsible={props.collapsible} {...boxProps}>
				{props.children}
			</Box>
		);
	}

	return (
		<div
			data-scope="sidebar"
			data-part="root"
			data-state={state()}
			data-collapsible={state() === "collapsed" ? props.collapsible : ""}
			data-variant={props.variant}
			data-side={props.side}
			class="group peer"
		>
			<div data-scope="sidebar" data-part="gap" data-variant={props.variant} data-side={props.side} />
			<Box data-scope="sidebar" data-part="container" data-variant={props.variant} data-side={props.side} {...boxProps}>
				<div data-scope="sidebar" data-part="inner">
					{props.children}
				</div>
			</Box>
		</div>
	);
}
