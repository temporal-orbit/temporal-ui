import { DatePicker } from "@ark-ui/solid/date-picker";
import { Index } from "solid-js";

export function YearView() {
	return (
		<DatePicker.View view="year" data-scope={"date-input"} data-view="year">
			<DatePicker.Context>
				{(datePicker) => (
					<>
						<DatePicker.Table data-scope={"date-input"}>
							<DatePicker.TableBody data-scope={"date-input"}>
								<Index each={datePicker().getYearsGrid({ columns: 4 })}>
									{(years) => (
										<DatePicker.TableRow data-scope={"date-input"}>
											<Index each={years()}>
												{(year) => (
													<DatePicker.TableCell data-scope={"date-input"} value={year().value}>
														<DatePicker.TableCellTrigger data-scope={"date-input"}>
															{year().label}
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
