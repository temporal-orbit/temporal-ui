import type {
	SidebarMenuButtonProps as CoreSidebarMenuButtonProps,
	SidebarMenuLinkProps as CoreSidebarMenuLinkProps,
	SidebarMenuSubButtonProps as CoreSidebarMenuSubButtonProps,
} from "@temporal-ui/core/sidebar";
import { cx } from "@temporal-ui/core/utils/cx";

export interface SidebarMenuProps extends React.ComponentProps<"ul"> {}

export function SidebarMenu(props: SidebarMenuProps) {
	return <ul {...props} data-component="sidebar" data-slot="menu" />;
}

export interface SidebarMenuItemProps extends React.ComponentProps<"li"> {}

export function SidebarMenuItem(props: SidebarMenuItemProps) {
	return (
		<li
			{...props}
			data-component="sidebar"
			data-slot="menu-item"
			className={cx("group/menu-item", props.className)}
		/>
	);
}

export type SidebarMenuButtonProps = React.ComponentProps<"button"> & CoreSidebarMenuButtonProps;

export function SidebarMenuButton(props: SidebarMenuButtonProps) {
	const { variant = "default", size = "default", isActive, flush, ...rest } = props;

	return (
		<button
			{...rest}
			data-component="sidebar"
			data-slot="menu-button"
			data-variant={variant}
			data-size={size}
			data-active={isActive}
			data-flush={flush || undefined}
		/>
	);
}

export type SidebarMenuLinkProps = React.ComponentProps<"a"> & CoreSidebarMenuLinkProps;

export function SidebarMenuLink(props: SidebarMenuLinkProps) {
	const { isActive, flush, ...rest } = props;

	return (
		<a
			{...rest}
			data-component="sidebar"
			data-slot="menu-link"
			data-active={isActive}
			data-flush={flush || undefined}
		/>
	);
}

export type SidebarMenuActionProps = React.ComponentProps<"button">;

export function SidebarMenuAction(props: SidebarMenuActionProps & { showOnHover?: boolean }) {
	return (
		<button
			{...props}
			data-component="sidebar"
			data-slot="menu-action"
			data-show-on-hover={props.showOnHover}
		/>
	);
}

export interface SidebarMenuBadgeProps extends React.ComponentProps<"div"> {}

export function SidebarMenuBadge(props: SidebarMenuBadgeProps) {
	return <div {...props} data-component="sidebar" data-slot="menu-badge" />;
}

export interface SidebarMenuSubProps extends React.ComponentProps<"ul"> {}

export function SidebarMenuSub(props: SidebarMenuSubProps) {
	return <ul {...props} data-component="sidebar" data-slot="menu-sub" />;
}

export interface SidebarMenuSubItemProps extends React.ComponentProps<"li"> {}

export function SidebarMenuSubItem(props: SidebarMenuSubItemProps) {
	return (
		<li
			{...props}
			data-component="sidebar"
			data-slot="menu-sub-item"
			className={cx("group/menu-sub-item", props.className)}
		/>
	);
}

export type SidebarMenuSubButtonProps = React.ComponentProps<"a"> & CoreSidebarMenuSubButtonProps;

export function SidebarMenuSubButton(props: SidebarMenuSubButtonProps) {
	const { size = "md", isActive, ...rest } = props;

	return (
		<a
			{...rest}
			data-component="sidebar"
			data-slot="menu-sub-button"
			data-size={size}
			data-active={isActive}
		/>
	);
}
