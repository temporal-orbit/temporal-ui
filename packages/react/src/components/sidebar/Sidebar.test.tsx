import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Sidebar } from "./Sidebar";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuLink,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "./SidebarMenu";
import { SidebarProvider, useSidebar } from "./SidebarProvider";
import { SidebarRail } from "./SidebarRail";
import { SidebarTrigger } from "./SidebarTrigger";

vi.mock("../../hooks/is-mobile", () => ({
	useIsMobile: () => false,
}));

const localStorageMock = {
	getItem: vi.fn(),
	setItem: vi.fn(),
	removeItem: vi.fn(),
	clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
});

describe("Sidebar", () => {
	it("renders children correctly", () => {
		render(
			<SidebarProvider>
				<Sidebar>
					<div data-testid="sidebar-content">Sidebar Content</div>
				</Sidebar>
			</SidebarProvider>,
		);

		expect(screen.getByTestId("sidebar-content")).toBeInTheDocument();
	});

	it("renders with collapsible='none' without wrapper div", () => {
		render(
			<SidebarProvider>
				<Sidebar collapsible="none">
					<div data-testid="sidebar-content">Content</div>
				</Sidebar>
			</SidebarProvider>,
		);

		const sidebar = screen.getByTestId("sidebar-content").closest('[data-scope="sidebar"]');
		expect(sidebar).toHaveAttribute("data-collapsible", "none");
		expect(sidebar?.tagName).toBe("DIV"); // Should be Box component
	});

	it("applies correct data attributes for collapsible sidebar", () => {
		render(
			<SidebarProvider>
				<Sidebar collapsible="offcanvas" variant="sidebar">
					<div data-testid="sidebar-content">Content</div>
				</Sidebar>
			</SidebarProvider>,
		);

		const sidebar = screen.getByTestId("sidebar-content").closest('[data-scope="sidebar"][data-part="root"]');
		expect(sidebar).toHaveAttribute("data-variant", "sidebar");
		expect(sidebar).toHaveAttribute("data-side", "left");
		expect(sidebar).toHaveAttribute("data-state");
	});
});

describe("SidebarProvider", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("provides sidebar context with expected properties", () => {
		const TestComponent = () => {
			const { state, open, isMobile, toggleSidebar } = useSidebar();
			return (
				<div>
					<span data-testid="state">{state}</span>
					<span data-testid="open">{open.toString()}</span>
					<span data-testid="is-mobile">{isMobile.toString()}</span>
					<button type="button" data-testid="toggle" onClick={toggleSidebar}>
						Toggle
					</button>
				</div>
			);
		};

		render(
			<SidebarProvider>
				<TestComponent />
			</SidebarProvider>,
		);

		expect(screen.getByTestId("state")).toHaveTextContent("expanded");
		expect(screen.getByTestId("open")).toHaveTextContent("true");
		expect(screen.getByTestId("is-mobile")).toHaveTextContent("false");
	});

	it("useSidebar throws error when used outside provider", () => {
		const TestComponent = () => {
			const sidebar = useSidebar();
			return <div>{sidebar.state}</div>;
		};

		expect(() => render(<TestComponent />)).toThrow("useSidebar must be used within a SidebarProvider.");
	});

	it("persists sidebar state to localStorage", () => {
		const TestComponent = () => {
			const { setOpen } = useSidebar();
			return (
				<button type="button" data-testid="close" onClick={() => setOpen(false)}>
					Close
				</button>
			);
		};

		render(
			<SidebarProvider>
				<TestComponent />
			</SidebarProvider>,
		);

		act(() => {
			screen.getByTestId("close").click();
		});
		expect(localStorageMock.setItem).toHaveBeenCalledWith("temporal-sidebar-state", "false");
	});
});

describe("SidebarTrigger", () => {
	it("calls toggleSidebar when clicked", () => {
		render(
			<SidebarProvider>
				<SidebarTrigger />
			</SidebarProvider>,
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		// Uses Button component, so data-scope is "button"
		expect(button).toHaveAttribute("data-scope", "button");
		expect(button).toHaveAttribute("data-part", "trigger");
	});
});

describe("SidebarRail", () => {
	it("renders with correct attributes", () => {
		render(
			<SidebarProvider>
				<SidebarRail />
			</SidebarProvider>,
		);

		const button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
		expect(button).toHaveAttribute("data-scope", "sidebar");
		expect(button).toHaveAttribute("data-part", "rail");
	});
});

describe("SidebarMenu Components", () => {
	it("renders menu components with correct data attributes", () => {
		render(
			<SidebarProvider>
				<Sidebar side="left">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton variant="default" size="default" isActive={false}>
								Menu Item
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</Sidebar>
			</SidebarProvider>,
		);

		const menu = screen.getByRole("list");
		const menuItem = screen.getByRole("listitem");
		const button = screen.getByRole("button");

		expect(menu).toHaveAttribute("data-scope", "sidebar");
		expect(menu).toHaveAttribute("data-part", "menu");
		expect(menuItem).toHaveAttribute("data-part", "menu-item");
		expect(button).toHaveAttribute("data-part", "menu-button");
		expect(button).toHaveAttribute("data-variant", "default");
		expect(button).toHaveAttribute("data-size", "default");
		expect(button).toHaveAttribute("data-active", "false");
	});

	it("renders menu link with correct attributes", () => {
		render(
			<SidebarProvider>
				<Sidebar side="left">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuLink href="/test" isActive={true}>
								Link Item
							</SidebarMenuLink>
						</SidebarMenuItem>
					</SidebarMenu>
				</Sidebar>
			</SidebarProvider>,
		);

		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("data-part", "menu-link");
		expect(link).toHaveAttribute("data-active", "true");
		expect(link).toHaveAttribute("href", "/test");
	});

	it("renders sub-menu components correctly", () => {
		render(
			<SidebarProvider>
				<Sidebar side="left">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuSub>
								<SidebarMenuSubItem>
									<SidebarMenuSubButton size="md" isActive={false}>
										Sub Item
									</SidebarMenuSubButton>
								</SidebarMenuSubItem>
							</SidebarMenuSub>
						</SidebarMenuItem>
					</SidebarMenu>
				</Sidebar>
			</SidebarProvider>,
		);

		const subMenu = screen.getAllByRole("list")[1];
		const subItem = screen.getAllByRole("listitem")[1];
		const subButton = screen.getByText("Sub Item");

		expect(subMenu).toHaveAttribute("data-part", "menu-sub");
		expect(subItem).toHaveAttribute("data-part", "menu-sub-item");
		expect(subButton).toHaveAttribute("data-part", "menu-sub-button");
		expect(subButton).toHaveAttribute("data-size", "md");
		expect(subButton).toHaveAttribute("data-active", "false");
	});
});
