import { DatePicker } from "@ark-ui/solid/date-picker";
import { Index } from "solid-js";

export function MonthView() {
	return (
		<DatePicker.View view="month" data-scope={"date-input"} data-view="month">
			<DatePicker.Context>
				{(datePicker) => (
					<>
						<DatePicker.Table data-scope={"date-input"}>
							<DatePicker.TableBody data-scope={"date-input"}>
								<Index
									each={datePicker().getMonthsGrid({
										columns: 4,
										format: "short",
									})}
								>
									{(months) => (
										<DatePicker.TableRow data-scope={"date-input"}>
											<Index each={months()}>
												{(month) => (
													<DatePicker.TableCell data-scope={"date-input"} value={month().value}>
														<DatePicker.TableCellTrigger data-scope={"date-input"}>
															{month().label}
														</DatePicker.TableCellTrigger>
													</DatePicker.TableCell>
												)}
											</Index>
										</DatePicker.TableRow>
									)}
								</Index>
							</DatePicker.TableBody>
						</DatePicker.Table>
					</>
				)}
			</DatePicker.Context>
		</DatePicker.View>
	);
}
