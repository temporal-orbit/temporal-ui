import { DatePicker } from "@ark-ui/react";
import { cx } from "@temporal-ui/core/utils/cx";
import type React from "react";

export const DateInputRoot = (props: React.ComponentProps<typeof DatePicker.Root>) => {
	return <DatePicker.Root {...props} data-scope={"date-input"} />;
};

export const DateInputControl = ({
	className,
	...props
}: React.ComponentProps<typeof DatePicker.Control>) => {
	return (
		<DatePicker.Control {...props} data-scope={"date-input"} className={cx("group", className)} />
	);
};

export const DateInputTrigger = (props: React.ComponentProps<typeof DatePicker.Trigger>) => {
	return <DatePicker.Trigger {...props} data-scope={"date-input"} />;
};

export const DateInputInput = (props: React.ComponentProps<typeof DatePicker.Input>) => {
	return <DatePicker.Input {...props} data-scope={"date-input"} />;
};

export const DateInputPrevTrigger = (
	props: React.ComponentProps<typeof DatePicker.PrevTrigger>,
) => {
	return <DatePicker.PrevTrigger {...props} data-scope={"date-input"} />;
};

export const DateInputNextTrigger = (
	props: React.ComponentProps<typeof DatePicker.NextTrigger>,
) => {
	return <DatePicker.NextTrigger {...props} data-scope={"date-input"} />;
};

export const DateInputViewTrigger = (
	props: React.ComponentProps<typeof DatePicker.ViewTrigger>,
) => {
	return <DatePicker.ViewTrigger {...props} data-scope={"date-input"} />;
};

export const DateInputViewControl = (
	props: React.ComponentProps<typeof DatePicker.ViewControl>,
) => {
	return <DatePicker.ViewControl {...props} data-scope={"date-input"} />;
};

export const DateInputRangeText = (props: React.ComponentProps<typeof DatePicker.RangeText>) => {
	return <DatePicker.RangeText {...props} data-scope={"date-input"} />;
};

export const DateInputPositioner = (props: React.ComponentProps<typeof DatePicker.Positioner>) => {
	return <DatePicker.Positioner {...props} data-scope={"date-input"} />;
};

export const DateInputContent = (props: React.ComponentProps<typeof DatePicker.Content>) => {
	return <DatePicker.Content {...props} data-scope={"date-input"} />;
};

export const DateInputContext = DatePicker.Context;
