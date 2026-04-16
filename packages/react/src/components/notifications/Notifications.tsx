import { Toast, Toaster, createToaster } from "@ark-ui/react";
import type { NotificationConfig, NotificationsProps } from "@temporal-ui/core/notifications";
import { XIcon } from "lucide-react";
import { Loader } from "../loader";

export type { NotificationsProps } from "@temporal-ui/core/notifications";

const toaster = createToaster({
	placement: "bottom-end",
	gap: 12,
});

export function showNotification(props: NotificationConfig) {
	return toaster.create({
		title: props.title,
		description: props.message,
		duration: props.duration,
		type: props.type ?? "info",
		action: props.action,
	});
}

export function Notifications(props: NotificationsProps) {
	const { placement, max, gap } = props;

	toaster.attrs.placement = placement ?? "bottom-end";
	toaster.attrs.max = max ?? 10;
	toaster.attrs.gap = gap ?? 12;

	return (
		<Toaster toaster={toaster}>
			{(toast) => (
				<Toast.Root key={toast.id}>
					<Toast.Title>
						{toast.type === "loading" && <Loader size="xs" />}
						{toast.title}
					</Toast.Title>
					<Toast.Description>{toast.description}</Toast.Description>
					{toast.action && <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>}
					<Toast.CloseTrigger aria-label="Close notification">
						<XIcon size={16} aria-hidden="true" focusable="false" />
					</Toast.CloseTrigger>
				</Toast.Root>
			)}
		</Toaster>
	);
}
