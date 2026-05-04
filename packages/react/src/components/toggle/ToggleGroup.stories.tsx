// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";
import { fn } from "storybook/test";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
	title: "React/Toggle Group",
	component: ToggleGroup,
	tags: ["autodocs"],
	args: { onValueChange: fn() },
	argTypes: {
		multiple: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
		orientation: {
			control: "select",
			options: ["horizontal", "vertical"],
		},
		variant: {
			control: "select",
			options: ["default", "segmented"],
		},
	},
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Multiple: Story = {
	render: (args) => (
		<ToggleGroup {...args} multiple>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const WithDefaultValue: Story = {
	render: (args) => (
		<ToggleGroup {...args} defaultValue={["bold"]}>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const WithMultipleDefaults: Story = {
	render: (args) => (
		<ToggleGroup {...args} multiple defaultValue={["bold", "italic"]}>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Disabled: Story = {
	render: (args) => (
		<ToggleGroup {...args} disabled>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Vertical: Story = {
	render: (args) => (
		<ToggleGroup {...args} orientation="vertical">
			<ToggleGroupItem value="left">
				<AlignLeftIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<AlignCenterIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<AlignRightIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const SingleSelection: Story = {
	render: (args) => (
		<ToggleGroup {...args} defaultValue={["left"]}>
			<ToggleGroupItem value="left">
				<AlignLeftIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<AlignCenterIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<AlignRightIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const WithDisabledItem: Story = {
	render: (args) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic" disabled>
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const WithField: Story = {
	render: (args) => (
		<ToggleGroup {...args} label="Text style" hint="Choose one or more styles to apply.">
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const WithFieldError: Story = {
	render: (args) => (
		<ToggleGroup {...args} label="Alignment" hint="Pick a horizontal alignment." error="Select an option.">
			<ToggleGroupItem value="left">
				<AlignLeftIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<AlignCenterIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<AlignRightIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const VariantDefault: Story = {
	args: { variant: "default" },
	render: (args) => (
		<ToggleGroup {...args} defaultValue={["bold"]}>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const VariantSegmented: Story = {
	args: { variant: "segmented" },
	render: (args) => (
		<ToggleGroup {...args} defaultValue={["bold"]}>
			<ToggleGroupItem value="bold">
				<BoldIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="italic">
				<ItalicIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="underline">
				<UnderlineIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const VariantSegmentedVertical: Story = {
	args: { variant: "segmented", orientation: "vertical" },
	render: (args) => (
		<ToggleGroup {...args} defaultValue={["left"]}>
			<ToggleGroupItem value="left">
				<AlignLeftIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<AlignCenterIcon size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<AlignRightIcon size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};
