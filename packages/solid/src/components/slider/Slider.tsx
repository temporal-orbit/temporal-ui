import type { SliderProps as CoreSliderProps } from "@temporal-ui/core/slider";
import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import { Field } from "../field";
import { For, Show, splitProps, type JSX } from "solid-js";
export interface SliderProps extends CoreSliderProps<JSX.Element> {}

export function Slider(props: SliderProps & ArkSlider.RootProps) {
	const [fieldProps, controlProps, rootProps] = splitProps(
		props,
		["label", "hint", "error", "required", "readOnly", "disabled", "testId", "classes"],
		["showValue", "marks", "showMarkDashes"],
	);
	return (
		<Field {...fieldProps} testId={props.testId ? `${props.testId}-field` : undefined}>
			<ArkSlider.Root
				{...rootProps}
				readOnly={fieldProps.readOnly}
				disabled={fieldProps.disabled}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--root` : undefined}
			>
				<ArkSlider.Control data-with-value={controlProps.showValue}>
					<ArkSlider.Track>
						<ArkSlider.Range />
					</ArkSlider.Track>
					<ArkSlider.Thumb index={0}>
						<ArkSlider.HiddenInput
							data-testid={fieldProps.testId ? `${fieldProps.testId}--input` : undefined}
						/>
						<Show when={controlProps.showValue}>
							<ArkSlider.ValueText />
						</Show>
					</ArkSlider.Thumb>
				</ArkSlider.Control>
				<Show when={controlProps.marks}>
					<ArkSlider.MarkerGroup data-with-dashes={controlProps.showMarkDashes ? true : undefined}>
						<For each={Object.entries(controlProps.marks || {})}>
							{([value, label]) => (
								<ArkSlider.Marker value={Number(value)}>{label}</ArkSlider.Marker>
							)}
						</For>
					</ArkSlider.MarkerGroup>
				</Show>
			</ArkSlider.Root>
		</Field>
	);
}
