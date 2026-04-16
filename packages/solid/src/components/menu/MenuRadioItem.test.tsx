import { cleanup, render, screen, waitFor } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { Menu, type MenuProps } from "./Menu";
import { MenuRadioItem } from "./MenuRadioItem";
import { MenuRadioItemGroup } from "./MenuRadioItemGroup";

describe("MenuRadioItem Component", () => {
	const MenuWrapper = (props: Omit<MenuProps, "trigger">) => (
		<Menu
			trigger={(_props) => (
				<button type="button" {..._props}>
					Trigger
				</button>
			)}
			{...props}
		>
			{props.children}
		</Menu>
	);

	beforeEach(() => {
		cleanup();
	});

	it("renders radio menu item correctly", async () => {
		const user = userEvent.setup();
		render(() => (
			<MenuWrapper>
				<MenuRadioItemGroup value="option1">
					<MenuRadioItem value="option1">Option 1</MenuRadioItem>
				</MenuRadioItemGroup>
			</MenuWrapper>
		));

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(screen.getByRole("menuitemradio", { name: "Option 1" })).toBeVisible();
		});
	});

	it("shows radio indicator when selected", async () => {
		const user = userEvent.setup();
		render(() => (
			<MenuWrapper>
				<MenuRadioItemGroup value="option1">
					<MenuRadioItem value="option1">Selected Option</MenuRadioItem>
				</MenuRadioItemGroup>
			</MenuWrapper>
		));

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			const radioItem = screen.getByRole("menuitemradio", {
				name: "Selected Option",
			});
			expect(radioItem).toBeVisible();
			expect(radioItem).toHaveAttribute("data-state", "checked");
		});
	});
});
