import { Avatar as ArkAvatar, useAvatarContext } from "@ark-ui/solid/avatar";
import type { AvatarProps as CoreAvatarProps } from "@temporal-ui/core/avatar";
import { cx } from "@temporal-ui/core/utils/cx";
import { getInitials } from "@temporal-ui/core/utils/string";
import { UserIcon } from "lucide-solid";
import { createEffect, Show, splitProps } from "solid-js";

export interface AvatarProps extends CoreAvatarProps {}

/**
 * Zag's avatar machine runs `checkImageStatus` on enter before the `<img>` exists in the DOM, so
 * `getImageEl` is null and already-decoded images never emit `img.loaded`. Sync once the image
 * node is mounted (and when `src` changes) via the public machine API.
 */
function AvatarImageWithStatusSync(props: {
	src: string | undefined;
	alt: string | undefined;
	"data-testid": string | undefined;
}) {
	let imgEl: HTMLImageElement | undefined;
	const avatar = useAvatarContext();

	const syncFromElement = () => {
		const img = imgEl;
		if (!img) return;
		if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
			avatar().setLoaded();
		} else if (img.complete) {
			avatar().setError();
		}
	};

	createEffect(() => {
		void props.src;
		queueMicrotask(syncFromElement);
	});

	return (
		<ArkAvatar.Image
			ref={(el) => {
				imgEl = el ?? undefined;
				queueMicrotask(syncFromElement);
			}}
			src={props.src}
			alt={props.alt}
			data-testid={props["data-testid"]}
		/>
	);
}

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
			<AvatarImageWithStatusSync
				src={props.src}
				alt={props.name}
				data-testid={props.testId ? `${props.testId}--image` : undefined}
			/>
		</ArkAvatar.Root>
	);
};
