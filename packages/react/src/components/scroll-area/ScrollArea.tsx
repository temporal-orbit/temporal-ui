import type { ScrollAreaProps as CoreScrollAreaProps } from "@temporal-ui/core/scroll-area";
import { ScrollArea as ArkScrollArea } from "@ark-ui/react/scroll-area";

export interface ScrollAreaProps extends CoreScrollAreaProps<React.ReactNode>, React.HTMLAttributes<HTMLDivElement> {}

export function ScrollArea(props: ScrollAreaProps) {
	const { orientation = "vertical", classes, children, ...boxProps } = props;
	return (
		<ArkScrollArea.Root {...boxProps}>
			<ArkScrollArea.Viewport className={classes?.viewport} style={{ height: "100%" }}>
				<ArkScrollArea.Content className={classes?.content}>{children}</ArkScrollArea.Content>
			</ArkScrollArea.Viewport>
			{["vertical", "both"].includes(orientation) && (
				<ArkScrollArea.Scrollbar orientation="vertical" className={classes?.scrollbar}>
					<ArkScrollArea.Thumb className={classes?.thumb} />
				</ArkScrollArea.Scrollbar>
			)}
			{orientation && ["horizontal", "both"].includes(orientation) && (
				<ArkScrollArea.Scrollbar orientation="horizontal" className={classes?.scrollbar}>
					<ArkScrollArea.Thumb className={classes?.thumb} />
				</ArkScrollArea.Scrollbar>
			)}
			<ArkScrollArea.Corner className={classes?.corner} />
		</ArkScrollArea.Root>
	);
}
