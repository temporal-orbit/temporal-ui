import { cx } from "@temporal-ui/core/utils/cx";
import { PanelLeft } from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import { Button } from "../button";

export interface SidebarTriggerProps extends React.ComponentProps<"button"> {}

export function SidebarTrigger(props: SidebarTriggerProps) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			icon
			variant="ghost"
			data-component="sidebar"
			data-slot="trigger"
			aria-label="Toggle sidebar"
			title="Toggle sidebar"
			className={cx("size-7", props.className)}
			onClick={(event) => {
				props.onClick?.(event);
				toggleSidebar();
			}}
		>
			<PanelLeft />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}
