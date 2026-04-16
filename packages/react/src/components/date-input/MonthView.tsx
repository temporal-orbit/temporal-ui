/** biome-ignore-all lint/suspicious/noArrayIndexKey: Default behavior from Ark UI examples */
import { DatePicker } from "@ark-ui/react/date-picker";

export function MonthView() {
	return (
		<DatePicker.View view="month" data-scope={"date-input"} data-view="month">
			<DatePicker.Context>
				{(datePicker) => (
					<>
						<DatePicker.Table data-scope={"date-input"}>
							<DatePicker.TableBody data-scope={"date-input"}>
								{datePicker.getMonthsGrid({ columns: 4, format: "short" }).map((months, id) => (
									<DatePicker.TableRow data-scope={"date-input"} key={id}>
										{months.map((month, id) => (
											<DatePicker.TableCell data-scope={"date-input"} key={id} value={month.value}>
												<DatePicker.TableCellTrigger data-scope={"date-input"}>
													{month.label}
												</DatePicker.TableCellTrigger>
											</DatePicker.TableCell>
										))}
									</DatePicker.TableRow>
								))}
							</DatePicker.TableBody>
						</DatePicker.Table>
					</>
				)}
			</DatePicker.Context>
		</DatePicker.View>
	);
}
