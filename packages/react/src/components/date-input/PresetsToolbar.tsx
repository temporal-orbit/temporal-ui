import { DatePicker, type DatePickerDateRangePreset } from "@ark-ui/react/date-picker";
import { Button, type ButtonProps } from "../button";

export interface PresetsToolbarProps {
	presets: Partial<Record<DatePickerDateRangePreset, string>>;
	presetButtonProps?: ButtonProps;
	tid: (suffix: string) => string | undefined;
}

export function PresetsToolbar(props: PresetsToolbarProps) {
	const { presets, presetButtonProps, tid } = props;
	return (
		<div data-component={"date-input"} data-slot={"presets-toolbar"} data-testid={tid("--presets-toolbar")}>
			{(Object.entries(presets) as [DatePickerDateRangePreset, string][]).map(([preset, label]) => (
				<DatePicker.PresetTrigger key={preset} value={preset} asChild>
					<Button
						type={"button"}
						variant={"outline"}
						size="sm"
						{...presetButtonProps}
						data-slot={"preset"}
						data-testid={tid(`--preset-${preset}`)}
					>
						{label}
					</Button>
				</DatePicker.PresetTrigger>
			))}
		</div>
	);
}
