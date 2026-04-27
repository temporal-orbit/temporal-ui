// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { BoldIcon } from "lucide-react";
import { fn } from "storybook/test";
import { Toggle, ToggleIndicator } from "./Toggle";

const meta = {
	title: "React/Toggle",
	component: Toggle,
	tags: ["autodocs"],
	args: { onPressedChange: fn() },
	argTypes: {
		pressed: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: <BoldIcon size={16} />,
	},
};

export const Pressed: Story = {
	args: {
		...Default.args,
		pressed: true,
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};

export const WithText: Story = {
	args: {
		children: "Bold",
	},
};

export const WithIndicator: Story = {
	render: () => (
		<Toggle>
			<ToggleIndicator fallback={<BoldIcon size={16} />}>
				<BoldIcon size={16} strokeWidth={3} />
			</ToggleIndicator>
		</Toggle>
	),
};

export const WithField: Story = {
	args: {
		...Default.args,
		label: "Bold",
		hint: "Toggles bold formatting for the selection.",
	},
};

export const WithFieldError: Story = {
	args: {
		...WithField.args,
		error: "Bold formatting is not available in this context.",
	},
};
