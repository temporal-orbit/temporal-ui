import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { testId } from "@temporal-ui/core/utils/string";
import { Show, type JSX } from "solid-js";
import { cx } from "@temporal-ui/core/utils/cx";

export interface PopoverContentProps {
	testId?: string;
	title?: string;
	description?: string;
	className?: string;
	children?: JSX.Element;
	classes?: {
		content?: string;
		title?: string;
		description?: string;
	};
}

export function PopoverContent(props: PopoverContentProps) {
	const tid = testId(props.testId);
	return (
		<ArkPopover.Positioner data-testid={tid("--positioner")}>
			<ArkPopover.Content
				data-testid={tid("--content")}
				class={cx(props.classes?.content, props.className)}
			>
				<Show when={props.title}>
					<ArkPopover.Title class={props.classes?.title} data-testid={tid("--title")}>
						{props.title}
					</ArkPopover.Title>
				</Show>
				<Show when={props.description}>
					<ArkPopover.Description
						class={props.classes?.description}
						data-testid={tid("--description")}
					>
						{props.description}
					</ArkPopover.Description>
				</Show>
				{props.children}
			</ArkPopover.Content>
		</ArkPopover.Positioner>
	);
}
