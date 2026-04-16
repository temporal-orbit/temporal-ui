// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Stack } from "../stack";
import { Notifications, showNotification, type NotificationsProps } from "./Notifications";

const meta = {
	title: "Solid/Notifications",
	component: Notifications,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		placement: {
			control: "radio",
			options: ["top-start", "top-end", "bottom-start", "bottom-end"],
		},
		max: {
			control: { type: "number", min: 1, max: 20 },
		},
		gap: {
			control: { type: "number", min: 0, max: 50 },
		},
	},
} satisfies Meta<typeof Notifications>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placement: "bottom-end",
		max: 10,
		gap: 12,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600}>
			<Notifications {...args} />
			<Stack row gap={2}>
				<Button
					onClick={() =>
						showNotification({
							title: "Success",
							message: "Your action was completed successfully!",
							type: "success",
							duration: 5000,
						})
					}
				>
					Show Success Notification
				</Button>
				<Button
					onClick={() =>
						showNotification({
							title: "Error",
							message: "Something went wrong. Please try again.",
							type: "error",
							duration: 5000,
						})
					}
				>
					Show Error Notification
				</Button>
				<Button
					onClick={() =>
						showNotification({
							title: "Info",
							message: "Here's some useful information for you.",
							type: "info",
							duration: 5000,
						})
					}
				>
					Show Info Notification
				</Button>
				<Button
					onClick={() =>
						showNotification({
							title: "Warning",
							message: "Please be careful with this action.",
							type: "warning",
							duration: 5000,
						})
					}
				>
					Show Warning Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const WithAction: Story = {
	args: {
		max: 5,
		gap: 10,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2}>
				<Button
					onClick={() =>
						showNotification({
							title: "With Action",
							message: "This notification has an action.",
							type: "info",
							duration: Infinity,
							action: {
								label: "Action",
								onClick: fn(),
							},
						})
					}
				>
					Show With Action Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const TopStart: Story = {
	args: {
		placement: "top-start",
		max: 5,
		gap: 10,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2}>
				<Button
					onClick={() =>
						showNotification({
							title: "Top Start",
							message: "This notification appears at the top-start position.",
							type: "info",
						})
					}
				>
					Show Top-Start Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const TopEnd: Story = {
	args: {
		placement: "top-end",
		max: 5,
		gap: 10,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2}>
				<Button
					onClick={() =>
						showNotification({
							title: "Top End",
							message: "This notification appears at the top-end position.",
							type: "info",
						})
					}
				>
					Show Top-End Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const BottomStart: Story = {
	args: {
		placement: "bottom-start",
		max: 5,
		gap: 10,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2}>
				<Button
					onClick={() =>
						showNotification({
							title: "Bottom Start",
							message: "This notification appears at the bottom-start position.",
							type: "info",
						})
					}
				>
					Show Bottom-Start Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const BottomEnd: Story = {
	args: {
		placement: "bottom-end",
		max: 5,
		gap: 10,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2}>
				<Button
					onClick={() =>
						showNotification({
							title: "Bottom End",
							message: "This notification appears at the bottom-end position.",
							type: "info",
						})
					}
				>
					Show Bottom-End Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const LongDescription: Story = {
	args: {
		placement: "bottom-end",
		max: 5,
		gap: 10,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2} row>
				<Button
					onClick={() =>
						showNotification({
							title: "Long Description",
							message:
								"This notification has a really really long description that should wrap around to the next line, and maybe even more lines.",
							type: "info",
						})
					}
				>
					Show Long Description Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const MultipleNotifications: Story = {
	args: {
		placement: "bottom-end",
		max: 3,
		gap: 15,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2}>
				<Button
					onClick={() => {
						showNotification({
							title: "First",
							message: "This is the first notification.",
							type: "success",
						});
						setTimeout(() => {
							showNotification({
								title: "Second",
								message: "This is the second notification.",
								type: "info",
							});
						}, 500);
						setTimeout(() => {
							showNotification({
								title: "Third",
								message: "This is the third notification.",
								type: "warning",
							});
						}, 1000);
					}}
				>
					Show Multiple Notifications
				</Button>
			</Stack>
		</Stack>
	),
};

export const CustomDuration: Story = {
	args: {
		placement: "bottom-end",
		max: 10,
		gap: 12,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600} row>
			<Notifications {...args} />
			<Stack gap={2}>
				<Button
					onClick={() =>
						showNotification({
							title: "Short Duration",
							message: "This notification will disappear in 2 seconds.",
							type: "info",
							duration: 2000,
						})
					}
				>
					Show Short Duration (2s)
				</Button>
				<Button
					onClick={() =>
						showNotification({
							title: "Long Duration",
							message: "This notification will stay for 10 seconds.",
							type: "warning",
							duration: 10000,
						})
					}
				>
					Show Long Duration (10s)
				</Button>
				<Button
					onClick={() =>
						showNotification({
							title: "No Auto-Close",
							message: "This notification will stay until manually closed.",
							type: "error",
							duration: undefined,
						})
					}
				>
					Show Persistent Notification
				</Button>
			</Stack>
		</Stack>
	),
};

export const AllTypes: Story = {
	args: {
		placement: "bottom-end",
		max: 10,
		gap: 12,
	},
	render: (args: NotificationsProps) => (
		<Stack p={5} h={600}>
			<Notifications {...args} />
			<Stack gap={2}>
				<Stack row gap={2}>
					<Button
						onClick={() =>
							showNotification({
								title: "Success",
								message: "Operation completed successfully!",
								type: "success",
							})
						}
					>
						Success
					</Button>
					<Button
						onClick={() =>
							showNotification({
								title: "Success Persistent",
								message: "Operation completed successfully!",
								type: "success",
								duration: Infinity,
							})
						}
					>
						Success Persistent
					</Button>
				</Stack>

				<Stack row gap={2}>
					<Button
						onClick={() =>
							showNotification({
								title: "Error",
								message: "An error occurred during the operation.",
								type: "error",
							})
						}
					>
						Error
					</Button>
					<Button
						onClick={() =>
							showNotification({
								title: "Error Persistent",
								message: "An error occurred during the operation.",
								type: "error",
								duration: Infinity,
							})
						}
					>
						Error Persistent
					</Button>
				</Stack>

				<Stack row gap={2}>
					<Button
						onClick={() =>
							showNotification({
								title: "Info",
								message: "Here's some helpful information.",
								type: "info",
							})
						}
					>
						Info
					</Button>
					<Button
						onClick={() =>
							showNotification({
								title: "Info Persistent",
								message: "Here's some helpful information.",
								type: "info",
								duration: Infinity,
							})
						}
					>
						Info Persistent
					</Button>
				</Stack>

				<Stack row gap={2}>
					<Button
						onClick={() =>
							showNotification({
								title: "Warning",
								message: "Please be careful with this action.",
								type: "warning",
							})
						}
					>
						Warning
					</Button>
					<Button
						onClick={() =>
							showNotification({
								title: "Warning Persistent",
								message: "Please be careful with this action.",
								type: "warning",
								duration: Infinity,
							})
						}
					>
						Warning Persistent
					</Button>
				</Stack>

				<Stack row gap={2}>
					<Button
						onClick={() =>
							showNotification({
								title: "Custom",
								message: "This is a custom notification type.",
								type: "custom",
							})
						}
					>
						Custom
					</Button>
					<Button
						onClick={() =>
							showNotification({
								title: "Custom Persistent",
								message: "This is a custom notification type.",
								type: "custom",
								duration: Infinity,
							})
						}
					>
						Custom Persistent
					</Button>
				</Stack>

				<Stack row gap={2}>
					<Button
						onClick={() =>
							showNotification({
								title: "Loading",
								message: "Processing your request...",
								type: "loading",
							})
						}
					>
						Loading
					</Button>
				</Stack>
			</Stack>
		</Stack>
	),
};
