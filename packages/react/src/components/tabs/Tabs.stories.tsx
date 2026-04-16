import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger, type TabsProps } from ".";

const meta = {
	title: "React/Tabs",
	component: Tabs,
	tags: ["autodocs"],
	args: {
		variant: "default",
	},
	argTypes: {
		variant: {
			control: "radio",
			options: ["default", "pills"],
		},
	},
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const Basic = (props: TabsProps) => (
	<Tabs {...props}>
		<TabsList>
			<TabsTrigger value="react">React</TabsTrigger>
			<TabsTrigger value="vue">Vue</TabsTrigger>
			<TabsTrigger value="solid">Solid</TabsTrigger>
			<TabsIndicator />
		</TabsList>
		<TabsContent value="react">React Content</TabsContent>
		<TabsContent value="vue">Vue Content</TabsContent>
		<TabsContent value="solid">Solid Content</TabsContent>
	</Tabs>
);

export const Default: Story = {
	render: (props) => <Basic {...props} />,
};

export const Pills: Story = {
	render: (props) => <Basic {...props} variant="pills" />,
};
