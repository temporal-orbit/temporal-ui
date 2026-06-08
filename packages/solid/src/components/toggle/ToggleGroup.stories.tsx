// noinspection JSUnusedGlobalSymbols

import {
	BoldIcon,
	ItalicIcon,
	TextAlignCenter,
	TextAlignEnd,
	TextAlignStart,
	UnderlineIcon,
} from "lucide-solid";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { fn } from "storybook/test";
import { ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from "./ToggleGroup";

const meta = {
	title: "Solid/Toggle Group",
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
	render: (args: ToggleGroupProps) => (
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

export const TextualButtons: Story = {
	render: (args: ToggleGroupProps) => (
		<ToggleGroup {...args}>
			<ToggleGroupItem value="bold">Bold</ToggleGroupItem>
			<ToggleGroupItem value="italic">Italic</ToggleGroupItem>
			<ToggleGroupItem value="underline">Underline</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const Multiple: Story = {
	render: (args: ToggleGroupProps) => (
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
	render: (args: ToggleGroupProps) => (
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
	render: (args: ToggleGroupProps) => (
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
	render: (args: ToggleGroupProps) => (
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
	render: (args: ToggleGroupProps) => (
		<ToggleGroup {...args} orientation="vertical">
			<ToggleGroupItem value="left">
				<TextAlignStart size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<TextAlignCenter size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<TextAlignEnd size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const SingleSelection: Story = {
	render: (args: ToggleGroupProps) => (
		<ToggleGroup {...args} defaultValue={["left"]}>
			<ToggleGroupItem value="left">
				<TextAlignStart size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<TextAlignCenter size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<TextAlignEnd size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const WithDisabledItem: Story = {
	render: (args: ToggleGroupProps) => (
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
	render: (args: ToggleGroupProps) => (
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
	render: (args: ToggleGroupProps) => (
		<ToggleGroup
			{...args}
			label="Alignment"
			hint="Pick a horizontal alignment."
			error="Select an option."
		>
			<ToggleGroupItem value="left">
				<TextAlignStart size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<TextAlignCenter size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<TextAlignEnd size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};

export const VariantDefault: Story = {
	args: { variant: "default" },
	render: (args: ToggleGroupProps) => (
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
	render: (args: ToggleGroupProps) => (
		<div class="w-fit">
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
		</div>
	),
};

export const VariantSegmentedVertical: Story = {
	args: { variant: "segmented", orientation: "vertical" },
	render: (args: ToggleGroupProps) => (
		<ToggleGroup {...args} defaultValue={["left"]}>
			<ToggleGroupItem value="left">
				<TextAlignStart size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="center">
				<TextAlignCenter size={16} />
			</ToggleGroupItem>
			<ToggleGroupItem value="right">
				<TextAlignEnd size={16} />
			</ToggleGroupItem>
		</ToggleGroup>
	),
};
