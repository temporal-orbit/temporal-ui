/** biome-ignore-all lint/suspicious/noArrayIndexKey: Default behavior from Ark UI examples */
import { DatePicker } from "@ark-ui/react/date-picker";

export interface DayViewProps {
	numOfMonths?: number;
}

export function DayView(props: DayViewProps) {
	const { numOfMonths = 1 } = props;

	return (
		<DatePicker.View view="day" data-scope={"date-input"} data-view="day">
			<div data-scope={"date-input"} data-part="months-container">
				<DatePicker.Context>
					{(datePicker) =>
						Array.from({ length: numOfMonths }).map((_, i) => {
							const offset = datePicker.getOffset({ months: i });
							return (
								<DatePicker.Table key={i} data-scope={"date-input"}>
									<DatePicker.TableHead data-scope={"date-input"}>
										<DatePicker.TableRow data-scope={"date-input"}>
											{datePicker.weekDays.map((weekDay, id) => (
												<DatePicker.TableHeader data-scope={"date-input"} key={id}>
													{weekDay.short}
												</DatePicker.TableHeader>
											))}
										</DatePicker.TableRow>
									</DatePicker.TableHead>
									<DatePicker.TableBody data-scope={"date-input"}>
										{offset.weeks.map((week, id) => (
											<DatePicker.TableRow data-scope={"date-input"} key={id}>
												{week.map((day, id) => (
													<DatePicker.TableCell
														data-scope={"date-input"}
														key={id}
														value={day}
														visibleRange={offset.visibleRange}
														className="group"
													>
														<DatePicker.TableCellTrigger data-scope={"date-input"}>
															{day.day}
														</DatePicker.TableCellTrigger>
													</DatePicker.TableCell>
												))}
											</DatePicker.TableRow>
										))}
									</DatePicker.TableBody>
								</DatePicker.Table>
							);
						})
					}
				</DatePicker.Context>
			</div>
		</DatePicker.View>
	);
}
