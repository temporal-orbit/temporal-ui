// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Stack } from "../stack";
import { TextInput } from "../text-input";
import { Popover, type PopoverProps } from "./Popover";

const meta = {
	title: "Solid/Popover",
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
		trigger: (props: Record<string, unknown>) => <SampleTrigger {...props} />,
		p: 3,
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};

export const WithTitle: Story = {
	args: {
		...Default.args,
		title: "Enter your details to continue",
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};

export const WithTitleAndDescription: Story = {
	args: {
		...Default.args,
		title: "Settings",
		description: "Configure your preferences below",
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};

export const PositionTop: Story = {
	args: {
		...Default.args,
		title: "Top Positioned",
		position: {
			placement: "top",
		},
	},
	render: (props: PopoverProps) => (
		<div class="p-48 flex items-center justify-center">
			<Popover {...props}>
				<SampleForm />
			</Popover>
		</div>
	),
};

export const PositionRight: Story = {
	args: {
		...Default.args,
		title: "Right Positioned",
		position: {
			placement: "right",
		},
	},
	render: (props: PopoverProps) => (
		<div class="p-32 flex items-center justify-center">
			<Popover {...props}>
				<SampleForm />
			</Popover>
		</div>
	),
};

export const PositionLeft: Story = {
	args: {
		...Default.args,
		title: "Left Positioned",
		position: {
			placement: "left",
		},
	},
	render: (props: PopoverProps) => (
		<div class="p-32 flex items-center justify-center">
			<Popover {...props}>
				<SampleForm />
			</Popover>
		</div>
	),
};

export const Modal: Story = {
	args: {
		...Default.args,
		title: "Modal Popover",
		modal: true,
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};

export const NoAutoFocus: Story = {
	args: {
		...Default.args,
		title: "No Auto Focus",
		autoFocus: false,
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};

export const NoEscapeClose: Story = {
	args: {
		...Default.args,
		title: "No Escape Close",
		closeOnEscape: false,
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};

export const NoOutsideClose: Story = {
	args: {
		...Default.args,
		title: "No Outside Close",
		closeOnInteractOutside: false,
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};

export const DefaultOpen: Story = {
	args: {
		...Default.args,
		title: "Default Open",
		defaultOpen: true,
	},
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
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
	render: (props: PopoverProps) => (
		<Popover {...props}>
			<SampleForm />
		</Popover>
	),
};
