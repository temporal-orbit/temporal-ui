import { useSidebar } from "./SidebarProvider";

export interface SidebarRailProps extends React.ComponentProps<"button"> {}

export function SidebarRail(props: SidebarRailProps) {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			{...props}
			type="button"
			data-component="sidebar"
			data-slot="rail"
			aria-label="Toggle sidebar"
			title="Toggle sidebar"
			onClick={toggleSidebar}
		/>
	);
}
