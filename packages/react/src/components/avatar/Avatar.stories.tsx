// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "../stack";
import { Avatar } from "./Avatar";

const meta = {
	title: "React/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "radio",
			options: ["sm", "md", "lg"],
		},
	},
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
};

export const WithName: Story = {
	args: {
		name: "John Doe",
	},
};

export const WithImage: Story = {
	args: {
		name: "Jane Doe",
		src: "https://i.pravatar.cc/300",
	},
};

export const SizeSm: Story = {
	args: {
		size: "sm",
		name: "Jane Doe",
		src: "https://i.pravatar.cc/300",
	},
};

export const SizeLg: Story = {
	args: {
		size: "lg",
		name: "Jane Doe",
		src: "https://i.pravatar.cc/300",
	},
};

/** Default user icon scales with `size` (no `src`, no `name`). */
export const FallbackIconScalingBySizeProp: Story = {
	render: () => (
		<Stack gap={6}>
			<p className="text-sm text-muted-foreground">
				User fallback icon should shrink on <code className="text-foreground">sm</code> and grow on{" "}
				<code className="text-foreground">lg</code> relative to the avatar box.
			</p>
			<Stack row gap={6} align="flex-end">
				<Stack gap={2} align="center">
					<Avatar size="sm" testId="avatar-fallback-sm" />
					<span className="text-xs text-muted-foreground">size=&quot;sm&quot;</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar testId="avatar-fallback-md" />
					<span className="text-xs text-muted-foreground">default (md)</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar size="lg" testId="avatar-fallback-lg" />
					<span className="text-xs text-muted-foreground">size=&quot;lg&quot;</span>
				</Stack>
			</Stack>
		</Stack>
	),
};

/** Same scaling when sizing via Tailwind + `avatar-*` classes (no `size` prop). */
export const FallbackIconScalingByClass: Story = {
	render: () => (
		<Stack gap={6}>
			<p className="text-sm text-muted-foreground">
				<code className="text-foreground">avatar-sm</code> / <code className="text-foreground">avatar</code> /{" "}
				<code className="text-foreground">avatar-lg</code> with matching <code className="text-foreground">size-*</code>{" "}
				classes.
			</p>
			<Stack row gap={6} align="flex-end">
				<Stack gap={2} align="center">
					<Avatar className="avatar-sm size-6 rounded-full" testId="avatar-fallback-class-sm" />
					<span className="text-xs text-muted-foreground">avatar-sm + size-6</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar className="size-8 rounded-full" testId="avatar-fallback-class-md" />
					<span className="text-xs text-muted-foreground">size-8</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar className="avatar-lg size-10 rounded-full" testId="avatar-fallback-class-lg" />
					<span className="text-xs text-muted-foreground">avatar-lg + size-10</span>
				</Stack>
			</Stack>
		</Stack>
	),
};
