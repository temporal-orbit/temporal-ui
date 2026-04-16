import type React from "react";
import type { LoaderProps as CoreLoaderProps } from "@temporal-ui/core/loader";
import { cx } from "@temporal-ui/core/utils/cx";

export interface LoaderProps extends CoreLoaderProps<React.ReactNode>, React.HTMLAttributes<HTMLDivElement> {}

export function Loader(props: LoaderProps) {
	const { size = "md", className, testId, ...rest } = props;
	const baseClass = ["loader", size !== "md" ? size : ""].filter(Boolean).join("-");

	return <div className={cx(baseClass, className)} data-testid={testId} {...rest} />;
}
