import { MenuItem, MenuItemGroup } from "@ark-ui/solid";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-solid";
import { Avatar } from "../../avatar";
import { Menu, MenuItemSeparator } from "../../menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../SidebarMenu";

export function NavUser(props: {
	user: {
		name: string;
		email: string;
		avatar: string;
	};
}) {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<Menu
					trigger={(triggerProps) => (
						<SidebarMenuButton
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							{...triggerProps}
						>
							<Avatar class="h-8 w-8 rounded-lg" src={props.user.avatar} />
							<ChevronsUpDown class="ml-auto size-4" />
						</SidebarMenuButton>
					)}
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				>
					<MenuItemGroup class="p-0 font-normal">
						<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
							<Avatar class="h-8 w-8 rounded-lg" src={props.user.avatar} />
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">{props.user.name}</span>
								<span class="truncate text-xs">{props.user.email}</span>
							</div>
						</div>
					</MenuItemGroup>
					<MenuItemSeparator />
					<MenuItemGroup>
						<MenuItem value="upgrade">
							<Sparkles />
							Upgrade to Pro
						</MenuItem>
					</MenuItemGroup>
					<MenuItemSeparator />
					<MenuItemGroup>
						<MenuItem value="account">
							<BadgeCheck />
							Account
						</MenuItem>
						<MenuItem value="billing">
							<CreditCard />
							Billing
						</MenuItem>
						<MenuItem value="notifications">
							<Bell />
							Notifications
						</MenuItem>
					</MenuItemGroup>
					<MenuItemSeparator />
					<MenuItem value="logout">
						<LogOut />
						Log out
					</MenuItem>
				</Menu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
