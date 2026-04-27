import { ColorPicker, parseColor } from "@ark-ui/react/color-picker";
import { Portal } from "@ark-ui/react/portal";
import type { ColorInputProps as CoreColorInputProps } from "@temporal-ui/core/color-input";
import type React from "react";
import { forwardRef } from "react";
import { Field } from "../field";

export interface ColorInputProps
	extends
		CoreColorInputProps<React.ReactNode>,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue" | "value"> {}

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>((props, ref) => {
	const {
		label,
		hint,
		error,
		required,
		readOnly,
		disabled,
		testId,
		value,
		defaultValue,
		onValueChange,
		className,
		position,
		...inputProps
	} = props;
	return (
		<Field
			label={label}
			hint={hint}
			required={required}
			readOnly={readOnly}
			error={error}
			disabled={disabled}
			testId={testId ? `${testId}-field` : undefined}
		>
			<ColorPicker.Root
				value={value ? parseColor(String(value)) : undefined}
				defaultValue={defaultValue ? parseColor(String(defaultValue)) : undefined}
				onValueChange={(details) => onValueChange?.(details.value.toString("hex"))}
				data-testid={testId ? `${testId}--root` : undefined}
				openAutoFocus={false}
				positioning={{ placement: "bottom-start", ...position }}
			>
				<ColorPicker.Control data-testid={testId ? `${testId}--control` : undefined}>
					<ColorPicker.Trigger
						className={className}
						aria-invalid={error ? true : undefined}
						data-testid={testId ? `${testId}--trigger` : undefined}
					>
						<ColorPicker.ChannelInput channel="hex" data-testid={testId ? `${testId}--channel-input` : undefined} />
						<ColorPicker.ValueSwatch
							style={{ position: "absolute" }}
							data-testid={testId ? `${testId}--swatch` : undefined}
						/>
					</ColorPicker.Trigger>
				</ColorPicker.Control>
				<Portal>
					<ColorPicker.Positioner data-testid={testId ? `${testId}--positioner` : undefined}>
						<ColorPicker.Content data-testid={testId ? `${testId}--content` : undefined}>
							<ColorPicker.Area data-testid={testId ? `${testId}--area` : undefined}>
								<ColorPicker.AreaBackground data-testid={testId ? `${testId}--area-background` : undefined} />
								<ColorPicker.AreaThumb data-testid={testId ? `${testId}--area-thumb` : undefined} />
							</ColorPicker.Area>
							<ColorPicker.ChannelSlider channel="hue" data-testid={testId ? `${testId}--channel-slider` : undefined}>
								<ColorPicker.ChannelSliderTrack data-testid={testId ? `${testId}--channel-slider-track` : undefined} />
								<ColorPicker.ChannelSliderThumb data-testid={testId ? `${testId}--channel-slider-thumb` : undefined} />
							</ColorPicker.ChannelSlider>
						</ColorPicker.Content>
					</ColorPicker.Positioner>
				</Portal>
				<ColorPicker.HiddenInput ref={ref} {...inputProps} data-testid={testId ? `${testId}--input` : undefined} />
			</ColorPicker.Root>
		</Field>
	);
});
