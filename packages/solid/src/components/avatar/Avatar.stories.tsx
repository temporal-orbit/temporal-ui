// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Stack } from "../stack";
import { Avatar } from "./Avatar";

const meta = {
	title: "Solid/Avatar",
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
			<p class="text-sm text-muted-foreground">
				User fallback icon should shrink on <code class="text-foreground">sm</code> and grow on{" "}
				<code class="text-foreground">lg</code> relative to the avatar box.
			</p>
			<Stack row gap={6} align="flex-end">
				<Stack gap={2} align="center">
					<Avatar size="sm" testId="avatar-fallback-sm" />
					<span class="text-xs text-muted-foreground">size=&quot;sm&quot;</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar testId="avatar-fallback-md" />
					<span class="text-xs text-muted-foreground">default (md)</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar size="lg" testId="avatar-fallback-lg" />
					<span class="text-xs text-muted-foreground">size=&quot;lg&quot;</span>
				</Stack>
			</Stack>
		</Stack>
	),
};

/** Same scaling when sizing via Tailwind + `avatar-*` classes (no `size` prop), e.g. sidebars. */
export const FallbackIconScalingByClass: Story = {
	render: () => (
		<Stack gap={6}>
			<p class="text-sm text-muted-foreground">
				<code class="text-foreground">avatar-sm</code> / <code class="text-foreground">avatar</code> /{" "}
				<code class="text-foreground">avatar-lg</code> with matching <code class="text-foreground">size-*</code>{" "}
				classes.
			</p>
			<Stack row gap={6} align="flex-end">
				<Stack gap={2} align="center">
					<Avatar class="avatar-sm size-6 rounded-full" testId="avatar-fallback-class-sm" />
					<span class="text-xs text-muted-foreground">avatar-sm + size-6</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar class="size-8 rounded-full" testId="avatar-fallback-class-md" />
					<span class="text-xs text-muted-foreground">size-8</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar class="avatar-lg size-10 rounded-full" testId="avatar-fallback-class-lg" />
					<span class="text-xs text-muted-foreground">avatar-lg + size-10</span>
				</Stack>
			</Stack>
		</Stack>
	),
};
