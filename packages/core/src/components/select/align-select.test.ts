/**
 * @vitest-environment happy-dom
 */
import { describe, expect, it } from "vitest";
import {
	alignSelectDropdown,
	getSelectScrollState,
	getSelectedSelectItem,
	getSelectTriggerForContent,
} from "./align-select";
import { createLinearSelectPositioning } from "./create-linear-positioning";
import { startSelectCaretAutoScroll } from "./scroll-carets";

function mountSelectFixture(options?: {
	selectedIndex?: number;
	itemCount?: number;
	triggerTop?: number;
}) {
	const itemCount = options?.itemCount ?? 7;
	const selectedIndex = options?.selectedIndex;
	const triggerTop = options?.triggerTop ?? 200;

	document.body.innerHTML = "";
	Object.defineProperty(document.documentElement, "clientHeight", {
		configurable: true,
		value: 800,
	});
	Object.defineProperty(document.documentElement, "clientWidth", {
		configurable: true,
		value: 1200,
	});

	const trigger = document.createElement("button");
	trigger.setAttribute("data-scope", "select");
	trigger.setAttribute("data-part", "trigger");
	trigger.id = "trigger";
	Object.defineProperty(trigger, "getBoundingClientRect", {
		configurable: true,
		value: () => ({
			top: triggerTop,
			bottom: triggerTop + 36,
			left: 100,
			right: 220,
			width: 120,
			height: 36,
			x: 100,
			y: triggerTop,
			toJSON() {},
		}),
	});

	const content = document.createElement("div");
	content.setAttribute("data-part", "content");
	content.id = "select-content";
	content.style.position = "relative";

	const positioner = document.createElement("div");
	positioner.setAttribute("data-part", "positioner");
	positioner.style.setProperty("--x", "100px");
	positioner.style.setProperty("--y", `${triggerTop + 36}px`);
	Object.defineProperty(positioner, "getBoundingClientRect", {
		configurable: true,
		value: () => {
			const y = parseFloat(positioner.style.getPropertyValue("--y") || "0");
			const x = parseFloat(positioner.style.getPropertyValue("--x") || "0");
			const height = Number.parseFloat(content.style.height || content.style.maxHeight || "200") || 200;
			return {
				top: y,
				bottom: y + height,
				left: x,
				right: x + 160,
				width: 160,
				height,
				x,
				y,
				toJSON() {},
			};
		},
	});

	const list = document.createElement("div");
	list.setAttribute("data-component", "select");
	list.setAttribute("data-slot", "list");
	Object.defineProperty(list, "clientHeight", {
		configurable: true,
		get() {
			const cap =
				Number.parseFloat(content.style.height || content.style.maxHeight || "9999") || 9999;
			return Math.min(list.scrollHeight, cap);
		},
	});

	for (let i = 0; i < itemCount; i++) {
		const item = document.createElement("div");
		item.setAttribute("data-part", "item");
		item.setAttribute("data-state", i === selectedIndex ? "checked" : "unchecked");
		item.textContent = `Item ${i}`;
		Object.defineProperty(item, "offsetTop", { value: i * 32, configurable: true });
		Object.defineProperty(item, "offsetHeight", { value: 32, configurable: true });
		list.appendChild(item);
	}

	Object.defineProperty(list, "scrollHeight", {
		configurable: true,
		get() {
			return itemCount * 32;
		},
	});

	content.appendChild(list);
	positioner.appendChild(content);
	trigger.setAttribute("aria-controls", content.id);

	document.body.append(trigger, positioner);

	return { trigger, positioner, content, list };
}

describe("alignSelectDropdown", () => {
	it("aligns the selected item with the trigger and stays in the viewport", () => {
		const { trigger, positioner, content, list } = mountSelectFixture({ selectedIndex: 3 });

		const result = alignSelectDropdown({
			positioner,
			content,
			trigger,
			selectedItem: getSelectedSelectItem(content),
			overflowPadding: 8,
		});

		const y = parseFloat(positioner.style.getPropertyValue("--y"));
		// trigger top (200) - selected offset (96) = 104
		expect(y).toBeCloseTo(104, 0);
		expect(list.scrollTop).toBe(0);
		expect(result.canScrollUp).toBe(false);
	});

	it("clamps to the viewport and scrolls when the menu would overflow the top", () => {
		const { trigger, positioner, content, list } = mountSelectFixture({
			selectedIndex: 20,
			itemCount: 30,
			triggerTop: 40,
		});

		const result = alignSelectDropdown({
			positioner,
			content,
			trigger,
			selectedItem: getSelectedSelectItem(content),
			overflowPadding: 8,
			maxHeight: 200,
		});

		const y = parseFloat(positioner.style.getPropertyValue("--y"));
		expect(y).toBeGreaterThanOrEqual(8);
		expect(list.scrollTop).toBeGreaterThan(0);
		expect(result.canScrollUp || result.canScrollDown).toBe(true);
	});
});

describe("getSelectTriggerForContent", () => {
	it("finds the trigger via aria-controls", () => {
		const { trigger, content } = mountSelectFixture();
		expect(getSelectTriggerForContent(content)).toBe(trigger);
	});
});

describe("createLinearSelectPositioning", () => {
	it("chains user updatePosition and then aligns", async () => {
		const { trigger, positioner, content } = mountSelectFixture({ selectedIndex: 2 });
		let userCalled = false;

		const positioning = createLinearSelectPositioning({
			positioning: {
				updatePosition: async ({ updatePosition }) => {
					userCalled = true;
					await updatePosition();
				},
			},
		});

		await positioning.updatePosition?.({
			updatePosition: async () => {
				positioner.style.setProperty("--y", "236px");
			},
			floatingElement: positioner,
		});

		expect(userCalled).toBe(true);
		expect(getSelectTriggerForContent(content)).toBe(trigger);
		expect(parseFloat(positioner.style.getPropertyValue("--y"))).toBeLessThan(236);
	});
});

describe("startSelectCaretAutoScroll", () => {
	it("scrolls the scroller and stops at the edge", async () => {
		const { list } = mountSelectFixture({ itemCount: 40 });
		Object.defineProperty(list, "clientHeight", { configurable: true, value: 100 });
		list.scrollTop = 50;

		await new Promise<void>((resolve) => {
			const stop = startSelectCaretAutoScroll({
				scroller: list,
				direction: "up",
				step: 20,
				intervalMs: 5,
				onScroll: (state) => {
					if (!state.canScrollUp) {
						stop();
						resolve();
					}
				},
			});
			setTimeout(() => {
				stop();
				resolve();
			}, 200);
		});

		expect(list.scrollTop).toBeLessThanOrEqual(50);
		expect(getSelectScrollState(list).canScrollUp).toBe(false);
	});
});
