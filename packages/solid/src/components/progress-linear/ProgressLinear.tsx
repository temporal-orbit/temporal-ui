import {
	ProgressRange,
	ProgressRootProvider,
	ProgressTrack,
	ProgressValueText,
	useProgress,
	type ProgressRootProps,
} from "@ark-ui/solid/progress";
import type { ProgressLinearProps as CoreProgressLinearProps } from "@temporal-ui/core/progress-linear";
import { Field } from "../field";
import { mergeProps, Show, splitProps, type JSX } from "solid-js";

export interface ProgressLinearProps extends CoreProgressLinearProps<JSX.Element> {}

export function ProgressLinear(props: ProgressLinearProps & ProgressRootProps) {
	const [fieldProps, progressRest] = splitProps(props, [
		"label",
		"hint",
		"error",
		"required",
		"readOnly",
		"disabled",
		"testId",
		"classes",
		"showValueText",
		"children",
	]);
	const [valueSplit, progressRootProps] = splitProps(progressRest, ["value"]);

	/** Solid Zag treats `value={null}` as uncontrolled; use `defaultValue={null}` for indeterminate. */
	const progressMachineProps = () => {
		if (valueSplit.value === null) {
			return mergeProps(progressRootProps, { defaultValue: null });
		}
		return mergeProps(progressRootProps, {
			get value() {
				return valueSplit.value;
			},
		});
	};

	const progressApi = useProgress(progressMachineProps);

	return (
		<Field {...fieldProps} testId={fieldProps.testId ? `${fieldProps.testId}-field` : undefined}>
			<ProgressRootProvider
				value={progressApi}
				data-testid={fieldProps.testId ? `${fieldProps.testId}--root` : undefined}
			>
				{props.children ?? (
					<>
						<ProgressTrack>
							<ProgressRange />
						</ProgressTrack>
						<Show when={fieldProps.showValueText}>
							<ProgressValueText
								data-testid={fieldProps.testId ? `${fieldProps.testId}--value-text` : undefined}
							/>
						</Show>
					</>
				)}
			</ProgressRootProvider>
		</Field>
	);
}
