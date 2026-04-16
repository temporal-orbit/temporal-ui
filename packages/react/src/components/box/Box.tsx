import type { BoxProps as CoreBoxProps } from "@temporal-ui/core/box";
import type React from "react";

export interface BoxProps extends CoreBoxProps<React.ReactNode>, React.HTMLAttributes<HTMLDivElement> {}

export function Box({
	children,
	testId,
	p,
	px,
	pl,
	pr,
	pt,
	pb,
	py,
	m,
	mx,
	ml,
	mr,
	mt,
	mb,
	my,
	w,
	h,
	...rest
}: BoxProps) {
	const style: React.CSSProperties = {};

	if (p) {
		style.padding = `calc(var(--spacing) * ${p})`;
	}
	if (px || pl) {
		style.paddingLeft = `calc(var(--spacing) * ${pl ?? px})`;
	}
	if (pr || px) {
		style.paddingRight = `calc(var(--spacing) * ${pr ?? px})`;
	}
	if (pt || py) {
		style.paddingTop = `calc(var(--spacing) * ${pt ?? py})`;
	}
	if (pb || py) {
		style.paddingBottom = `calc(var(--spacing) * ${pb ?? py})`;
	}
	if (m) {
		style.margin = `calc(var(--spacing) * ${m})`;
	}
	if (mx || ml) {
		style.marginLeft = `calc(var(--spacing) * ${ml ?? mx})`;
	}
	if (mr || mx) {
		style.marginRight = `calc(var(--spacing) * ${mr ?? mx})`;
	}
	if (mt || my) {
		style.marginTop = `calc(var(--spacing) * ${mt ?? my})`;
	}
	if (mb || my) {
		style.marginBottom = `calc(var(--spacing) * ${mb ?? my})`;
	}
	if (w) {
		style.width = typeof w === "string" ? w : `${w}px`;
	}
	if (h) {
		style.height = typeof h === "string" ? h : `${h}px`;
	}

	return (
		<div {...rest} style={{ ...style, ...rest.style }} data-testid={testId}>
			{children}
		</div>
	);
}
