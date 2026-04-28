// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressLinear } from "./ProgressLinear";

const meta = {
	title: "React/ProgressLinear",
	component: ProgressLinear,
	tags: ["autodocs"],
} satisfies Meta<typeof ProgressLinear>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: "Upload progress",
		value: 45,
		max: 100,
		min: 0,
		hint: "Your file is being uploaded securely.",
	},
};

export const WithValueText: Story = {
	args: {
		...Default.args,
		showValueText: true,
	},
};

export const Indeterminate: Story = {
	args: {
		label: "Processing",
		value: null,
		hint: "This may take a moment.",
	},
};

export const CustomRange: Story = {
	args: {
		label: "Steps completed",
		value: 2,
		min: 0,
		max: 5,
		formatOptions: { style: "decimal", maximumFractionDigits: 0 },
		showValueText: true,
	},
};

export const Vertical: Story = {
	args: {
		label: "Vertical",
		value: 70,
		orientation: "vertical",
		className: "h-48",
	},
};

export const Invalid: Story = {
	args: {
		...Default.args,
		error: "Upload failed; try again.",
	},
};

export const Disabled: Story = {
	args: {
		...Default.args,
		disabled: true,
	},
};
