import type { ScrollAreaProps as CoreScrollAreaProps } from "@temporal-ui/core/scroll-area";
import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";
import { mergeProps, Show, splitProps, type JSX } from "solid-js";
import type { HTMLProps } from "@ark-ui/solid";

export interface ScrollAreaProps extends CoreScrollAreaProps<JSX.Element>, HTMLProps<"div"> {}

export function ScrollArea(props: ScrollAreaProps) {
	const [controlProps, boxProps] = splitProps(mergeProps({ orientation: "vertical" }, props), [
		"orientation",
		"classes",
		"children",
	]);
	return (
		<ArkScrollArea.Root {...boxProps}>
			<ArkScrollArea.Viewport class={controlProps.classes?.viewport} style={{ height: "100%" }}>
				<ArkScrollArea.Content class={controlProps.classes?.content}>{controlProps.children}</ArkScrollArea.Content>
			</ArkScrollArea.Viewport>
			<Show when={["vertical", "both"].includes(controlProps.orientation)}>
				<ArkScrollArea.Scrollbar orientation="vertical" class={controlProps.classes?.scrollbar}>
					<ArkScrollArea.Thumb class={controlProps.classes?.thumb} />
				</ArkScrollArea.Scrollbar>
			</Show>
			<Show when={["horizontal", "both"].includes(controlProps.orientation)}>
				<ArkScrollArea.Scrollbar orientation="horizontal" class={controlProps.classes?.scrollbar}>
					<ArkScrollArea.Thumb class={controlProps.classes?.thumb} />
				</ArkScrollArea.Scrollbar>
			</Show>
			<ArkScrollArea.Corner class={controlProps.classes?.corner} />
		</ArkScrollArea.Root>
	);
}
