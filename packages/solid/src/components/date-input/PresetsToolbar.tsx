import { DatePicker, type DatePickerDateRangePreset } from "@ark-ui/solid/date-picker";
import { For } from "solid-js";
import { Button, type ButtonProps } from "../button";

export interface PresetsToolbarProps {
	presets: Partial<Record<DatePickerDateRangePreset, string>>;
	presetButtonProps?: ButtonProps;
	tid: (suffix: string) => string | undefined;
}

export function PresetsToolbar(props: PresetsToolbarProps) {
	return (
		<div
			data-component={"date-input"}
			data-slot={"presets-toolbar"}
			data-testid={props.tid("--presets-toolbar")}
		>
			<For each={Object.entries(props.presets) as [DatePickerDateRangePreset, string][]}>
				{([preset, label]) => (
					<DatePicker.PresetTrigger
						value={preset}
						asChild={(p) => (
							<Button
								type={"button"}
								variant={"outline"}
								size="sm"
								{...props.presetButtonProps}
								{...p()}
								data-slot={"preset"}
								data-testid={props.tid(`--preset-${preset}`)}
							>
								{label}
							</Button>
						)}
					/>
				)}
			</For>
		</div>
	);
}
