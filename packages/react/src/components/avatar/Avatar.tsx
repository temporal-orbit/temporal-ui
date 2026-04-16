import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { UserIcon } from "lucide-react";
import { forwardRef } from "react";
import type { AvatarProps as AvatarPropsCore } from "@temporal-ui/core/avatar";
import { cx } from "@temporal-ui/core/utils/cx";
import { getInitials } from "@temporal-ui/core/utils/string";

export interface AvatarProps extends AvatarPropsCore {}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps & ArkAvatar.RootProps>((props, ref) => {
	const { name, src, className, testId, ...rootProps } = props;
	const size = props.size !== "md" ? props.size : "";
	const baseClass = ["avatar", size].filter(Boolean).join("-");
	return (
		<ArkAvatar.Root ref={ref} className={cx(baseClass, className)} data-testid={testId} {...rootProps}>
			<ArkAvatar.Fallback>{getInitials(name) || <UserIcon />}</ArkAvatar.Fallback>
			<ArkAvatar.Image src={src} alt={name} data-testid={testId ? `${testId}--image` : undefined} />
		</ArkAvatar.Root>
	);
});
