// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Stack } from "../stack";
import { Menu } from "./Menu";
import { MenuCheckboxItem } from "./MenuCheckboxItem";
import { MenuItem } from "./MenuItem";
import { MenuItemGroup } from "./MenuItemGroup";
import { MenuItemSeparator } from "./MenuItemSeparator";
import { MenuRadioItem } from "./MenuRadioItem";
import { MenuRadioItemGroup } from "./MenuRadioItemGroup";
import {
	CreditCard,
	LogOut,
	Settings,
	UserIcon,
	UserPlus,
	UsersIcon,
	ChevronRight,
} from "lucide-react";
import { MenuSub } from "./MenuSub";
import { MenuSubContent } from "./MenuSubContent";
import { MenuSubTrigger } from "./MenuSubTrigger";

const meta = {
	title: "React/Menu",
	component: Menu,
	tags: ["autodocs"],
	args: {
		className: "min-w-32",
		onSelect: fn(),
	},
	argTypes: {
		position: {
			control: "object",
		},
		closeOnSelect: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

function SampleTrigger(props: Record<string, unknown>) {
	return (
		<Button variant="outline" {...props}>
			Open Menu
		</Button>
	);
}

function SampleMenuItems() {
	return (
		<>
			<MenuItem value="new">New File</MenuItem>
			<MenuItem value="open">Open File</MenuItem>
			<MenuItem value="save">Save</MenuItem>
			<MenuItemSeparator />
			<MenuItem value="exit">Exit</MenuItem>
		</>
	);
}

function SampleComplexMenuItems() {
	return (
		<>
			<MenuItemGroup label="File">
				<MenuItem value="new">New File</MenuItem>
				<MenuItem value="open">Open File</MenuItem>
				<MenuItem value="save">Save</MenuItem>
				<MenuItem value="save-as">Save As...</MenuItem>
			</MenuItemGroup>
			<MenuItemSeparator />
			<MenuItemGroup label="Edit">
				<MenuItem value="undo">Undo</MenuItem>
				<MenuItem value="redo">Redo</MenuItem>
				<MenuItem value="cut">Cut</MenuItem>
				<MenuItem value="copy">Copy</MenuItem>
				<MenuItem value="paste">Paste</MenuItem>
			</MenuItemGroup>
			<MenuItemSeparator />
			<MenuItem value="settings">Settings</MenuItem>
			<MenuItem value="about">About</MenuItem>
		</>
	);
}

function SampleFormMenuItems() {
	return (
		<Stack gap={0}>
			<MenuItem value="profile">
				<UserIcon />
				My Profile
			</MenuItem>
			<MenuItem value="settings">
				<Settings />
				Settings
			</MenuItem>
			<MenuItem value="billing">
				<CreditCard />
				Billing
			</MenuItem>
			<MenuItemSeparator />
			<MenuItem value="team">
				<UsersIcon />
				Team
			</MenuItem>
			<MenuItem value="invite">
				<UserPlus />
				Invite users
			</MenuItem>
			<MenuItemSeparator />
			<MenuItem value="logout">
				<LogOut />
				Log out
			</MenuItem>
		</Stack>
	);
}

function SampleCheckboxMenuItems() {
	return (
		<>
			<MenuItemGroup label="View Options">
				<MenuCheckboxItem value="sidebar" checked={true} onCheckedChange={() => fn()}>
					Show Sidebar
				</MenuCheckboxItem>
				<MenuCheckboxItem value="toolbar" checked={false} onCheckedChange={() => fn()}>
					Show Toolbar
				</MenuCheckboxItem>
				<MenuCheckboxItem value="statusbar" checked={true} onCheckedChange={() => fn()}>
					Show Status Bar
				</MenuCheckboxItem>
				<MenuCheckboxItem value="minimap" checked={false} onCheckedChange={() => fn()}>
					Show Minimap
				</MenuCheckboxItem>
			</MenuItemGroup>
			<MenuItemSeparator />
			<MenuItemGroup label="Editor Options">
				<MenuCheckboxItem value="wordwrap" checked={false} onCheckedChange={() => fn()}>
					Word Wrap
				</MenuCheckboxItem>
				<MenuCheckboxItem value="linenumbers" checked={true} onCheckedChange={() => fn()}>
					Line Numbers
				</MenuCheckboxItem>
				<MenuCheckboxItem value="autocomplete" checked={true} onCheckedChange={() => fn()}>
					Auto Complete
				</MenuCheckboxItem>
			</MenuItemGroup>
		</>
	);
}

function SampleRadioMenuItems() {
	return (
		<>
			<MenuRadioItemGroup label="Theme" value="light" onValueChange={() => fn()}>
				<MenuRadioItem value="light">Light Theme</MenuRadioItem>
				<MenuRadioItem value="dark">Dark Theme</MenuRadioItem>
				<MenuRadioItem value="auto">Auto</MenuRadioItem>
			</MenuRadioItemGroup>
			<MenuItemSeparator />
			<MenuRadioItemGroup label="Font Size" value="medium" onValueChange={() => fn()}>
				<MenuRadioItem value="small">Small</MenuRadioItem>
				<MenuRadioItem value="medium">Medium</MenuRadioItem>
				<MenuRadioItem value="large">Large</MenuRadioItem>
				<MenuRadioItem value="xlarge">Extra Large</MenuRadioItem>
			</MenuRadioItemGroup>
		</>
	);
}

function SampleMixedMenuItems() {
	return (
		<>
			<MenuItem value="new">New File</MenuItem>
			<MenuItem value="open">Open File</MenuItem>
			<MenuItemSeparator />
			<MenuItemGroup label="View">
				<MenuCheckboxItem value="sidebar" checked={true} onCheckedChange={fn()}>
					Show Sidebar
				</MenuCheckboxItem>
				<MenuCheckboxItem value="minimap" checked={false} onCheckedChange={fn()}>
					Show Minimap
				</MenuCheckboxItem>
			</MenuItemGroup>
			<MenuItemSeparator />
			<MenuRadioItemGroup label="Theme" value="dark" onValueChange={() => fn()}>
				<MenuRadioItem value="light">Light</MenuRadioItem>
				<MenuRadioItem value="dark">Dark</MenuRadioItem>
			</MenuRadioItemGroup>
			<MenuItemSeparator />
			<MenuItem value="settings">Settings</MenuItem>
		</>
	);
}

export const Default: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: <SampleMenuItems />,
	},
};

export const WithGroups: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: <SampleComplexMenuItems />,
	},
};

export const UserMenu: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: <SampleFormMenuItems />,
	},
};

export const PositionTop: Story = {
	args: {
		...Default.args,
		position: {
			placement: "top",
		},
	},
	render: (args) => (
		<Stack center h="50vh">
			<Menu {...args} />
		</Stack>
	),
};

export const PositionTopStart: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "top-start",
		},
	},
};

export const PositionTopEnd: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "top-end",
		},
	},
};

export const PositionRight: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "right",
		},
	},
};

export const PositionRightStart: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "right-start",
		},
	},
};

export const PositionRightEnd: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "right-end",
		},
	},
};

export const PositionBottom: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "bottom",
		},
	},
};

export const PositionBottomStart: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "bottom-start",
		},
	},
};

export const PositionBottomEnd: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "bottom-end",
		},
	},
};

export const PositionLeft: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "left",
		},
	},
};

export const PositionLeftStart: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "left-start",
		},
	},
};

export const PositionLeftEnd: Story = {
	...PositionTop,
	args: {
		...Default.args,
		position: {
			placement: "left-end",
		},
	},
};

export const NoAutoClose: Story = {
	args: {
		...Default.args,
		closeOnSelect: false,
	},
};

export const WithOffset: Story = {
	args: {
		...Default.args,
		position: {
			placement: "bottom-start",
			offset: {
				mainAxis: 10,
				crossAxis: 5,
			},
		},
	},
};

export const SingleItems: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: (
			<>
				<MenuItem value="action1">Action 1</MenuItem>
				<MenuItem value="action2">Action 2</MenuItem>
				<MenuItem value="action3">Action 3</MenuItem>
			</>
		),
	},
};

export const WithSeparators: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: (
			<>
				<MenuItem value="first">First Item</MenuItem>
				<MenuItem value="second">Second Item</MenuItem>
				<MenuItemSeparator />
				<MenuItem value="third">Third Item</MenuItem>
				<MenuItem value="fourth">Fourth Item</MenuItem>
				<MenuItemSeparator />
				<MenuItem value="fifth">Fifth Item</MenuItem>
			</>
		),
	},
};

export const MultipleGroups: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: (
			<>
				<MenuItemGroup label="Documents">
					<MenuItem value="recent">Recent Files</MenuItem>
					<MenuItem value="templates">Templates</MenuItem>
				</MenuItemGroup>
				<MenuItemSeparator />
				<MenuItemGroup label="View">
					<MenuItem value="zoom-in">Zoom In</MenuItem>
					<MenuItem value="zoom-out">Zoom Out</MenuItem>
					<MenuItem value="fullscreen">Full Screen</MenuItem>
				</MenuItemGroup>
				<MenuItemSeparator />
				<MenuItemGroup label="Help">
					<MenuItem value="docs">Documentation</MenuItem>
					<MenuItem value="support">Support</MenuItem>
					<MenuItem value="shortcuts">Keyboard Shortcuts</MenuItem>
				</MenuItemGroup>
			</>
		),
	},
};

export const WithCheckboxItems: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: <SampleCheckboxMenuItems />,
	},
};

export const WithRadioItems: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: <SampleRadioMenuItems />,
	},
};

export const MixedItemTypes: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: <SampleMixedMenuItems />,
	},
};

export const NestedSubmenus: Story = {
	args: {
		trigger: <SampleTrigger />,
		onSelect: fn(),
		children: (
			<>
				<MenuItem value="profile">
					<UserIcon />
					My Profile
				</MenuItem>
				<MenuSub>
					<MenuSubTrigger>
						Invite member
						<ChevronRight aria-hidden />
					</MenuSubTrigger>
					<MenuSubContent>
						<MenuItem value="invite-email">By email</MenuItem>
						<MenuItem value="invite-link">Share link</MenuItem>
					</MenuSubContent>
				</MenuSub>
				<MenuItem value="settings">
					<Settings />
					Settings
				</MenuItem>
				<MenuItemSeparator />
				<MenuItem value="logout">
					<LogOut />
					Log out
				</MenuItem>
			</>
		),
	},
};

export const CheckboxOnly: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: (
			<>
				<MenuCheckboxItem value="option1" checked={true} onCheckedChange={fn()}>
					Option 1
				</MenuCheckboxItem>
				<MenuCheckboxItem value="option2" checked={false} onCheckedChange={fn()}>
					Option 2
				</MenuCheckboxItem>
				<MenuCheckboxItem value="option3" checked={true} onCheckedChange={fn()}>
					Option 3
				</MenuCheckboxItem>
				<MenuCheckboxItem value="option4" checked={false} onCheckedChange={fn()}>
					Option 4
				</MenuCheckboxItem>
			</>
		),
	},
};

export const RadioOnly: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: (
			<MenuRadioItemGroup value="option1" onValueChange={fn()}>
				<MenuRadioItem value="option1">Option 1</MenuRadioItem>
				<MenuRadioItem value="option2">Option 2</MenuRadioItem>
				<MenuRadioItem value="option3">Option 3</MenuRadioItem>
				<MenuRadioItem value="option4">Option 4</MenuRadioItem>
			</MenuRadioItemGroup>
		),
	},
};
