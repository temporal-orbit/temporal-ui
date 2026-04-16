// noinspection JSUnusedGlobalSymbols

import { AlarmClockCheck, Mail } from "lucide-solid";
import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { Button } from "../button";
import { Stack } from "../stack";
import { Alert } from "./Alert";

const meta = {
	title: "Solid/Alert",
	component: Alert,
	tags: ["autodocs"],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		variant: "default",
		title: "You've got 1 new message!",
		description: "This is an alert with title and description.",
		icon: () => <Mail />,
	},
};

export const Info: Story = {
	args: {
		variant: "info",
		title: "Information",
		description: "This is an info alert with title and description.",
	},
};

export const Success: Story = {
	args: {
		variant: "success",
		title: "Success",
		description: "This is a success alert with title and description.",
	},
};

export const Warning: Story = {
	args: {
		variant: "warning",
		title: "Warning",
		description: "This is a warning alert with title and description.",
	},
};

export const ErrorVariant: Story = {
	name: "Error",
	args: {
		variant: "error",
		title: "Error",
		description: "This is an error alert with title and description.",
	},
};

export const NoIcon: Story = {
	args: {
		...Default.args,
		icon: undefined,
	},
};

export const NoTitle: Story = {
	args: {
		...Default.args,
		title: undefined,
		description: "This alert has no title but has a description.",
	},
};

export const NoDescription: Story = {
	args: {
		...Default.args,
		title: "Alert without description",
		description: undefined,
	},
};

export const CustomIcon: Story = {
	args: {
		...Default.args,
		title: "Alert with custom icon",
		icon: () => <AlarmClockCheck />,
	},
};

export const WithChildren: Story = {
	args: {
		...Default.args,
		title: "Alert with children",
	},
	render: () => (
		<Stack row gap={1} mt={1}>
			<Button variant="primary" size="xs">
				Action
			</Button>
			<Button variant="secondary" size="xs">
				Secondary
			</Button>
		</Stack>
	),
};
