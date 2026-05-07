import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import type { AvatarProps as CoreAvatarProps } from "@temporal-ui/core/avatar";
import { resolveAvatarDataColor } from "@temporal-ui/core/utils/avatar-variant";
import { cx } from "@temporal-ui/core/utils/cx";
import { getInitials } from "@temporal-ui/core/utils/string";
import { UserIcon } from "lucide-solid";
import { splitProps } from "solid-js";

export interface AvatarProps extends CoreAvatarProps {}

/**
 * Avatar shows a photo when `src` loads successfully; otherwise it shows initials from `name`, or a
 * default user icon when initials are empty. When `color` is `"auto"` (default), the fallback
 * background is a deterministic accent derived from `name` (hash); omit `name`, use only
 * whitespace, or set `color` to `"none"` for the neutral muted fallback. Accent styles apply only
 * to the fallback layer — they do not show behind a loaded image.
 */
export const Avatar = (_props: AvatarProps & ArkAvatar.RootProps) => {
	const [props, rootProps] = splitProps(_props, ["name", "src", "size", "color", "className", "class", "testId"]);
	const baseClass = ["avatar", props.size !== "md" ? props.size : ""].filter(Boolean).join("-");
	return (
		<ArkAvatar.Root
			class={cx(baseClass, props.className, props.class)}
			data-testid={props.testId}
			data-color={resolveAvatarDataColor(props.name, props.color ?? "auto")}
			{...rootProps}
		>
			<ArkAvatar.Image
				src={props.src}
				alt={props.name}
				data-testid={props.testId ? `${props.testId}--image` : undefined}
			/>
			<ArkAvatar.Fallback data-testid={props.testId ? `${props.testId}--fallback` : undefined}>
				{getInitials(props.name ?? "") || <UserIcon />}
			</ArkAvatar.Fallback>
		</ArkAvatar.Root>
	);
};
