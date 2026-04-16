// noinspection JSUnusedGlobalSymbols

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button";
import { Stack } from "../stack";
import { TextInput } from "../text-input";
import { Card } from "./Card";

const meta = {
	title: "React/Card",
	component: Card,
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<header>
					<h2>Card Title</h2>
					<p>Card Description</p>
				</header>
				<section>
					<p>Card Content</p>
				</section>
				<footer>
					<p>Card Footer</p>
				</footer>
			</>
		),
	},
};

export const LoginForm: Story = {
	args: {
		className: "w-sm",
		children: (
			<>
				<header>
					<h2>Login to your account</h2>
					<p>Enter your details below to login to your account</p>
				</header>
				<section>
					<Stack gap={6}>
						<TextInput label={"Email"} />
						<TextInput label={"Password"} type={"password"} />
					</Stack>
				</section>
				<footer>
					<Stack gap={2} className={"w-full"}>
						<Button>Login</Button>
						<Button variant={"secondary"}>Login with Google</Button>
						<p className="mt-4 text-center text-sm">
							Don't have an account?{" "}
							<a href="#123" className="underline-offset-4 hover:underline">
								Sign up
							</a>
						</p>
					</Stack>
				</footer>
			</>
		),
	},
};
