import { InputNumber,InputNumberValueChangeEvent } from 'primereact/inputnumber';
import React from 'react';

import useDebounce from '../../../hooks/useDebounce';

interface IInputNumber
{
	currentValue: number;
	onChange: (e: InputNumberValueChangeEvent) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement,Element>) => void;
	min?: number;
	max?: number;
	minFractionDigits?: number;
	maxFractionDigits?: number;
	showLabel?: boolean;

}
const NumberTemperature: React.FC<IInputNumber> = ({ currentValue,onChange,onBlur,min = -50,max = 60,minFractionDigits = 0,maxFractionDigits = 2,showLabel = false }) =>
{
	const debounced = useDebounce(onChange,300);
	return (
		<>
			{
				showLabel &&
				<label htmlFor="temperature" className="font-bold block mb-2">Temperature</label>
			}
			<InputNumber
				mode="decimal"
				id="temperature"
				min={min}
				max={max}
				value={currentValue}
				onValueChange={debounced}
				onBlur={onBlur}
				minFractionDigits={minFractionDigits}
				maxFractionDigits={maxFractionDigits}
				required />
		</>
	);
};

export default NumberTemperature;
