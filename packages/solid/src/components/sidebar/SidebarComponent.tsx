import type { HTMLProps } from "@ark-ui/solid";
import { splitProps } from "solid-js";
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

export interface SidebarHeaderProps extends HTMLProps<"header"> {}

export function SidebarHeader(props: SidebarHeaderProps) {
	return <header {...props} data-component="sidebar" data-slot="header" />;
}

export interface SidebarFooterProps extends HTMLProps<"footer"> {}

export function SidebarFooter(props: SidebarFooterProps) {
	return <footer {...props} data-component="sidebar" data-slot="footer" />;
}

export interface SidebarContentProps extends HTMLProps<"div"> {}

export function SidebarContent(props: SidebarContentProps) {
	return SidebarComponent({ type: "content", ...props });
}

export interface SidebarGroupProps extends HTMLProps<"div"> {}

export function SidebarGroup(props: SidebarGroupProps) {
	return SidebarComponent({ type: "group", ...props });
}

export interface SidebarGroupContentProps extends HTMLProps<"div"> {}

export function SidebarGroupContent(props: SidebarGroupContentProps) {
	return SidebarComponent({ type: "group-content", ...props });
}

export interface SidebarGroupLabelProps extends HTMLProps<"div"> {}

export function SidebarGroupLabel(props: SidebarGroupLabelProps) {
	return SidebarComponent({ type: "group-label", ...props });
}

export interface SidebarSeparatorProps extends HTMLProps<"div"> {}

export function SidebarSeparator(props: SidebarSeparatorProps) {
	return SidebarComponent({ type: "separator", ...props });
}

function SidebarComponent(_props: HTMLProps<"div"> & { type: SidebarComponentType }) {
	const [props, elementProps] = splitProps(_props, ["type"]);

	return <div {...elementProps} data-component="sidebar" data-slot={props.type} />;
}

export interface SidebarGroupActionProps extends HTMLProps<"button"> {}

export function SidebarGroupAction(props: SidebarGroupActionProps) {
	return <button {...props} data-component="sidebar" data-slot="group-action" />;
}

export interface SidebarInputProps extends TextInputProps {}

export function SidebarInput(props: SidebarInputProps) {
	return <TextInput {...props} data-component="sidebar" data-slot="input" />;
}

export interface SidebarInsetProps extends HTMLProps<"main"> {}

export function SidebarInset(props: SidebarInsetProps) {
	return <main {...props} data-component="sidebar" data-slot="inset" />;
}
