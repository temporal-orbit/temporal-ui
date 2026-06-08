import { Collapsible } from "@ark-ui/react";
import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { SidebarGroup, SidebarGroupLabel } from "../SidebarComponent";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "../SidebarMenu";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<SidebarGroup>
			<SidebarGroupLabel>Platform</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible.Root
						key={item.title}
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<Collapsible.Trigger asChild>
								<SidebarMenuButton>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</SidebarMenuButton>
							</Collapsible.Trigger>
							<Collapsible.Content>
								<SidebarMenuSub>
									{item.items?.map((subItem) => (
										<SidebarMenuSubItem key={subItem.title}>
											<SidebarMenuSubButton>
												<a href={subItem.url}>
													<span>{subItem.title}</span>
												</a>
											</SidebarMenuSubButton>
										</SidebarMenuSubItem>
									))}
								</SidebarMenuSub>
							</Collapsible.Content>
						</SidebarMenuItem>
					</Collapsible.Root>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
