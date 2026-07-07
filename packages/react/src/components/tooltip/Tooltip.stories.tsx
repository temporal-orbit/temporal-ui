// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Stack } from "../stack";
import { Tooltip } from "./Tooltip";
import { TooltipProvider } from "./TooltipProvider";

const meta = {
	title: "React/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	args: { onOpenChange: fn() },
	argTypes: {
		positioning: {
			control: "object",
		},
		openDelay: {
			control: "number",
		},
		closeDelay: {
			control: "number",
		},
		disabled: {
			control: "boolean",
		},
		disabledTrigger: {
			control: "boolean",
		},
		interactive: {
			control: "boolean",
		},
		defaultOpen: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

function SampleTrigger(props: Record<string, unknown>) {
	return <Button {...props}>Hover me</Button>;
}

export const Default: Story = {
	args: {
		trigger: <SampleTrigger />,
		children: "Tooltip content",
	},
};

export const PositionTop: Story = {
	args: {
		...Default.args,
		children: "Top positioned tooltip",
		positioning: {
			placement: "top",
		},
	},
};

export const PositionRight: Story = {
	args: {
		...Default.args,
		children: "Right positioned tooltip",
		positioning: {
			placement: "right",
		},
	},
};

export const PositionLeft: Story = {
	args: {
		...Default.args,
		children: "Left positioned tooltip",
		positioning: {
			placement: "left",
		},
	},
};

export const PositionBottom: Story = {
	args: {
		...Default.args,
		children: "Bottom positioned tooltip",
		positioning: {
			placement: "bottom",
		},
	},
};

export const Interactive: Story = {
	args: {
		...Default.args,
		interactive: true,
		children: (
			<div>
				<p>Interactive tooltip - hover over this content</p>
				<Button size="sm">Action</Button>
			</div>
		),
	},
};

export const CustomDelays: Story = {
	args: {
		...Default.args,
		openDelay: 200,
		closeDelay: 300,
		children: "Opens after 200ms, closes after 300ms",
	},
};

export const DefaultOpen: Story = {
	args: {
		...Default.args,
		defaultOpen: true,
		children: "Initially visible tooltip",
	},
};

export const WithOffset: Story = {
	args: {
		...Default.args,
		children: "Tooltip with offset",
		positioning: {
			placement: "bottom",
			offset: {
				mainAxis: 12,
				crossAxis: 8,
			},
		},
	},
};

export const MultipleTooltips: Story = {
	render: () => (
		<Stack gap={4} row>
			<Tooltip trigger={<Button>First</Button>}>First tooltip</Tooltip>
			<Tooltip trigger={<Button>Second</Button>}>Second tooltip</Tooltip>
			<Tooltip trigger={<Button>Third</Button>}>Third tooltip</Tooltip>
		</Stack>
	),
};

export const WithProvider: Story = {
	render: () => (
		<TooltipProvider openDelay={200} closeDelay={100} interactive>
			<Stack gap={4} row>
				<Tooltip trigger={<Button>First</Button>}>Shared provider defaults</Tooltip>
				<Tooltip trigger={<Button>Second</Button>}>Also uses provider config</Tooltip>
				<Tooltip trigger={<Button>Instant</Button>} openDelay={0}>
					Instance override
				</Tooltip>
			</Stack>
		</TooltipProvider>
	),
};

export const DisabledTrigger: Story = {
	args: {
		trigger: <Button disabled>Deactivate</Button>,
		disabledTrigger: true,
		children: "You cannot deactivate your own account",
		openDelay: 0,
	},
	parameters: {
		docs: {
			description: {
				story:
					"Use `disabledTrigger` when the tooltip trigger is a disabled control. The tooltip wraps the trigger in a focusable element so hover and keyboard focus still open the tooltip.",
			},
		},
	},
};

export const DisabledButtonTooltip: Story = {
	render: () => (
		<Button disabled disabledTooltip="You cannot deactivate your own account">
			Deactivate
		</Button>
	),
	parameters: {
		docs: {
			description: {
				story:
					"Use `disabledTooltip` on `Button` for the common case of explaining why a disabled action is unavailable.",
			},
		},
	},
};
