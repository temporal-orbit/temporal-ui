import {
	SIDEBAR_KEYBOARD_SHORTCUT,
	SIDEBAR_STORAGE_KEY,
	type SidebarProviderProps as CoreSidebarProviderProps,
	type SidebarContextProps,
} from "@temporal-ui/core/sidebar";
import { cx } from "@temporal-ui/core/utils/cx";
import React from "react";
import { useIsMobile } from "../../hooks/is-mobile";
import { Box } from "../box";

export interface SidebarProviderProps
	extends CoreSidebarProviderProps<React.ReactNode>, React.ComponentProps<"div"> {}

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function SidebarProvider(props: SidebarProviderProps) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React.useState(false);
	const {
		defaultOpen = true,
		open: openProp,
		onOpenChange: setOpenProp,
		children,
		style,
		className,
		...boxProps
	} = props;

	// This is the internal state of the sidebar.
	// We use openProp and setOpenProp for control from outside the component.
	const [_open, _setOpen] = React.useState(defaultOpen);
	const open = openProp ?? _open;
	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value;
			if (setOpenProp) {
				setOpenProp(openState);
			} else {
				_setOpen(openState);
			}

			localStorage.setItem(SIDEBAR_STORAGE_KEY, openState.toString());
		},
		[setOpenProp, open],
	);

	// Helper to toggle the sidebar.
	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	}, [isMobile, setOpen]);

	// Adds a keyboard shortcut to toggle the sidebar.
	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);

	// We add a state so that we can do data-state="expanded" or "collapsed".
	// This makes it easier to style the sidebar with Tailwind classes.
	const state = open ? "expanded" : "collapsed";

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, toggleSidebar],
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<Box
				{...boxProps}
				data-component="sidebar"
				data-slot="wrapper"
				className={cx("group/sidebar-wrapper", className)}
				style={style}
			>
				{children}
			</Box>
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}

	return context;
}
