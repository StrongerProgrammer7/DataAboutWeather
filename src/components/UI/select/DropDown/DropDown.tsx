import { Dropdown,DropdownChangeEvent,DropdownProps } from 'primereact/dropdown';
import React,{ memo } from 'react';

import EWeather from '../../../../utils/enum/enum';
import { IWorker } from '../../../../utils/interfaces/IWeather';

interface ISelect
{
	options: EWeather[] | IWorker[];
	currentValue: IWorker | EWeather;
	placeholder: string;
	onChange: (e: DropdownChangeEvent) => void;
	valueTemplate?: (option: IWorker | EWeather,props: DropdownProps) => JSX.Element;
	itemTemplate?: (option: IWorker | EWeather) => string | JSX.Element;
	type: 'worker' | 'weather';
	optionLabel: string;
	labelName?: string;
	required?: boolean;
	className?: string;
}


const DropDown: React.FC<ISelect> = ({ currentValue,options,placeholder,type,optionLabel,labelName,required,className,onChange,valueTemplate,itemTemplate }) =>
{
	const selectedWorkerTemplate = (option: IWorker,props: DropdownProps) =>
	{
		if (option)
		{
			return (
				<div className="flex align-items-center">
					<div>{option.name} {option.surname}</div>
				</div>
			);
		}

		return <span>{props.placeholder}</span>;
	};

	const workerTemplate = (option: IWorker) =>
	{
		return option.name + ' ' + option.surname;
	};
	return (
		<>
			{
				labelName &&
				<label htmlFor={type} className="font-bold block mb-2">{labelName}</label>
			}
			<Dropdown
				style={{ border: '1px solid #e5e7eb' }}
				id={type}
				className={className}
				value={currentValue}
				options={options}
				optionLabel={optionLabel}
				onChange={onChange}
				placeholder={placeholder}
				valueTemplate={type === 'weather' ? valueTemplate : selectedWorkerTemplate}
				itemTemplate={type === 'worker' ? workerTemplate : itemTemplate}
				required={required}
			/>
		</>
	);
};

const MemoizedDropDown = memo(DropDown);

export default MemoizedDropDown;
