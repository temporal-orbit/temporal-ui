import { Folder, Forward, MoreHorizontal, Trash2, type LucideProps } from "lucide-solid";
import type { Component } from "solid-js";
import { For } from "solid-js";
import { Menu, MenuItem, MenuItemSeparator } from "../../menu";
import { SidebarGroup, SidebarGroupLabel } from "../SidebarComponent";
import {
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuLink,
	SidebarMenuItem,
} from "../SidebarMenu";

export function NavProjects(props: {
	projects: {
		name: string;
		url: string;
		icon: Component<LucideProps>;
	}[];
}) {
	return (
		<SidebarGroup class="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Projects</SidebarGroupLabel>
			<SidebarMenu>
				<For each={props.projects}>
					{(item) => (
						<SidebarMenuItem class="">
							<SidebarMenuLink href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</SidebarMenuLink>
							<Menu
								position={{
									placement: "right-start",
								}}
								trigger={(triggerProps) => (
									<SidebarMenuAction showOnHover {...triggerProps}>
										<MoreHorizontal />
										<span class="sr-only">More</span>
									</SidebarMenuAction>
								)}
								className="w-48 rounded-lg"
							>
								<MenuItem value="view">
									<Folder class="text-muted-foreground" />
									<span>View Project</span>
								</MenuItem>
								<MenuItem value="share">
									<Forward class="text-muted-foreground" />
									<span>Share Project</span>
								</MenuItem>
								<MenuItemSeparator />
								<MenuItem value="delete">
									<Trash2 class="text-muted-foreground" />
									<span>Delete Project</span>
								</MenuItem>
							</Menu>
						</SidebarMenuItem>
					)}
				</For>
				<SidebarMenuItem>
					<SidebarMenuButton class="text-sidebar-foreground/70">
						<MoreHorizontal class="text-sidebar-foreground/70" />
						<span>More</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
