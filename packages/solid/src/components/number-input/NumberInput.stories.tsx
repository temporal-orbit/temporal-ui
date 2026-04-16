// noinspection JSUnusedGlobalSymbols

import { DollarSign } from "lucide-solid";
import { createSignal } from "solid-js";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { NumberInput, type NumberInputProps } from "./";

const meta = {
	title: "Solid/Number Input",
	component: NumberInput,
	tags: ["autodocs"],
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CompleteExample: Story = {
	args: {
		label: "Your bonus points",
		placeholder: "0",
		min: 0,
		max: 100,
		step: 1,
		hint: "We'll never share your bonus points with anyone else.",
	},
};

export const ControlledExample: Story = {
	args: {
		label: "Your controlled bonus points",
		placeholder: "0",
		min: 0,
		max: 100,
		step: 1,
		hint: "We'll never share your bonus points with anyone else.",
	},
	render: (args: NumberInputProps) => {
		const [value, setValue] = createSignal(75);
		return <NumberInput {...args} value={value()} onValueChange={setValue} />;
	},
};

export const Invalid: Story = {
	args: {
		...CompleteExample.args,
		error: "Invalid bonus points",
	},
};

export const Disabled: Story = {
	args: {
		...CompleteExample.args,
		disabled: true,
	},
};

export const WithStartSection: Story = {
	args: {
		label: "Your bonus points",
		placeholder: "0",
		min: 0,
		max: 100,
		step: 1,
		startSection: <DollarSign size={18} />,
	},
};

export const ReadOnly: Story = {
	args: {
		...CompleteExample.args,
		readOnly: true,
	},
};
