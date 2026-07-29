// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";
import { createListCollection, type SelectItem } from ".";
import { Banana } from "lucide-react";

const meta = {
	title: "React/Select",
	component: Select,
	tags: ["autodocs"],
	args: {},
	argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const collection = createListCollection<SelectItem<unknown>>({
	items: [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana", icon: <Banana /> },
		{ value: "cherry", label: "Cherry" },
		{ value: "tomato", label: "Tomato" },
		{ value: "orange", label: "Orange" },
		{ value: "strawberry", label: "Strawberry" },
		{ value: "pineapple", label: "Pineapple" },
		{ value: "mango", label: "Mango" },
		{ value: "grape", label: "Grape" },
		{ value: "watermelon", label: "Watermelon" },
		{ value: "kiwi", label: "Kiwi" },
		{ value: "peach", label: "Peach" },
		{ value: "pear", label: "Pear" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "raspberry", label: "Raspberry" },
		{ value: "blackberry", label: "Blackberry" },
		{ value: "lemon", label: "Lemon" },
		{ value: "lime", label: "Lime" },
		{ value: "coconut", label: "Coconut" },
		{ value: "papaya", label: "Papaya" },
		{ value: "plum", label: "Plum" },
		{ value: "pomegranate", label: "Pomegranate" },
		{ value: "apricot", label: "Apricot" },
		{ value: "guava", label: "Guava" },
		{ value: "fig", label: "Fig" },
		{ value: "dragonfruit", label: "Dragon fruit" },
		{ value: "passionfruit", label: "Passion fruit" },
	],
});

export const Default: Story = {
	args: {
		className: "min-w-[250px]",
		placeholder: "Select a fruit",
		collection,
		label: "Fruits",
		portal: true,
	},
};

export const LinearAlignedSelection: Story = {
	...Default,
	name: "Linear style (aligned selection)",
	args: {
		...Default.args,
		defaultValue: ["mango"],
		label: "First day of the week",
		hint: "Used for date pickers",
	},
	decorators: [
		(Story) => (
			<div
				style={{
					minHeight: "70vh",
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					padding: "2rem",
				}}
			>
				<Story />
			</div>
		),
	],
};

export const LinearNearViewportEdge: Story = {
	...Default,
	name: "Linear style (near top edge + carets)",
	args: {
		...Default.args,
		defaultValue: ["passionfruit"],
		maxDropdownHeight: 220,
		label: "Fruit",
		hint: "Open near the top of the viewport to see scroll carets",
	},
	decorators: [
		(Story) => (
			<div style={{ padding: "1rem", display: "flex", justifyContent: "flex-end" }}>
				<Story />
			</div>
		),
	],
};

export const MaxDropdownHeight: Story = {
	...Default,
	args: {
		...Default.args,
		maxDropdownHeight: 150,
		defaultValue: ["orange"],
	},
};

export const Deselectable: Story = {
	...Default,
	args: {
		...Default.args,
		deselectable: true,
	},
};

export const LargeDataset: Story = {
	...Default,
	render: (args) => {
		const collection = createListCollection({
			items: Array.from({ length: 1000 }, (_, index) => ({
				value: `item-${index}`,
				label: `Item ${index}`,
			})),
		});
		return <Select {...args} collection={collection} />;
	},
};

export const LargeDatasetWithGroups: Story = {
	...Default,
	render: (args) => {
		const collection = createListCollection<SelectItem<unknown>>({
			items: Array.from({ length: 1000 }, (_, index) => ({
				value: `item-${index}`,
				label: `Item ${index}`,
				group: `Group ${Math.floor(index / 10) + 1}`,
			})),
			groupBy: (item) => item.group ?? "",
		});
		return <Select {...args} collection={collection} />;
	},
};
