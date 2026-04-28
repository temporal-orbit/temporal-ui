import { DatePicker, parseDate, type DatePickerDateRangePreset } from "@ark-ui/react/date-picker";
import { Portal } from "@ark-ui/react/portal";
import type { DateInputProps as CoreDateInputProps } from "@temporal-ui/core/date-input";
import { testId as testIdFn } from "@temporal-ui/core/utils/string";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
		CoreDateInputProps<React.ReactNode>,
		Omit<React.ComponentProps<typeof DatePicker.Root>, "value" | "defaultValue" | "onValueChange"> {
	presets?: Partial<Record<DatePickerDateRangePreset, string>>;
	presetButtonProps?: ButtonProps;
}

export function DateInput(props: DateInputProps) {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		classes,
		testId,
		placeholder,
		value,
		defaultValue,
		onValueChange,
		position,
		startSection,
		endSection,
		rangeFormat,
		presets,
		presetButtonProps,
		...rootProps
	} = props;
	const tid = testIdFn(testId);
	return (
		<Field
			label={label}
			hint={hint}
			error={error}
			required={required}
			readOnly={readOnly}
			disabled={disabled}
			classes={classes}
			testId={tid("-field")}
		>
			<DateInputRoot
				{...rootProps}
				value={value?.map((date) => parseDate(date))}
				defaultValue={defaultValue?.map((date) => parseDate(date))}
				onValueChange={(details) => onValueChange?.(details.value.map((date) => date.toString()))}
				positioning={{ placement: "bottom-start", ...position }}
				data-testid={tid("--root")}
			>
				<DateInputControl data-testid={tid("--control")}>
					{startSection && (
						<div data-component={"date-input"} data-slot={"start-section"} data-testid={tid("--start-section")}>
							{startSection}
						</div>
					)}
					{endSection && (
						<div data-component={"date-input"} data-slot={"end-section"} data-testid={tid("--end-section")}>
							{endSection}
						</div>
					)}
					<DateInputContext>
						{(datePicker) => {
							return (
								<DateInputTrigger
									data-placeholder={datePicker.valueAsString.length === 0}
									data-testid={tid("--trigger")}
									data-with-start-section={startSection ? true : undefined}
									data-with-end-section={endSection ? true : undefined}
								>
									{datePicker.valueAsString.length
										? (rangeFormat?.(datePicker.valueAsDate) ?? datePicker.valueAsString.join(" - "))
										: (placeholder ?? `Select a date${rootProps.selectionMode === "range" ? " range" : ""}...`)}
								</DateInputTrigger>
							);
						}}
					</DateInputContext>
					<DateInputInput data-testid={tid("--input")} hidden />
				</DateInputControl>
				<Portal>
					<DateInputPositioner data-testid={tid("--positioner")}>
						<DateInputContent data-testid={tid("--content")}>
							{presets && Object.keys(presets).length > 0 ? (
								<PresetsToolbar presets={presets} presetButtonProps={presetButtonProps} tid={tid} />
							) : null}
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
