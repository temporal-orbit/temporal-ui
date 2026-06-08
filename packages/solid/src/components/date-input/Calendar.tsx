import { DatePicker, parseDate } from "@ark-ui/solid/date-picker";
import type { DateInputProps } from "@temporal-ui/core/date-input";
import { DayView } from "./DayView";
import { MonthView } from "./MonthView";
import { YearView } from "./YearView";
import { ChevronLeft, ChevronRight } from "lucide-solid";
import {
	DateInputNextTrigger,
	DateInputPrevTrigger,
	DateInputRoot,
	DateInputViewControl,
	DateInputViewTrigger,
} from "./Components";
import { splitProps, type ComponentProps, type JSX } from "solid-js";
import { testId } from "@temporal-ui/core/utils/string";

export function Calendar(
	props: DateInputProps<JSX.Element> & ComponentProps<typeof DatePicker.Root>,
) {
	const [controlProps, rootProps] = splitProps(props, [
		"testId",
		"value",
		"defaultValue",
		"onValueChange",
	]);
	const tid = testId(controlProps.testId);
	return (
		<DateInputRoot
			{...rootProps}
			value={controlProps.value?.map((date) => parseDate(date))}
			defaultValue={controlProps.defaultValue?.map((date) => parseDate(date))}
			onValueChange={(details) =>
				controlProps.onValueChange?.(details.value.map((date) => date.toString()))
			}
			inline
			data-testid={tid("--root")}
		>
			<DateInputViewControl data-testid={tid("--view-control")}>
				<DateInputPrevTrigger data-testid={tid("--prev-trigger")}>
					<ChevronLeft />
				</DateInputPrevTrigger>
				<DateInputViewTrigger data-testid={tid("--view-trigger")}>
					<DatePicker.RangeText />
				</DateInputViewTrigger>
				<DateInputNextTrigger data-testid={tid("--next-trigger")}>
					<ChevronRight />
				</DateInputNextTrigger>
			</DateInputViewControl>
			<DayView numOfMonths={props.numOfMonths} />
			<MonthView />
			<YearView />
		</DateInputRoot>
	);
}
