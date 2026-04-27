import type { HTMLProps } from "@ark-ui/solid";
import type { SeparatorProps as CoreSeparatorProps } from "@temporal-ui/core/separator";
import type { JSX } from "solid-js";

export interface SeparatorProps extends CoreSeparatorProps<JSX.Element>, HTMLProps<"hr"> {}

export function Separator(props: SeparatorProps) {
	return <hr {...props} data-component="separator" data-orientation={props.orientation} data-testid={props.testId} />;
}
