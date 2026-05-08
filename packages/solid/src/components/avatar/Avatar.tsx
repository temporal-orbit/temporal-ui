import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import { resolveAvatarDataColor, type AvatarProps as CoreAvatarProps } from "@temporal-ui/core/avatar";
import { cx } from "@temporal-ui/core/utils/cx";
import { getInitials } from "@temporal-ui/core/utils/string";
import { UserIcon } from "lucide-solid";
import { splitProps } from "solid-js";

export interface AvatarProps extends CoreAvatarProps {}

export const Avatar = (_props: AvatarProps & ArkAvatar.RootProps) => {
	const [props, rootProps] = splitProps(_props, ["name", "src", "size", "color", "className", "class", "testId"]);
	return (
		<ArkAvatar.Root
			class={cx(props.className, props.class)}
			data-testid={props.testId}
			data-color={resolveAvatarDataColor(props.name, props.color ?? "auto")}
			{...rootProps}
			data-size={props.size ?? "md"}
		>
			<ArkAvatar.Image
				src={props.src}
				alt={props.name ?? undefined}
				data-testid={props.testId ? `${props.testId}--image` : undefined}
			/>
			<ArkAvatar.Fallback data-testid={props.testId ? `${props.testId}--fallback` : undefined}>
				{getInitials(props.name ?? "") || <UserIcon />}
			</ArkAvatar.Fallback>
		</ArkAvatar.Root>
	);
};
