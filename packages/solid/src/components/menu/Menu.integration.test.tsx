import { cleanup, render, screen, waitFor } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { ChevronRight } from "lucide-solid";
import { Menu } from "./Menu";
import { MenuCheckboxItem } from "./MenuCheckboxItem";
import { MenuItem } from "./MenuItem";
import { MenuItemGroup } from "./MenuItemGroup";
import { MenuItemSeparator } from "./MenuItemSeparator";
import { MenuRadioItem } from "./MenuRadioItem";
import { MenuRadioItemGroup } from "./MenuRadioItemGroup";
import { MenuSub } from "./MenuSub";
import { MenuSubContent } from "./MenuSubContent";
import { MenuSubTrigger } from "./MenuSubTrigger";

describe("Menu Integration Tests", () => {
	beforeEach(() => {
		cleanup();
	});

	it("handles complex menu structure", async () => {
		const user = userEvent.setup();
		const onSelect = vi.fn();
		const onRadioChange = vi.fn();
		const onCheckboxChange = vi.fn();

		render(() => (
			<Menu
				trigger={(props) => (
					<button type="button" {...props}>
						Complex Menu
					</button>
				)}
				onSelect={onSelect}
			>
				<MenuItemGroup label="Basic Items">
					<MenuItem value="basic1">Basic Item 1</MenuItem>
					<MenuItem value="basic2">Basic Item 2</MenuItem>
				</MenuItemGroup>
				<MenuItemSeparator />
				<MenuItemGroup label="Checkboxes">
					<MenuCheckboxItem value="check1" checked={false} onCheckedChange={onCheckboxChange}>
						Checkbox 1
					</MenuCheckboxItem>
					<MenuCheckboxItem value="check2" checked={true} onCheckedChange={onCheckboxChange}>
						Checkbox 2
					</MenuCheckboxItem>
				</MenuItemGroup>
				<MenuItemSeparator />
				<MenuRadioItemGroup label="Radio Options" value="radio1" onValueChange={onRadioChange}>
					<MenuRadioItem value="radio1">Radio 1</MenuRadioItem>
					<MenuRadioItem value="radio2">Radio 2</MenuRadioItem>
				</MenuRadioItemGroup>
			</Menu>
		));

		await user.click(screen.getByRole("button", { name: "Complex Menu" }));

		await waitFor(() => {
			// Check all elements are rendered
			expect(screen.getByText("Basic Items")).toBeVisible();
			expect(screen.getByRole("menuitem", { name: "Basic Item 1" })).toBeVisible();
			expect(screen.getByText("Checkboxes")).toBeVisible();
			expect(screen.getByRole("menuitemcheckbox", { name: "Checkbox 1" })).toBeVisible();
			expect(screen.getByText("Radio Options")).toBeVisible();
			expect(screen.getByRole("menuitemradio", { name: "Radio 1" })).toBeVisible();
			expect(screen.getAllByRole("separator")).toHaveLength(2);
		});

		// Test basic item selection
		await user.click(screen.getByRole("menuitem", { name: "Basic Item 1" }));
		expect(onSelect).toHaveBeenCalledWith("basic1");
	});

	it("handles menu with mixed interactive elements", async () => {
		const user = userEvent.setup();
		const onCheckboxChange = vi.fn();
		const onRadioChange = vi.fn();

		render(() => (
			<Menu
				trigger={(props) => (
					<button type="button" {...props}>
						Mixed Menu
					</button>
				)}
				closeOnSelect={false}
			>
				<MenuItem value="regular">Regular Item</MenuItem>
				<MenuCheckboxItem value="checkbox" checked={false} onCheckedChange={onCheckboxChange}>
					Checkbox Item
				</MenuCheckboxItem>
				<MenuRadioItemGroup value="option1" onValueChange={onRadioChange}>
					<MenuRadioItem value="option1">Radio Option 1</MenuRadioItem>
					<MenuRadioItem value="option2">Radio Option 2</MenuRadioItem>
				</MenuRadioItemGroup>
			</Menu>
		));

		await user.click(screen.getByRole("button", { name: "Mixed Menu" }));

		await waitFor(() => {
			expect(screen.getByRole("menuitem", { name: "Regular Item" })).toBeVisible();
			expect(screen.getByRole("menuitemcheckbox", { name: "Checkbox Item" })).toBeVisible();
			expect(screen.getByRole("menuitemradio", { name: "Radio Option 1" })).toBeVisible();
		});

		// All items should be interactive
		const checkboxItem = screen.getByRole("menuitemcheckbox", {
			name: "Checkbox Item",
		});
		const radioItem = screen.getByRole("menuitemradio", {
			name: "Radio Option 2",
		});

		await user.click(checkboxItem);
		expect(onCheckboxChange).toHaveBeenCalledWith(true);

		await user.click(radioItem);
		expect(onRadioChange).toHaveBeenCalledWith("option2");
	});

	it("opens nested submenu and selects a submenu item", async () => {
		const user = userEvent.setup();
		const onRootSelect = vi.fn();
		const onSubSelect = vi.fn();

		render(() => (
			<Menu
				trigger={(props) => (
					<button type="button" {...props}>
						Nested Menu
					</button>
				)}
				onSelect={onRootSelect}
			>
				<MenuItem value="top">Top action</MenuItem>
				<MenuSub onSelect={onSubSelect}>
					<MenuSubTrigger>
						More
						<ChevronRight aria-hidden />
					</MenuSubTrigger>
					<MenuSubContent>
						<MenuItem value="nested-a">Nested A</MenuItem>
						<MenuItem value="nested-b">Nested B</MenuItem>
					</MenuSubContent>
				</MenuSub>
			</Menu>
		));

		await user.click(screen.getByRole("button", { name: "Nested Menu" }));

		await waitFor(() => {
			expect(screen.getByRole("menu")).toBeVisible();
		});

		const triggerItem = screen.getByRole("menuitem", { name: /More/i });
		await user.click(triggerItem);

		await waitFor(() => {
			expect(screen.getByRole("menuitem", { name: "Nested A" })).toBeVisible();
		});

		await user.click(screen.getByRole("menuitem", { name: "Nested A" }));

		expect(onSubSelect).toHaveBeenCalledWith("nested-a");
		expect(onRootSelect).not.toHaveBeenCalled();
	});
});
