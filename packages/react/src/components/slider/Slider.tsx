import type { SliderProps as CoreSliderProps } from "@temporal-ui/core/slider";
import { Slider as ArkSlider } from "@ark-ui/react/slider";
import type React from "react";
import { Field } from "../field";
import { forwardRef } from "react";
export interface SliderProps
	extends
		CoreSliderProps<React.ReactNode>,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "max" | "min" | "step"> {}

export const Slider = forwardRef<HTMLInputElement, SliderProps & ArkSlider.RootProps>(
	(props, ref) => {
		const {
			label,
			hint,
			error,
			required,
			readOnly,
			disabled,
			testId,
			showValue,
			marks,
			showMarkDashes,
			...rootProps
		} = props;
		return (
			<Field
				label={label}
				hint={hint}
				required={required}
				readOnly={readOnly}
				disabled={disabled}
				error={error}
				testId={props.testId ? `${props.testId}-field` : undefined}
			>
				<ArkSlider.Root
					{...rootProps}
					readOnly={readOnly}
					disabled={disabled}
					data-testid={testId ? `${testId}--root` : undefined}
				>
					<ArkSlider.Control data-with-value={showValue}>
						<ArkSlider.Track>
							<ArkSlider.Range />
						</ArkSlider.Track>
						<ArkSlider.Thumb index={0}>
							<ArkSlider.HiddenInput
								ref={ref}
								data-testid={testId ? `${testId}--input` : undefined}
							/>
							{showValue && <ArkSlider.ValueText />}
						</ArkSlider.Thumb>
					</ArkSlider.Control>
					{marks && (
						<ArkSlider.MarkerGroup data-with-dashes={showMarkDashes ? true : undefined}>
							{Object.entries(marks).map(([value, label]) => (
								<ArkSlider.Marker key={value} value={Number(value)}>
									{label}
								</ArkSlider.Marker>
							))}
						</ArkSlider.MarkerGroup>
					)}
				</ArkSlider.Root>
			</Field>
		);
	},
);
