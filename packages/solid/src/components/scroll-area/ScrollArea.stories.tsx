import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { ScrollArea } from "./ScrollArea";

const meta: Meta<typeof ScrollArea> = {
	title: "Solid/Scroll Area",
	component: ScrollArea,
	tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
	args: {
		className: "w-96 h-48",
		orientation: "vertical",
		children: (
			<div class="w-full h-600 bg-card">
				<p class="m-0 p-4">
					Scroll me vertically. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
					dignissim, velit vitae cursus consequat, enim erat molestie odio, fringilla placerat erat
					neque ac enim. Pellentesque viverra vulputate laoreet. Phasellus massa felis, aliquam vel
					eros et, pretium tempor lorem.
				</p>
				<p class="m-0 p-4">
					Another paragraph for demonstration purposes. Vivamus feugiat, nisl eu dictum facilisis,
					ipsum lacus eleifend enim, quis aliquam tellus quam ac dui. Pellentesque vulputate justo
					arcu, eu aliquam nunc ornare sit amet.
				</p>
			</div>
		),
	},
};

export const Horizontal: Story = {
	args: {
		className: "w-96 h-32",
		orientation: "horizontal",
		children: (
			<div class="flex p-4 items-center border bg-card">
				{[...Array(8)].map((_, i) => (
					<div class="min-w-24 h-20 bg-accent mx-2 flex items-center justify-center rounded-md font-medium">
						Item {i + 1}
					</div>
				))}
			</div>
		),
	},
};

export const Both: Story = {
	args: {
		className: "w-96 h-48",
		orientation: "both",
		children: (
			<div class="w-96 h-96 p-4 border bg-card">
				<h4>Scrollable in both directions</h4>
				<p>
					Try scrolling right and down to see the rest of this box. This can be helpful for large
					content like tables or code blocks.
				</p>
				<pre class="bg-accent p-4 w-96 overflow-auto rounded-md">
					{`Column 1   Column 2   Column 3   Column 4
--------   --------   --------   --------
Data A     Data B     Data C     Data D
Data E     Data F     Data G     Data H
`}
				</pre>
			</div>
		),
	},
};
