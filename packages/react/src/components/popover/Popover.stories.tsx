// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Stack } from "../stack";
import { TextInput } from "../text-input";
import { Popover } from "./Popover";

const meta = {
	title: "React/Popover",
	component: Popover,
	tags: ["autodocs"],
	args: { onOpenChange: fn() },
	argTypes: {
		position: {
			control: "object",
		},
		modal: {
			control: "boolean",
		},
		autoFocus: {
			control: "boolean",
		},
		closeOnEscape: {
			control: "boolean",
		},
		closeOnInteractOutside: {
			control: "boolean",
		},
		defaultOpen: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

function SampleTrigger(props: Record<string, unknown>) {
	return <Button {...props}>Open Popover</Button>;
}

function SampleForm() {
	return (
		<Stack gap={3}>
			<TextInput label="Email" placeholder="jdutton@example.com" />
			<TextInput label="Password" type="password" placeholder="Enter your password" />
		</Stack>
	);
}

export const Default: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: <SampleForm />,
		p: 3,
	},
};

export const WithTitle: Story = {
	args: {
		...Default.args,
		title: "Enter your details to continue",
	},
};

export const WithTitleAndDescription: Story = {
	args: {
		...Default.args,
		title: "Settings",
		description: "Configure your preferences below",
	},
};

export const PositionTop: Story = {
	args: {
		...Default.args,
		title: "Top Positioned",
		position: {
			placement: "top",
		},
	},
};

export const PositionRight: Story = {
	args: {
		...Default.args,
		title: "Right Positioned",
		position: {
			placement: "right",
		},
	},
};

export const PositionLeft: Story = {
	args: {
		...Default.args,
		title: "Left Positioned",
		position: {
			placement: "left",
		},
	},
};

export const Modal: Story = {
	args: {
		...Default.args,
		title: "Modal Popover",
		modal: true,
	},
};

export const NoAutoFocus: Story = {
	args: {
		...Default.args,
		title: "No Auto Focus",
		autoFocus: false,
	},
};

export const NoEscapeClose: Story = {
	args: {
		...Default.args,
		title: "No Escape Close",
		closeOnEscape: false,
	},
};

export const NoOutsideClose: Story = {
	args: {
		...Default.args,
		title: "No Outside Close",
		closeOnInteractOutside: false,
	},
};

export const DefaultOpen: Story = {
	args: {
		...Default.args,
		title: "Default Open",
		defaultOpen: true,
	},
};

export const WithOffset: Story = {
	args: {
		...Default.args,
		title: "Offset Popover",
		position: {
			placement: "bottom",
			offset: {
				mainAxis: 20,
				crossAxis: 10,
			},
		},
	},
};
