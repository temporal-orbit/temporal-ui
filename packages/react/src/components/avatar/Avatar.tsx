import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import {
	resolveAvatarDataColor,
	type AvatarProps as AvatarPropsCore,
} from "@temporal-ui/core/avatar";
import { getInitials } from "@temporal-ui/core/utils/string";
import { UserIcon } from "lucide-react";
import { forwardRef } from "react";

export interface AvatarProps extends AvatarPropsCore {}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps & ArkAvatar.RootProps>(
	(props, ref) => {
		const { name, src, color = "auto", className, testId, size, ...rootProps } = props;
		const dataColor = resolveAvatarDataColor(name, color);
		return (
			<ArkAvatar.Root
				ref={ref}
				className={className}
				data-testid={testId}
				data-color={dataColor}
				{...rootProps}
				data-size={size ?? "md"}
			>
				<ArkAvatar.Image
					src={src}
					alt={name ?? undefined}
					data-testid={testId ? `${testId}--image` : undefined}
				/>
				<ArkAvatar.Fallback data-testid={testId ? `${testId}--fallback` : undefined}>
					{getInitials(name ?? "") || <UserIcon />}
				</ArkAvatar.Fallback>
			</ArkAvatar.Root>
		);
	},
);

Avatar.displayName = "Avatar";
