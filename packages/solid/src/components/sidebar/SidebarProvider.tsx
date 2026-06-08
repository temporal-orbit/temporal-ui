import type { HTMLProps } from "@ark-ui/solid";
import {
	SIDEBAR_KEYBOARD_SHORTCUT,
	SIDEBAR_STORAGE_KEY,
	type SidebarProviderProps as CoreSidebarProviderProps,
} from "@temporal-ui/core/sidebar";
import { cx } from "@temporal-ui/core/utils/cx";
import type { JSX } from "solid-js";
import {
	createContext,
	createEffect,
	createMemo,
	createSignal,
	splitProps,
	useContext,
} from "solid-js";
import { useIsMobile } from "../../hooks/is-mobile";
import { Box } from "../box";

export interface SidebarProviderProps
	extends CoreSidebarProviderProps<JSX.Element>, HTMLProps<"div"> {}

interface SolidSidebarContextProps {
	state: () => "expanded" | "collapsed";
	open: () => boolean;
	setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
	openMobile: () => boolean;
	setOpenMobile: (open: boolean | ((open: boolean) => boolean)) => void;
	isMobile: () => boolean;
	toggleSidebar: () => void;
}

const SidebarContext = createContext<SolidSidebarContextProps | null>(null);

export function SidebarProvider(_props: SidebarProviderProps) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = createSignal(false);
	const [props, boxProps] = splitProps(_props, [
		"defaultOpen",
		"open",
		"onOpenChange",
		"children",
		"style",
		"class",
		"className",
	]);

	const defaultOpen = () => props.defaultOpen ?? true;

	const [_open, _setOpen] = createSignal(defaultOpen());
	const open = createMemo(() => props.open ?? _open());

	const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
		const openState = typeof value === "function" ? value(open()) : value;
		if (props.onOpenChange) {
			props.onOpenChange(openState);
		} else {
			_setOpen(openState);
		}

		localStorage.setItem(SIDEBAR_STORAGE_KEY, openState.toString());
	};

	const toggleSidebar = () => {
		return isMobile() ? setOpenMobile((open) => !open) : setOpen((open) => !open);
	};

	createEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
				event.preventDefault();
				toggleSidebar();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	});

	const state = createMemo(() => (open() ? "expanded" : "collapsed"));

	const contextValue = {
		state,
		open,
		setOpen,
		isMobile,
		openMobile,
		setOpenMobile,
		toggleSidebar,
	};

	return (
		<SidebarContext.Provider value={contextValue}>
			<Box
				{...boxProps}
				data-component="sidebar"
				data-slot="wrapper"
				class={cx("group/sidebar-wrapper", props.className, props.class)}
				style={props.style}
			>
				{props.children}
			</Box>
		</SidebarContext.Provider>
	);
}

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}

	return context;
}
