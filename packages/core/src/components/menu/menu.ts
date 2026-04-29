import type { BaseComponent, Position } from "../base";

export interface MenuProps<T> extends BaseComponent<T> {
	onSelect?: (value: string) => void;
	position?: Position;
}

export interface MenuItemProps {
	className?: string;
	testId?: string;
}

export interface MenuCheckboxItemProps extends MenuItemProps {}

export interface MenuItemGroupProps extends MenuItemProps {
	label?: string;
}

export interface MenuItemSeparatorProps extends MenuItemProps {}
export interface MenuRadioItemProps extends MenuItemProps {}
export interface MenuRadioItemGroupProps extends MenuItemProps {
	label?: string;
	onValueChange?: (value: string) => void;
}

/** Nested submenu root (`Menu.Root` inside parent menu content). */
export interface MenuSubProps<T = unknown> extends BaseComponent<T> {
	position?: Position;
	onSelect?: (value: string) => void;
}

export interface MenuSubTriggerProps extends MenuItemProps {}

export interface MenuSubContentProps extends MenuItemProps {}
