import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { UserIcon } from "lucide-react";
import { forwardRef } from "react";
import type { AvatarProps as AvatarPropsCore } from "@temporal-ui/core/avatar";
import { resolveAvatarDataColor } from "@temporal-ui/core/utils/avatar-variant";
import { cx } from "@temporal-ui/core/utils/cx";
import { getInitials } from "@temporal-ui/core/utils/string";

export interface AvatarProps extends AvatarPropsCore {}

/**
 * Avatar shows a photo when `src` loads successfully; otherwise it shows initials from `name`, or a
 * default user icon when initials are empty. When `color` is `"auto"` (default), the fallback
 * background is a deterministic accent derived from `name` (hash); omit `name`, use only
 * whitespace, or set `color` to `"none"` for the neutral muted fallback. Accent styles apply only
 * to the fallback layer — they do not show behind a loaded image.
 */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps & ArkAvatar.RootProps>((props, ref) => {
	const { name, src, color = "auto", className, testId, ...rootProps } = props;
	const size = props.size !== "md" ? props.size : "";
	const baseClass = ["avatar", size].filter(Boolean).join("-");
	const dataColor = resolveAvatarDataColor(name, color);
	return (
		<ArkAvatar.Root
			ref={ref}
			className={cx(baseClass, className)}
			data-testid={testId}
			data-color={dataColor}
			{...rootProps}
		>
			<ArkAvatar.Image src={src} alt={name} data-testid={testId ? `${testId}--image` : undefined} />
			<ArkAvatar.Fallback data-testid={testId ? `${testId}--fallback` : undefined}>
				{getInitials(name ?? "") || <UserIcon />}
			</ArkAvatar.Fallback>
		</ArkAvatar.Root>
	);
});

Avatar.displayName = "Avatar";
