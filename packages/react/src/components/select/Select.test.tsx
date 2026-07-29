import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { createListCollection, Select, type SelectItem } from ".";

const collection = createListCollection<SelectItem<unknown>>({
	items: [
		{ value: "a", label: "Alpha" },
		{ value: "b", label: "Beta" },
		{ value: "c", label: "Charlie" },
		{ value: "d", label: "Delta" },
		{ value: "e", label: "Echo" },
		{ value: "f", label: "Foxtrot" },
		{ value: "g", label: "Golf" },
		{ value: "h", label: "Hotel" },
		{ value: "i", label: "India" },
		{ value: "j", label: "Juliet" },
	],
});

describe("Select", () => {
	it("merges classes.control with className on the control element", () => {
		render(
			<Select
				testId="sel"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				className="from-prop"
				classes={{ control: "from-classes" }}
			/>,
		);
		const control = screen.getByTestId("sel--control");
		expect(control).toHaveClass("from-prop");
		expect(control).toHaveClass("from-classes");
	});

	it("applies trigger and valueText class slots", () => {
		render(
			<Select
				testId="sel2"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				classes={{ trigger: "slot-trigger", valueText: "slot-value" }}
			/>,
		);
		expect(screen.getByTestId("sel2--trigger")).toHaveClass("slot-trigger");
		expect(screen.getByTestId("sel2--value-text")).toHaveClass("slot-value");
	});

	it("renders scroll carets when the open menu is constrained", async () => {
		const user = userEvent.setup();
		render(
			<div style={{ paddingTop: 8 }}>
				<Select
					testId="sel3"
					label="Pick"
					collection={collection}
					placeholder="Choose"
					portal={false}
					defaultValue={["j"]}
					maxDropdownHeight={120}
					defaultOpen
				/>
			</div>,
		);

		expect(screen.getByTestId("sel3--content")).toBeInTheDocument();
		expect(screen.getByTestId("sel3--scroll-caret-up")).toBeInTheDocument();
		expect(screen.getByTestId("sel3--scroll-caret-down")).toBeInTheDocument();

		await user.keyboard("{Escape}");
	});

	it("aligns to a late selected value and shows an up scroll caret", async () => {
		Object.defineProperty(document.documentElement, "clientHeight", {
			configurable: true,
			value: 800,
		});
		Object.defineProperty(document.documentElement, "clientWidth", {
			configurable: true,
			value: 1200,
		});

		render(
			<div style={{ paddingTop: 24 }}>
				<Select
					testId="sel4"
					label="Pick"
					collection={collection}
					placeholder="Choose"
					portal={false}
					defaultValue={["j"]}
					maxDropdownHeight={120}
					defaultOpen
				/>
			</div>,
		);

		const list = await screen.findByTestId("sel4--content-list");
		const selected = list.querySelector<HTMLElement>('[data-state="checked"]');
		expect(selected).toBeTruthy();
		expect(selected).toHaveTextContent("Juliet");

		// happy-dom often reports offsetTop as 0; stub layout for the selected row.
		const items = [...list.querySelectorAll<HTMLElement>('[data-part="item"]')];
		items.forEach((item, index) => {
			Object.defineProperty(item, "offsetTop", { configurable: true, value: index * 32 });
			Object.defineProperty(item, "offsetHeight", { configurable: true, value: 32 });
		});
		Object.defineProperty(list, "scrollHeight", { configurable: true, value: items.length * 32 });
		Object.defineProperty(list, "clientHeight", { configurable: true, value: 120 });

		const content = screen.getByTestId("sel4--content");
		content.removeAttribute("data-linear-aligned");

		const { alignSelectDropdown, getSelectTriggerForContent } = await import(
			"@temporal-ui/core/select"
		);
		const positioner = screen.getByTestId("sel4--positioner");
		const trigger = getSelectTriggerForContent(content);
		expect(trigger).toBeTruthy();

		alignSelectDropdown({
			positioner,
			content,
			trigger: trigger!,
			selectedItem: selected,
			hasValue: true,
			maxHeight: 120,
		});

		expect(list.scrollTop).toBeGreaterThan(0);
		const { getSelectScrollState } = await import("@temporal-ui/core/select");
		expect(getSelectScrollState(list).canScrollUp).toBe(true);
	});

	it("auto-scrolls the list while hovering a scroll caret", async () => {
		const user = userEvent.setup();
		Object.defineProperty(document.documentElement, "clientHeight", {
			configurable: true,
			value: 800,
		});

		render(
			<Select
				testId="sel5"
				label="Pick"
				collection={collection}
				placeholder="Choose"
				portal={false}
				defaultValue={["a"]}
				maxDropdownHeight={120}
				defaultOpen
			/>,
		);

		const list = await screen.findByTestId("sel5--content-list");
		const items = [...list.querySelectorAll<HTMLElement>('[data-part="item"]')];
		items.forEach((item, index) => {
			Object.defineProperty(item, "offsetTop", { configurable: true, value: index * 32 });
			Object.defineProperty(item, "offsetHeight", { configurable: true, value: 32 });
		});
		Object.defineProperty(list, "scrollHeight", { configurable: true, value: items.length * 32 });
		Object.defineProperty(list, "clientHeight", { configurable: true, value: 120 });
		list.scrollTop = 0;

		const caretDown = screen.getByTestId("sel5--scroll-caret-down");
		caretDown.setAttribute("data-visible", "");
		await user.hover(caretDown);

		await vi.waitFor(() => {
			expect(list.scrollTop).toBeGreaterThan(0);
		});
	});
});
