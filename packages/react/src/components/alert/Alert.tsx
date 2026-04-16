import type { AlertProps as CoreAlertProps } from "@temporal-ui/core/alert";
import { cx } from "@temporal-ui/core/utils/cx";
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react";

export interface AlertProps extends CoreAlertProps<React.ReactNode>, React.HTMLAttributes<HTMLDivElement> {
	icon?: React.ReactNode;
}

const icons: Record<"default" | "info" | "success" | "warning" | "error", React.ReactNode> = {
	default: null,
	info: <Info />,
	success: <CircleCheck />,
	warning: <TriangleAlert />,
	error: <CircleX />,
};

export function Alert(props: AlertProps) {
	const { variant, icon, title, description, children, testId, ...divProps } = props;
	const baseClass = ["alert", variant || "default"].filter(Boolean).join("-");
	return (
		<div {...divProps} role="alert" className={cx(baseClass, props.className)} data-testid={testId}>
			{icon !== undefined ? icon : icons[variant || "default"]}
			{title && <h2>{title}</h2>}
			{description && <section>{description}</section>}
			{children && <section>{children}</section>}
		</div>
	);
}
