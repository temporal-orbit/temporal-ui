import { Collapsible } from "@ark-ui/solid";
import { ChevronRight, type LucideProps } from "lucide-solid";
import type { Component } from "solid-js";
import { For } from "solid-js";
import { SidebarGroup, SidebarGroupLabel } from "../SidebarComponent";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "../SidebarMenu";

export function NavMain(props: {
	items: {
		title: string;
		url: string;
		icon?: Component<LucideProps>;
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
				<For each={props.items}>
					{(item) => (
						<Collapsible.Root defaultOpen={item.isActive} class="group/collapsible">
							<SidebarMenuItem>
								<Collapsible.Trigger
									asChild={(props) => (
										<SidebarMenuButton {...props()}>
											{item.icon && <item.icon />}
											<span>{item.title}</span>
											<ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
										</SidebarMenuButton>
									)}
								></Collapsible.Trigger>
								<Collapsible.Content>
									<SidebarMenuSub>
										<For each={item.items}>
											{(subItem) => (
												<SidebarMenuSubItem>
													<SidebarMenuSubButton>
														<a href={subItem.url}>
															<span>{subItem.title}</span>
														</a>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											)}
										</For>
									</SidebarMenuSub>
								</Collapsible.Content>
							</SidebarMenuItem>
						</Collapsible.Root>
					)}
				</For>
			</SidebarMenu>
		</SidebarGroup>
	);
}
