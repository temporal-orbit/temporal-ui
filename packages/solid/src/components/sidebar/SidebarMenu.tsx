import type { HTMLProps } from "@ark-ui/solid";
import { ark } from "@ark-ui/solid/factory";
import type {
	SidebarMenuButtonProps as CoreSidebarMenuButtonProps,
	SidebarMenuLinkProps as CoreSidebarMenuLinkProps,
	SidebarMenuSubButtonProps as CoreSidebarMenuSubButtonProps,
} from "@temporal-ui/core/sidebar";
import { cx } from "@temporal-ui/core/utils/cx";
import { mergeProps, splitProps, type JSX, type ParentProps } from "solid-js";

export interface SidebarMenuProps extends HTMLProps<"ul"> {}

export function SidebarMenu(props: SidebarMenuProps) {
	return <ul {...props} data-component="sidebar" data-slot="menu" />;
}

export interface SidebarMenuItemProps extends HTMLProps<"li"> {}

export function SidebarMenuItem(_props: SidebarMenuItemProps) {
	const [props, elementProps] = splitProps(_props, ["class"]);

	return (
		<li
			{...elementProps}
			data-component="sidebar"
			data-slot="menu-item"
			class={cx("group/menu-item", props.class)}
		/>
	);
}

export interface SidebarMenuButtonProps extends HTMLProps<"button">, CoreSidebarMenuButtonProps {}

export function SidebarMenuButton(_props: SidebarMenuButtonProps) {
	const [props, elementProps] = splitProps(
		mergeProps({ variant: "default", size: "default" }, _props),
		["variant", "size", "isActive"],
	);

	return (
		<button
			{...elementProps}
			data-component="sidebar"
			data-slot="menu-button"
			data-variant={props.variant}
			data-size={props.size}
			data-active={props.isActive}
		/>
	);
}

export interface SidebarMenuLinkProps extends HTMLProps<"a">, CoreSidebarMenuLinkProps {
	// biome-ignore lint/suspicious/noExplicitAny: temporary solution
	component?: (props: ParentProps<any>) => JSX.Element;
}

export function SidebarMenuLink(_props: SidebarMenuLinkProps) {
	const [props, elementProps] = splitProps(_props, ["isActive", "component"]);

	return (
		<ark.a
			{...elementProps}
			data-component="sidebar"
			data-slot="menu-link"
			data-active={props.isActive}
			asChild={props.component}
		/>
	);
}

export interface SidebarMenuActionProps extends HTMLProps<"button"> {
	showOnHover?: boolean;
}

export function SidebarMenuAction(_props: SidebarMenuActionProps) {
	const [props, elementProps] = splitProps(_props, ["showOnHover"]);

	return (
		<button
			{...elementProps}
			data-component="sidebar"
			data-slot="menu-action"
			data-show-on-hover={props.showOnHover}
		/>
	);
}

export interface SidebarMenuBadgeProps extends HTMLProps<"div"> {}

export function SidebarMenuBadge(props: SidebarMenuBadgeProps) {
	return <div {...props} data-component="sidebar" data-slot="menu-badge" />;
}

export interface SidebarMenuSubProps extends HTMLProps<"ul"> {}

export function SidebarMenuSub(props: SidebarMenuSubProps) {
	return <ul {...props} data-component="sidebar" data-slot="menu-sub" />;
}

export interface SidebarMenuSubItemProps extends HTMLProps<"li"> {}

export function SidebarMenuSubItem(_props: SidebarMenuSubItemProps) {
	const [props, elementProps] = splitProps(_props, ["class"]);

	return (
		<li
			{...elementProps}
			data-component="sidebar"
			data-slot="menu-sub-item"
			class={cx("group/menu-sub-item", props.class)}
		/>
	);
}

export interface SidebarMenuSubButtonProps extends HTMLProps<"a">, CoreSidebarMenuSubButtonProps {}

export function SidebarMenuSubButton(_props: SidebarMenuSubButtonProps) {
	const [props, elementProps] = splitProps(mergeProps({ size: "md" }, _props), [
		"size",
		"isActive",
	]);

	return (
		<a
			{...elementProps}
			data-component="sidebar"
			data-slot="menu-sub-button"
			data-size={props.size}
			data-active={props.isActive}
		/>
	);
}
