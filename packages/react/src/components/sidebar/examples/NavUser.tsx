import { MenuItem, MenuSeparator } from "@ark-ui/react";
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react";
import { Avatar } from "../../avatar";
import { Menu, MenuItemGroup } from "../../menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../SidebarMenu";

export function NavUser({
	user,
}: {
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
					trigger={
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<Avatar className="h-8 w-8 rounded-lg" src={user.avatar} />
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					}
					className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
				>
					<MenuItemGroup className="p-0 font-normal">
						<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
							<Avatar className="h-8 w-8 rounded-lg" src={user.avatar} />
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
						</div>
					</MenuItemGroup>
					<MenuSeparator />
					<MenuItemGroup>
						<MenuItem value="upgrade">
							<Sparkles />
							Upgrade to Pro
						</MenuItem>
					</MenuItemGroup>
					<MenuSeparator />
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
					<MenuSeparator />
					<MenuItem value="logout">
						<LogOut />
						Log out
					</MenuItem>
				</Menu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
