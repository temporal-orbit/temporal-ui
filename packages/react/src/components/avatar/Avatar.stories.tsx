// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { AVATAR_COLOR_VARIANTS, getAvatarVariant } from "@temporal-ui/core/avatar";
import { Stack } from "../stack";
import { Avatar } from "./Avatar";

/** One sample name per palette slot so `color="auto"` exercises every hash bucket in stories. */
const AUTO_COLOR_SAMPLE_NAMES: string[] = (() => {
	const names: string[] = [];
	for (let target = 0; target < AVATAR_COLOR_VARIANTS.length; target++) {
		let picked: string | undefined;
		for (let i = 0; i < 500_000 && !picked; i++) {
			const s = `story-auto-${i}`;
			if (getAvatarVariant(s, AVATAR_COLOR_VARIANTS.length) === target) {
				picked = s;
			}
		}
		if (!picked) {
			throw new Error(`Could not find a name mapping to variant index ${target}`);
		}
		names.push(picked);
	}
	return names;
})();

const meta = {
	title: "React/Avatar",
	component: Avatar,
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: "radio",
			options: ["sm", "md", "lg"],
		},
		color: {
			control: "select",
			options: [...AVATAR_COLOR_VARIANTS, "auto", "none"],
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

/** Fallback icon scales with the `size` prop; optional Tailwind adjusts shape (e.g. `rounded-full`). */
export const FallbackIconScalingByClass: Story = {
	render: () => (
		<Stack gap={6}>
			<p className="text-sm text-muted-foreground">
				Use <code className="text-foreground">size=&quot;sm&quot;</code>,{" "}
				<code className="text-foreground">size=&quot;md&quot;</code> (default), or{" "}
				<code className="text-foreground">size=&quot;lg&quot;</code> — optional classes such as{" "}
				<code className="text-foreground">rounded-full</code> layer on top.
			</p>
			<Stack row gap={6} align="flex-end">
				<Stack gap={2} align="center">
					<Avatar size="sm" className="rounded-full" testId="avatar-fallback-class-sm" />
					<span className="text-xs text-muted-foreground">size=&quot;sm&quot;</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar className="rounded-full" testId="avatar-fallback-class-md" />
					<span className="text-xs text-muted-foreground">size=&quot;md&quot; (default)</span>
				</Stack>
				<Stack gap={2} align="center">
					<Avatar size="lg" className="rounded-full" testId="avatar-fallback-class-lg" />
					<span className="text-xs text-muted-foreground">size=&quot;lg&quot;</span>
				</Stack>
			</Stack>
		</Stack>
	),
};

export const ColorVariants: Story = {
	render: () => (
		<Stack gap={8}>
			<Stack gap={2}>
				<p className="text-sm font-medium text-foreground">Explicit color (initials)</p>
				<Stack row gap={3} align="flex-end" className="flex-wrap">
					{AVATAR_COLOR_VARIANTS.map((c) => (
						<Stack key={c} gap={1} align="center">
							<Avatar name="Alex" color={c} testId={`avatar-explicit-${c}`} />
							<span className="max-w-16 text-center text-xs text-muted-foreground">{c}</span>
						</Stack>
					))}
				</Stack>
			</Stack>
			<Stack gap={2}>
				<p className="text-sm font-medium text-foreground">Auto color (unique names per bucket)</p>
				<Stack row gap={3} align="flex-end" className="flex-wrap">
					{AVATAR_COLOR_VARIANTS.map((c, i) => (
						<Stack key={`auto-${c}`} gap={1} align="center">
							<Avatar name={AUTO_COLOR_SAMPLE_NAMES[i]} color="auto" testId={`avatar-auto-${c}`} />
							<span className="max-w-20 text-center text-xs text-muted-foreground">{c}</span>
						</Stack>
					))}
				</Stack>
			</Stack>
		</Stack>
	),
};

export const DarkMode: Story = {
	render: () => (
		<div className="dark bg-background p-6">
			<Stack gap={4}>
				<p className="text-sm text-muted-foreground">Twelve explicit variants under .dark</p>
				<Stack row gap={3} align="flex-end" className="flex-wrap">
					{AVATAR_COLOR_VARIANTS.map((c) => (
						<Stack key={c} gap={1} align="center">
							<Avatar name="Riley" color={c} testId={`avatar-dark-${c}`} />
							<span className="max-w-16 text-center text-xs text-muted-foreground">{c}</span>
						</Stack>
					))}
				</Stack>
			</Stack>
		</div>
	),
};

/** No name + auto → neutral (`data-color="none"`). */
export const NoNameAutoNeutral: Story = {
	args: {
		color: "auto",
	},
};

export const ColorNoneNeutral: Story = {
	args: {
		name: "Ignored",
		color: "none",
	},
};

/** Strong fallback color should not show once the photo has loaded. */
export const ImageOverridesColoredFallback: Story = {
	args: {
		name: "Jamie Cook",
		color: "pink",
		src: "https://i.pravatar.cc/300",
	},
};

export const BrokenImageUsesFallback: Story = {
	args: {
		name: "Sam Error",
		color: "teal",
		src: "https://invalid.invalid/not-a-real-image.png",
	},
};
