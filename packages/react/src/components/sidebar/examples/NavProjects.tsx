import { Folder, Forward, MoreHorizontal, Trash2, type LucideIcon } from "lucide-react";
import { Menu, MenuItem, MenuItemSeparator } from "../../menu";
import { SidebarGroup, SidebarGroupLabel } from "../SidebarComponent";
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuLink, SidebarMenuItem } from "../SidebarMenu";

export function NavProjects({
	projects,
}: {
	projects: {
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}) {
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				{projects.map((item) => (
					<SidebarMenuItem key={item.name} className="">
						<SidebarMenuLink href={item.url}>
							<item.icon />
							<span>{item.name}</span>
						</SidebarMenuLink>
						<Menu
							position={{
								placement: "right-start",
							}}
							trigger={
								<SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</SidebarMenuAction>
							}
							className="w-48 rounded-lg"
						>
							<MenuItem value="view">
								<Folder className="text-muted-foreground" />
								<span>View Project</span>
							</MenuItem>
							<MenuItem value="share">
								<Forward className="text-muted-foreground" />
								<span>Share Project</span>
							</MenuItem>
							<MenuItemSeparator />
							<MenuItem value="delete">
								<Trash2 className="text-muted-foreground" />
								<span>Delete Project</span>
							</MenuItem>
						</Menu>
					</SidebarMenuItem>
				))}
				<SidebarMenuItem>
					<SidebarMenuButton className="text-sidebar-foreground/70">
						<MoreHorizontal className="text-sidebar-foreground/70" />
						<span>More</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
