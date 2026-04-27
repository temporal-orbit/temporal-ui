import { TextInput, type TextInputProps } from "../text-input";

type SidebarComponentType =
	| "header"
	| "content"
	| "footer"
	| "group"
	| "group-content"
	| "group-label"
	| "item"
	| "separator";

export interface SidebarHeaderProps extends React.ComponentProps<"header"> {}

export function SidebarHeader(props: SidebarHeaderProps) {
	return <header {...props} data-component="sidebar" data-slot="header" />;
}

export interface SidebarFooterProps extends React.ComponentProps<"footer"> {}

export function SidebarFooter(props: SidebarFooterProps) {
	return <footer {...props} data-component="sidebar" data-slot="footer" />;
}

export interface SidebarContentProps extends React.ComponentProps<"div"> {}

export function SidebarContent(props: SidebarContentProps) {
	return SidebarComponent({ type: "content", ...props });
}

export interface SidebarGroupProps extends React.ComponentProps<"div"> {}

export function SidebarGroup(props: SidebarGroupProps) {
	return SidebarComponent({ type: "group", ...props });
}

export interface SidebarGroupContentProps extends React.ComponentProps<"div"> {}

export function SidebarGroupContent(props: SidebarGroupContentProps) {
	return SidebarComponent({ type: "group-content", ...props });
}

export interface SidebarGroupLabelProps extends React.ComponentProps<"div"> {}

export function SidebarGroupLabel(props: SidebarGroupLabelProps) {
	return SidebarComponent({ type: "group-label", ...props });
}

export interface SidebarSeparatorProps extends React.ComponentProps<"div"> {}

export function SidebarSeparator(props: SidebarSeparatorProps) {
	return SidebarComponent({ type: "separator", ...props });
}

function SidebarComponent(props: React.ComponentProps<"div"> & { type: SidebarComponentType }) {
	return <div {...props} data-component="sidebar" data-slot={props.type} />;
}

export interface SidebarGroupActionProps extends React.ComponentProps<"button"> {}

export function SidebarGroupAction(props: SidebarGroupActionProps) {
	return <button {...props} data-component="sidebar" data-slot="group-action" />;
}

export interface SidebarInputProps extends TextInputProps {}

export function SidebarInput(props: SidebarInputProps) {
	return <TextInput {...props} data-component="sidebar" data-slot="input" />;
}

export interface SidebarInsetProps extends React.ComponentProps<"main"> {}

export function SidebarInset(props: SidebarInsetProps) {
	return <main {...props} data-component="sidebar" data-slot="inset" />;
}
