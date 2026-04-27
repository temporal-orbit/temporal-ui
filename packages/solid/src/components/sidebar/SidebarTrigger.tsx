import type { HTMLProps } from "@ark-ui/solid";
import { cx } from "@temporal-ui/core/utils/cx";
import { PanelLeft } from "lucide-solid";
import { splitProps } from "solid-js";
import { Button } from "../button";
import { useSidebar } from "./SidebarProvider";

export interface SidebarTriggerProps extends HTMLProps<"button"> {}

export function SidebarTrigger(_props: SidebarTriggerProps) {
	const { toggleSidebar } = useSidebar();
	const [props, elementProps] = splitProps(_props, ["onClick", "class"]);

	return (
		<Button
			icon
			variant="ghost"
			data-component="sidebar"
			data-slot="trigger"
			aria-label="Toggle sidebar"
			title="Toggle sidebar"
			class={cx("size-7", props.class)}
			onClick={(event) => {
				if (typeof props.onClick === "function") {
					props.onClick(event);
				}
				toggleSidebar();
			}}
			{...elementProps}
		>
			<PanelLeft />
			<span class="sr-only">Toggle Sidebar</span>
		</Button>
	);
}
