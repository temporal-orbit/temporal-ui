import type { BaseComponent } from "../base";

export const SIDEBAR_STORAGE_KEY = "temporal-sidebar-state";
export const SIDEBAR_KEYBOARD_SHORTCUT = "k";

export interface SidebarContextProps {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
}

export interface SidebarProviderProps<T> extends BaseComponent<T> {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}

export interface SidebarProps<T> extends BaseComponent<T> {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "icon" | "offcanvas" | "none";
}

export interface SidebarMenuButtonProps {
	isActive?: boolean;
	variant?: "default" | "outline";
	size?: "default" | "sm" | "lg";
	/** When true, collapsed icon mode removes padding so slot content (e.g. avatars) can fill the 32×32 area. */
	flush?: boolean;
}

export interface SidebarMenuLinkProps {
	isActive?: boolean;
	/** When true, collapsed icon mode removes padding so slot content (e.g. avatars) can fill the 32×32 area. */
	flush?: boolean;
}

export interface SidebarMenuSubButtonProps {
	isActive?: boolean;
	size?: "md" | "sm";
}
