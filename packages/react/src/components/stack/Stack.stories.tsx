// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack, type StackProps } from "./Stack";

const meta = {
	title: "React/Stack",
	component: Stack,
	tags: ["autodocs"],
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Block = (props: StackProps) => {
	return (
		<Stack
			h={40}
			{...props}
			style={{
				border: "2px solid oklch(70.4% 0.191 22.216)",
				background: "repeating-linear-gradient(45deg, #ccc, #ccc 10px, #eee 10px, #eee 20px)",
			}}
		/>
	);
};

const Wrapper = (props: StackProps) => {
	return (
		<Stack
			h={80}
			{...props}
			style={{
				border: "2px solid oklch(67.3% 0.182 276.935)",
			}}
		/>
	);
};

export const GapVertical: Story = {
	render: () => (
		<Wrapper gap={4} h={150}>
			<Block h={20} />
			<Block h={20} />
			<Block h={20} />
			<Block h={20} />
		</Wrapper>
	),
};

export const GapHorizontal: Story = {
	render: () => (
		<Wrapper row gap={4}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const AlignStart: Story = {
	render: () => (
		<Wrapper row gap={4} align={"flex-start"} h={120}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const AlignCenter: Story = {
	render: () => (
		<Wrapper row gap={4} align={"center"} h={120}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const AlignStretch: Story = {
	render: () => (
		<Wrapper row gap={4} align={"stretch"} h={120}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const AlignEnd: Story = {
	render: () => (
		<Wrapper row gap={4} align={"flex-end"} h={120}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const JustifyStart: Story = {
	render: () => (
		<Wrapper row gap={4} justify={"flex-start"}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const JustifyCenter: Story = {
	render: () => (
		<Wrapper row gap={4} justify={"center"}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const JustifyEvenly: Story = {
	render: () => (
		<Wrapper row gap={4} justify={"space-evenly"}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const JustifyBetween: Story = {
	render: () => (
		<Wrapper row gap={4} justify={"space-between"}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const JustifyAround: Story = {
	render: () => (
		<Wrapper row gap={4} justify={"space-around"}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const JustifyEnd: Story = {
	render: () => (
		<Wrapper row gap={4} justify={"flex-end"}>
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
			<Block w={80} />
		</Wrapper>
	),
};

export const Centered: Story = {
	render: () => (
		<Wrapper center h={100}>
			<Block w={50} />
		</Wrapper>
	),
};
