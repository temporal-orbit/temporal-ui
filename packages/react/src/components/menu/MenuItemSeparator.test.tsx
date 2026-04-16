import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Menu, type MenuProps } from "./Menu";
import { MenuItem } from "./MenuItem";
import { MenuItemSeparator } from "./MenuItemSeparator";

describe("MenuItemSeparator Component", () => {
	const MenuWrapper = ({ children, ...props }: Omit<MenuProps, "trigger">) => (
		<Menu trigger={<button type="button">Trigger</button>} {...props}>
			{children}
		</Menu>
	);

	beforeEach(() => {
		cleanup();
	});

	it("renders separator correctly", async () => {
		const user = userEvent.setup();
		render(
			<MenuWrapper>
				<MenuItem value="item1">Item 1</MenuItem>
				<MenuItemSeparator />
				<MenuItem value="item2">Item 2</MenuItem>
			</MenuWrapper>,
		);

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(screen.getByRole("separator")).toBeVisible();
		});
	});

	it("accepts additional props", async () => {
		const user = userEvent.setup();
		render(
			<MenuWrapper>
				<MenuItem value="item1">Item 1</MenuItem>
				<MenuItemSeparator testId="custom-separator" />
				<MenuItem value="item2">Item 2</MenuItem>
			</MenuWrapper>,
		);

		await user.click(screen.getByRole("button"));

		await waitFor(() => {
			expect(screen.getByTestId("custom-separator")).toBeVisible();
		});
	});
});
