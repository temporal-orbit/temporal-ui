import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import type { AvatarProps as CoreAvatarProps } from "@temporal-ui/core/avatar";
import { cx } from "@temporal-ui/core/utils/cx";
import { getInitials } from "@temporal-ui/core/utils/string";
import { UserIcon } from "lucide-solid";
import { Show, splitProps } from "solid-js";

export interface AvatarProps extends CoreAvatarProps {}

export const Avatar = (_props: AvatarProps & ArkAvatar.RootProps) => {
	const [props, rootProps] = splitProps(_props, ["name", "src", "size", "className", "class", "testId"]);
	const baseClass = ["avatar", props.size !== "md" ? props.size : ""].filter(Boolean).join("-");
	return (
		<ArkAvatar.Root class={cx(baseClass, props.className, props.class)} {...rootProps} data-testid={props.testId}>
			<ArkAvatar.Fallback data-testid={props.testId ? `${props.testId}--fallback` : undefined}>
				<Show when={props.name} fallback={<UserIcon />}>
					{getInitials(props.name)}
				</Show>
			</ArkAvatar.Fallback>
			<ArkAvatar.Image
				src={props.src}
				alt={props.name}
				data-testid={props.testId ? `${props.testId}--image` : undefined}
			/>
		</ArkAvatar.Root>
	);
};
