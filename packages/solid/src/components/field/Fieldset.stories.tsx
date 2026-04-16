import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { TextInput } from "../text-input";
import { Fieldset } from "./Fieldset";

const meta: Meta<typeof Fieldset> = {
	title: "Solid/Fieldset",
	component: Fieldset,
	tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Basic: Story = {
	args: {
		legend: "Personal Information",
		hint: "Please fill out all required fields.",
	},
	render: (props) => (
		<Fieldset {...props}>
			<TextInput label="First Name" name="firstName" />
			<TextInput label="Last Name" name="lastName" />
		</Fieldset>
	),
};

export const Disabled: Story = {
	args: {
		legend: "Account Details",
		hint: "Fields are disabled.",
		disabled: true,
	},
	render: (props) => (
		<Fieldset {...props}>
			<TextInput label="Username" name="username" />
			<TextInput label="Email" name="email" />
		</Fieldset>
	),
};

export const WithError: Story = {
	args: {
		legend: "Contact Information",
		hint: "Please provide a valid phone number.",
		error: "Phone number is required.",
	},
	render: (props) => (
		<Fieldset {...props}>
			<TextInput label="Phone" name="phone" error="Required" />
		</Fieldset>
	),
};
