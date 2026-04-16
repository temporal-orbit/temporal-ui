/** biome-ignore-all lint/suspicious/noArrayIndexKey: Default behavior from Ark UI examples */
import { DatePicker } from "@ark-ui/react/date-picker";

export function YearView() {
	return (
		<DatePicker.View view="year" data-scope={"date-input"} data-view="year">
			<DatePicker.Context>
				{(datePicker) => (
					<>
						<DatePicker.Table data-scope={"date-input"}>
							<DatePicker.TableBody data-scope={"date-input"}>
								{datePicker.getYearsGrid({ columns: 4 }).map((years, id) => (
									<DatePicker.TableRow data-scope={"date-input"} key={id}>
										{years.map((year, id) => (
											<DatePicker.TableCell data-scope={"date-input"} key={id} value={year.value}>
												<DatePicker.TableCellTrigger data-scope={"date-input"}>
													{year.label}
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
