import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import {
	Accordion,
	AccordionItem,
	AccordionItemContent,
	AccordionItemIndicator,
	AccordionItemTrigger,
	type AccordionProps,
} from "./Accordion";

const items = [
	{ value: "item-1", title: "Item 1", content: "Content 1" },
	{ value: "item-2", title: "Item 2", content: "Content 2" },
	{ value: "item-3", title: "Item 3", content: "Content 3" },
];

function AccordionDemo(props: AccordionProps) {
	return (
		<Accordion {...props}>
			{items.map((item) => (
				<AccordionItem key={item.value} value={item.value} data-testid={`accordion-item-${item.value}`}>
					<AccordionItemTrigger data-testid={`accordion-trigger-${item.value}`}>
						{item.title}
						<AccordionItemIndicator>
							<span>v</span>
						</AccordionItemIndicator>
					</AccordionItemTrigger>
					<AccordionItemContent data-testid={`accordion-content-${item.value}`}>
						<div>{item.content}</div>
					</AccordionItemContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}

describe("Accordion", () => {
	beforeEach(() => {
		cleanup();
	});

	it("renders all accordion triggers", () => {
		render(<AccordionDemo />);
		expect(screen.getByTestId("accordion-trigger-item-1")).toBeInTheDocument();
		expect(screen.getByTestId("accordion-trigger-item-2")).toBeInTheDocument();
		expect(screen.getByTestId("accordion-trigger-item-3")).toBeInTheDocument();
	});

	it("expands an item when its trigger is clicked", async () => {
		const user = userEvent.setup();
		render(<AccordionDemo />);

		const trigger = screen.getByTestId("accordion-trigger-item-1");
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "open");
		});
	});

	it("collapses an expanded item when its trigger is clicked (collapsible by default)", async () => {
		const user = userEvent.setup();
		render(<AccordionDemo defaultValue={["item-1"]} />);

		await waitFor(() => {
			expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "open");
		});

		const trigger = screen.getByTestId("accordion-trigger-item-1");
		await user.click(trigger);

		await waitFor(() => {
			expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "closed");
		});
	});

	it("renders with defaultValue", () => {
		render(<AccordionDemo defaultValue={["item-2"]} />);

		expect(screen.getByTestId("accordion-item-item-2")).toHaveAttribute("data-state", "open");
		expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "closed");
	});

	it("supports controlled value", () => {
		render(<AccordionDemo value={["item-3"]} />);

		expect(screen.getByTestId("accordion-item-item-3")).toHaveAttribute("data-state", "open");
		expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "closed");
		expect(screen.getByTestId("accordion-item-item-2")).toHaveAttribute("data-state", "closed");
	});

	it("calls onValueChange when an item is toggled", async () => {
		const user = userEvent.setup();
		const onValueChange = vi.fn();
		render(<AccordionDemo onValueChange={onValueChange} />);

		const trigger = screen.getByTestId("accordion-trigger-item-1");
		await user.click(trigger);

		await waitFor(() => {
			expect(onValueChange).toHaveBeenCalledWith(["item-1"]);
		});
	});

	it("allows multiple items to be open when multiple prop is set", async () => {
		const user = userEvent.setup();
		render(<AccordionDemo multiple defaultValue={["item-1"]} />);

		const trigger2 = screen.getByTestId("accordion-trigger-item-2");
		await user.click(trigger2);

		await waitFor(() => {
			expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "open");
			expect(screen.getByTestId("accordion-item-item-2")).toHaveAttribute("data-state", "open");
		});
	});

	it("closes other items when not in multiple mode", async () => {
		const user = userEvent.setup();
		render(<AccordionDemo defaultValue={["item-1"]} />);

		await waitFor(() => {
			expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "open");
		});

		const trigger2 = screen.getByTestId("accordion-trigger-item-2");
		await user.click(trigger2);

		await waitFor(() => {
			expect(screen.getByTestId("accordion-item-item-1")).toHaveAttribute("data-state", "closed");
			expect(screen.getByTestId("accordion-item-item-2")).toHaveAttribute("data-state", "open");
		});
	});

	it("disables all items when disabled prop is set", () => {
		render(<AccordionDemo disabled />);

		expect(screen.getByTestId("accordion-trigger-item-1")).toBeDisabled();
		expect(screen.getByTestId("accordion-trigger-item-2")).toBeDisabled();
		expect(screen.getByTestId("accordion-trigger-item-3")).toBeDisabled();
	});

	it("applies className to the root element", () => {
		render(<AccordionDemo className="custom-class" testId="accordion-root" />);

		expect(screen.getByTestId("accordion-root")).toHaveClass("custom-class");
	});

	it("applies testId to the root element", () => {
		render(<AccordionDemo testId="my-accordion" />);

		expect(screen.getByTestId("my-accordion")).toBeInTheDocument();
	});

	it("applies data-variant attribute with boxed value", () => {
		render(<AccordionDemo variant="boxed" testId="boxed-accordion" />);

		expect(screen.getByTestId("boxed-accordion")).toHaveAttribute("data-variant", "boxed");
	});

	it("applies data-variant attribute with default value by default", () => {
		render(<AccordionDemo testId="default-accordion" />);

		expect(screen.getByTestId("default-accordion")).toHaveAttribute("data-variant", "default");
	});
});
