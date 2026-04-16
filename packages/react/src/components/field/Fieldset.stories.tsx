import type { Meta, StoryObj } from "@storybook/react-vite";
import { Fieldset } from "./Fieldset";
import { TextInput } from "../text-input";

const meta: Meta<typeof Fieldset> = {
	title: "React/Fieldset",
	component: Fieldset,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Basic: Story = {
	args: {
		legend: "Personal Information",
		hint: "Please fill out all required fields.",
		children: (
			<>
				<TextInput label="First Name" name="firstName" />
				<TextInput label="Last Name" name="lastName" />
			</>
		),
	},
};

export const Disabled: Story = {
	args: {
		legend: "Account Details",
		hint: "Fields are disabled.",
		disabled: true,
		children: (
			<>
				<TextInput label="Username" name="username" />
				<TextInput label="Email" name="email" />
			</>
		),
	},
};

export const WithError: Story = {
	args: {
		legend: "Contact Information",
		hint: "Please provide a valid phone number.",
		error: "Phone number is required.",
		children: (
			<>
				<TextInput label="Phone" name="phone" error="Required" />
			</>
		),
	},
};
