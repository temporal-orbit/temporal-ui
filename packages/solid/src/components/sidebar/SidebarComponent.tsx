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
	return <header {...props} data-scope="sidebar" data-part="header" />;
}

export interface SidebarFooterProps extends HTMLProps<"footer"> {}

export function SidebarFooter(props: SidebarFooterProps) {
	return <footer {...props} data-scope="sidebar" data-part="footer" />;
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

	return <div {...elementProps} data-scope="sidebar" data-part={props.type} />;
}

export interface SidebarGroupActionProps extends HTMLProps<"button"> {}

export function SidebarGroupAction(props: SidebarGroupActionProps) {
	return <button {...props} data-scope="sidebar" data-part="group-action" />;
}

export interface SidebarInputProps extends TextInputProps {}

export function SidebarInput(props: SidebarInputProps) {
	return <TextInput {...props} data-scope="sidebar" data-part="input" />;
}

export interface SidebarInsetProps extends HTMLProps<"main"> {}

export function SidebarInset(props: SidebarInsetProps) {
	return <main {...props} data-scope="sidebar" data-part="inset" />;
}
