import { DatePicker } from "@ark-ui/solid/date-picker";
import { createMemo, Index } from "solid-js";

export interface DayViewProps {
	numOfMonths?: number;
}

export function DayView(props: DayViewProps) {
	const { numOfMonths = 1 } = props;

	return (
		<DatePicker.View view="day" data-scope={"date-input"} data-view="day">
			<div data-scope={"date-input"} data-part="months-container">
				<DatePicker.Context>
					{(datePicker) => (
						<Index each={Array.from({ length: numOfMonths })}>
							{(_, i) => {
								const offset = createMemo(() => datePicker().getOffset({ months: i }));
								return (
									<DatePicker.Table data-scope={"date-input"}>
										<DatePicker.TableHead data-scope={"date-input"}>
											<DatePicker.TableRow data-scope={"date-input"}>
												<Index each={datePicker().weekDays}>
													{(weekDay) => (
														<DatePicker.TableHeader data-scope={"date-input"}>{weekDay().short}</DatePicker.TableHeader>
													)}
												</Index>
											</DatePicker.TableRow>
										</DatePicker.TableHead>
										<DatePicker.TableBody data-scope={"date-input"}>
											<Index each={offset().weeks}>
												{(week) => (
													<DatePicker.TableRow data-scope={"date-input"}>
														<Index each={week()}>
															{(day) => (
																<DatePicker.TableCell
																	value={day()}
																	visibleRange={offset().visibleRange}
																	data-scope={"date-input"}
																>
																	<DatePicker.TableCellTrigger data-scope={"date-input"}>
																		{day().day}
																	</DatePicker.TableCellTrigger>
																</DatePicker.TableCell>
															)}
														</Index>
													</DatePicker.TableRow>
												)}
											</Index>
										</DatePicker.TableBody>
									</DatePicker.Table>
								);
							}}
						</Index>
					)}
				</DatePicker.Context>
			</div>
		</DatePicker.View>
	);
}
