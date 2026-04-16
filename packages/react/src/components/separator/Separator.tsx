import type { SeparatorProps as CoreSeparatorProps } from "@temporal-ui/core/separator";
import type React from "react";

export interface SeparatorProps extends CoreSeparatorProps<React.ReactNode>, React.HTMLAttributes<HTMLHRElement> {}

export function Separator(props: SeparatorProps) {
	return <hr {...props} data-scope="separator" data-orientation={props.orientation} data-testid={props.testId} />;
}
