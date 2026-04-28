import { DatePicker } from "@ark-ui/solid";
import { cx } from "@temporal-ui/core/utils/cx";
import { splitProps, type ComponentProps } from "solid-js";

export const DateInputRoot = (props: ComponentProps<typeof DatePicker.Root>) => {
	return <DatePicker.Root {...props} data-scope={"date-input"} />;
};

export const DateInputControl = (props: ComponentProps<typeof DatePicker.Control>) => {
	const [local, others] = splitProps(props, ["class", "classList"]);
	return (
		<DatePicker.Control
			{...others}
			data-scope={"date-input"}
			class={cx("group", local.class)}
			classList={local.classList}
		/>
	);
};

export const DateInputTrigger = (props: ComponentProps<typeof DatePicker.Trigger>) => {
	return <DatePicker.Trigger {...props} data-scope={"date-input"} />;
};

export const DateInputInput = (props: ComponentProps<typeof DatePicker.Input>) => {
	return <DatePicker.Input {...props} data-scope={"date-input"} />;
};

export const DateInputPrevTrigger = (props: ComponentProps<typeof DatePicker.PrevTrigger>) => {
	return <DatePicker.PrevTrigger {...props} data-scope={"date-input"} />;
};

export const DateInputNextTrigger = (props: ComponentProps<typeof DatePicker.NextTrigger>) => {
	return <DatePicker.NextTrigger {...props} data-scope={"date-input"} />;
};

export const DateInputViewTrigger = (props: ComponentProps<typeof DatePicker.ViewTrigger>) => {
	return <DatePicker.ViewTrigger {...props} data-scope={"date-input"} />;
};

export const DateInputViewControl = (props: ComponentProps<typeof DatePicker.ViewControl>) => {
	return <DatePicker.ViewControl {...props} data-scope={"date-input"} />;
};

export const DateInputRangeText = (props: ComponentProps<typeof DatePicker.RangeText>) => {
	return <DatePicker.RangeText {...props} data-scope={"date-input"} />;
};

export const DateInputPositioner = (props: ComponentProps<typeof DatePicker.Positioner>) => {
	return <DatePicker.Positioner {...props} data-scope={"date-input"} />;
};

export const DateInputContent = (props: ComponentProps<typeof DatePicker.Content>) => {
	return <DatePicker.Content {...props} data-scope={"date-input"} />;
};

export const DateInputContext = DatePicker.Context;
