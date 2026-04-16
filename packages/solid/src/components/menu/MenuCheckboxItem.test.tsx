import { cleanup, render, screen, waitFor } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { Button } from "../button";
import { Menu, type MenuProps } from "./Menu";
import { MenuCheckboxItem } from "./MenuCheckboxItem";

describe("MenuCheckboxItem Component", () => {
	const MenuWrapper = (props: Omit<MenuProps, "trigger">) => (
		<Menu {...props} trigger={(props) => <Button {...props}>Trigger</Button>}>
			{props.children}
		</Menu>
	);

	beforeEach(() => {
		cleanup();
	});

	it("renders checkbox menu item correctly", async () => {
		const user = userEvent.setup();
		const onCheckedChange = vi.fn();

		render(() => (
			<MenuWrapper>
				<MenuCheckboxItem value="checkbox" checked={false} onCheckedChange={onCheckedChange}>
					Checkbox Item
				</MenuCheckboxItem>
			</MenuWrapper>
		));

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(screen.getByRole("menuitemcheckbox", { name: "Checkbox Item" })).toBeVisible();
		});
	});

	it("shows check indicator when checked", async () => {
		const user = userEvent.setup();
		const onCheckedChange = vi.fn();

		render(() => (
			<MenuWrapper>
				<MenuCheckboxItem value="checkbox" checked={true} onCheckedChange={onCheckedChange}>
					Checked Item
				</MenuCheckboxItem>
			</MenuWrapper>
		));

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			const checkboxItem = screen.getByRole("menuitemcheckbox", {
				name: "Checked Item",
			});
			expect(checkboxItem).toBeVisible();
			expect(checkboxItem).toHaveAttribute("data-state", "checked");
		});
	});

	it("toggles checked state when clicked", async () => {
		const user = userEvent.setup();
		const onCheckedChange = vi.fn();

		render(() => (
			<MenuWrapper closeOnSelect={false}>
				<MenuCheckboxItem value="checkbox" checked={false} onCheckedChange={onCheckedChange}>
					Toggle Item
				</MenuCheckboxItem>
			</MenuWrapper>
		));

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(screen.getByRole("menuitemcheckbox", { name: "Toggle Item" })).toBeVisible();
		});

		const checkboxItem = screen.getByRole("menuitemcheckbox", {
			name: "Toggle Item",
		});
		await user.click(checkboxItem);

		expect(onCheckedChange).toHaveBeenCalledWith(true);
	});
});
