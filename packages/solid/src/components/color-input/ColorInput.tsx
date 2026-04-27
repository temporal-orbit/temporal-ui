import type { HTMLProps } from "@ark-ui/solid";
import { ColorPicker, parseColor } from "@ark-ui/solid/color-picker";
import type { ColorInputProps as CoreColorInputProps } from "@temporal-ui/core/color-input";
import { cx } from "@temporal-ui/core/utils/cx";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";
import { Field } from "../field";
import { Portal } from "solid-js/web";

export interface ColorInputProps extends CoreColorInputProps<JSX.Element>, Omit<HTMLProps<"input">, "value"> {}

export function ColorInput(_props: ColorInputProps) {
	const [fieldProps, rootProps, inputProps] = splitProps(
		_props,
		["label", "hint", "error", "required", "readOnly", "disabled", "testId"],
		["value", "onValueChange", "defaultValue", "className", "class", "position"],
	);

	return (
		<Field {...fieldProps} testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}>
			<ColorPicker.Root
				value={rootProps.value ? parseColor(String(rootProps.value)) : undefined}
				defaultValue={rootProps.defaultValue ? parseColor(String(rootProps.defaultValue)) : undefined}
				onValueChange={(details) => rootProps.onValueChange?.(details.value.toString("hex"))}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--root` : undefined}
				data-scope={"color-input"}
				openAutoFocus={false}
				positioning={{ placement: "bottom-start", ...rootProps.position }}
			>
				<ColorPicker.Control
					data-scope={"color-input"}
					data-testid={fieldProps.testId ? `${fieldProps.testId}--control` : undefined}
				>
					<ColorPicker.Trigger
						data-scope={"color-input"}
						class={cx(rootProps.className, rootProps.class)}
						aria-invalid={fieldProps.error ? true : undefined}
						data-testid={fieldProps.testId ? `${fieldProps.testId}--trigger` : undefined}
					>
						<ColorPicker.ChannelInput
							channel="hex"
							data-scope={"color-input"}
							data-testid={fieldProps.testId ? `${fieldProps.testId}--channel-input` : undefined}
						/>
						<ColorPicker.ValueSwatch
							style={{ position: "absolute" }}
							data-scope={"color-input"}
							data-testid={fieldProps.testId ? `${fieldProps.testId}--swatch` : undefined}
						/>
					</ColorPicker.Trigger>
				</ColorPicker.Control>
				<Portal>
					<ColorPicker.Positioner
						data-scope={"color-input"}
						data-testid={fieldProps.testId ? `${fieldProps.testId}--positioner` : undefined}
					>
						<ColorPicker.Content
							data-scope={"color-input"}
							data-testid={fieldProps.testId ? `${fieldProps.testId}--content` : undefined}
						>
							<ColorPicker.Area
								data-scope={"color-input"}
								data-testid={fieldProps.testId ? `${fieldProps.testId}--area` : undefined}
							>
								<ColorPicker.AreaBackground
									data-scope={"color-input"}
									data-testid={fieldProps.testId ? `${fieldProps.testId}--area-background` : undefined}
								/>
								<ColorPicker.AreaThumb
									data-scope={"color-input"}
									data-testid={fieldProps.testId ? `${fieldProps.testId}--area-thumb` : undefined}
								/>
							</ColorPicker.Area>
							<ColorPicker.ChannelSlider
								channel="hue"
								data-scope={"color-input"}
								data-testid={fieldProps.testId ? `${fieldProps.testId}--channel-slider` : undefined}
							>
								<ColorPicker.ChannelSliderTrack
									data-scope={"color-input"}
									data-testid={fieldProps.testId ? `${fieldProps.testId}--channel-slider-track` : undefined}
								/>
								<ColorPicker.ChannelSliderThumb
									data-scope={"color-input"}
									data-testid={fieldProps.testId ? `${fieldProps.testId}--channel-slider-thumb` : undefined}
								/>
							</ColorPicker.ChannelSlider>
						</ColorPicker.Content>
					</ColorPicker.Positioner>
				</Portal>
				<ColorPicker.HiddenInput
					{...inputProps}
					data-testid={fieldProps.testId ? `${fieldProps.testId}--input` : undefined}
					data-scope={"color-input"}
				/>
			</ColorPicker.Root>
		</Field>
	);
}
