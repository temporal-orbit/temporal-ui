import { DatePicker, parseDate, type DatePickerDateRangePreset } from "@ark-ui/solid/date-picker";
import type { DateInputProps as CoreDateInputProps } from "@temporal-ui/core/date-input";
import { testId } from "@temporal-ui/core/utils/string";
import { ChevronLeft, ChevronRight } from "lucide-solid";
import { Show, splitProps, type ComponentProps, type JSX } from "solid-js";
import { Portal } from "solid-js/web";
import type { ButtonProps } from "../button";
import { Field } from "../field";
import {
	DateInputContent,
	DateInputContext,
	DateInputControl,
	DateInputInput,
	DateInputNextTrigger,
	DateInputPositioner,
	DateInputPrevTrigger,
	DateInputRoot,
	DateInputTrigger,
	DateInputViewControl,
	DateInputViewTrigger,
} from "./Components";
import { DayView } from "./DayView";
import { MonthView } from "./MonthView";
import { PresetsToolbar } from "./PresetsToolbar";
import { YearView } from "./YearView";

export interface DateInputProps
	extends
		CoreDateInputProps<JSX.Element>,
		Omit<ComponentProps<typeof DatePicker.Root>, "value" | "defaultValue" | "onValueChange"> {
	presets?: Partial<Record<DatePickerDateRangePreset, string>>;
	presetButtonProps?: ButtonProps;
}

export function DateInput(props: DateInputProps) {
	const [fieldProps, controlProps, rootProps] = splitProps(
		props,
		["label", "hint", "error", "required", "readOnly", "disabled", "classes", "testId"],
		[
			"placeholder",
			"value",
			"defaultValue",
			"onValueChange",
			"position",
			"startSection",
			"endSection",
			"rangeFormat",
			"presets",
			"presetButtonProps",
		],
	);
	const tid = testId(fieldProps.testId);
	return (
		<Field {...fieldProps} testId={tid("-field")}>
			<DateInputRoot
				{...rootProps}
				value={controlProps.value?.map((date) => parseDate(date))}
				defaultValue={controlProps.defaultValue?.map((date) => parseDate(date))}
				onValueChange={(details) =>
					controlProps.onValueChange?.(details.value.map((date) => date.toString()))
				}
				positioning={{ placement: "bottom-start", ...controlProps.position }}
				data-testid={tid("--root")}
			>
				<DateInputControl data-testid={tid("--control")}>
					<Show when={controlProps.startSection || controlProps.endSection}>
						<div
							data-component={"date-input"}
							data-slot={"start-section"}
							data-testid={tid("--start-section")}
						>
							{controlProps.startSection}
						</div>
					</Show>
					<Show when={controlProps.endSection}>
						<div
							data-component={"date-input"}
							data-slot={"end-section"}
							data-testid={tid("--end-section")}
						>
							{controlProps.endSection}
						</div>
					</Show>
					<DateInputContext>
						{(datePicker) => {
							return (
								<DateInputTrigger
									data-placeholder={datePicker().valueAsString.length === 0}
									data-testid={tid("--trigger")}
									data-with-start-section={controlProps.startSection ? true : undefined}
									data-with-end-section={controlProps.endSection ? true : undefined}
								>
									<Show
										when={datePicker().valueAsString.length > 0}
										fallback={
											controlProps.placeholder ??
											`Select a date${rootProps.selectionMode === "range" ? " range" : ""}...`
										}
									>
										{controlProps.rangeFormat?.(datePicker().valueAsDate) ??
											datePicker().valueAsString.join(" - ")}
									</Show>
								</DateInputTrigger>
							);
						}}
					</DateInputContext>
					<DateInputInput data-testid={tid("--input")} hidden />
				</DateInputControl>
				<Portal>
					<DateInputPositioner data-testid={tid("--positioner")}>
						<DateInputContent data-testid={tid("--content")}>
							<Show
								when={
									controlProps.presets && Object.keys(controlProps.presets).length > 0
										? controlProps.presets
										: false
								}
							>
								{(presets) => (
									<PresetsToolbar
										presets={presets()}
										presetButtonProps={controlProps.presetButtonProps}
										tid={tid}
									/>
								)}
							</Show>
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
							<DayView numOfMonths={rootProps.numOfMonths} />
							<MonthView />
							<YearView />
						</DateInputContent>
					</DateInputPositioner>
				</Portal>
			</DateInputRoot>
		</Field>
	);
}
