// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box, type BoxProps } from "./Box";

const meta = {
	title: "React/Box",
	component: Box,
	tags: ["autodocs"],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

const Block = (props: BoxProps) => {
	return (
		<Box
			h={50}
			{...props}
			style={{
				border: "2px solid oklch(70.4% 0.191 22.216)",
				background: "repeating-linear-gradient(45deg, #ccc, #ccc 10px, #eee 10px, #eee 20px)",
			}}
		/>
	);
};

const Wrapper = (props: BoxProps) => {
	return (
		<Box
			{...props}
			style={{
				border: "2px solid oklch(67.3% 0.182 276.935)",
			}}
		/>
	);
};

export const Padding: Story = {
	render: () => (
		<Wrapper p={5}>
			<Block />
		</Wrapper>
	),
};

export const PaddingIndividual: Story = {
	render: () => (
		<Wrapper pt={3} pb={6} pl={3} pr={12}>
			<Block />
		</Wrapper>
	),
};

export const PaddingAxis: Story = {
	render: () => (
		<Wrapper px={3} py={6}>
			<Block />
		</Wrapper>
	),
};

export const Margin: Story = {
	render: () => (
		<Wrapper>
			<Block m={8} />
		</Wrapper>
	),
};

export const MarginIndividual: Story = {
	render: () => (
		<Wrapper>
			<Block mt={3} mb={6} ml={3} mr={12} />
		</Wrapper>
	),
};

export const MarginAxis: Story = {
	render: () => (
		<Wrapper>
			<Block mx={3} my={6} />
		</Wrapper>
	),
};
