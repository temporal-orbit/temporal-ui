import { MenuItem, MenuItemGroup, MenuSeparator } from "@ark-ui/solid";
import { ChevronsUpDown, Plus, type LucideProps } from "lucide-solid";
import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import { Menu } from "../../menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../SidebarMenu";

export function TeamSwitcher(props: {
	teams: {
		name: string;
		logo: Component<LucideProps>;
		plan: string;
	}[];
}) {
	const [activeTeam, setActiveTeam] = createSignal(props.teams[0]);

	const currentTeam = activeTeam();
	if (!currentTeam) {
		return null;
	}

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
							<div class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<currentTeam.logo class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">{currentTeam.name}</span>
								<span class="truncate text-xs">{currentTeam.plan}</span>
							</div>
							<ChevronsUpDown class="ml-auto" />
						</SidebarMenuButton>
					)}
				>
					<MenuItemGroup>
						<For each={props.teams}>
							{(team) => (
								<MenuItem value={team.name} onClick={() => setActiveTeam(team)} class="gap-2 p-2">
									<div class="flex size-6 items-center justify-center rounded-md border">
										<team.logo class="size-3.5 shrink-0" />
									</div>
									{team.name}
								</MenuItem>
							)}
						</For>
						<MenuSeparator />
						<MenuItem value="add-team" class="gap-2 p-2">
							<div class="flex size-6 items-center justify-center rounded-md border bg-transparent">
								<Plus class="size-4" />
							</div>
							<div class="text-muted-foreground font-medium">Add team</div>
						</MenuItem>
					</MenuItemGroup>
				</Menu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
