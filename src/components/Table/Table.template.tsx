import { Calendar } from 'primereact/calendar';
import { Column,ColumnEditorOptions } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Tag } from 'primereact/tag';

import { setWeather } from '../../utils/const';
import { FieldWeather } from '../../utils/enum/enum';
import { IWeather } from '../../utils/interfaces/IWeather';
import NumberTemperature from '../UI/input/NumberTemperature';
import DropDown from '../UI/select/DropDown/DropDown';
import TextArea from '../UI/textArea/TextArea';

interface IRowExpansionTemplate
{
	data: IWeather;
	editData: (rowData: IWeather) => void;
}

export const rowExpansionTemplate = ({ data,editData }: IRowExpansionTemplate): React.ReactNode =>
{
	const temp = { ...data };
	return (
		<div className="p-3">
			<DataTable value={[temp]}
			>
				<Column
					field={FieldWeather.comment}
					header="Comment"
					onCellEditComplete={(e) => editData(e.newRowData)}
					editor={textEditor}
					style={{ width: '20%' }}></Column>
			</DataTable>
		</div>
	);
};

export const datetimeTemplate = (rowData: IWeather) =>
{
	return new Date(rowData.datetime).toLocaleString();
};


export const tempBodyTemplate = (rowData: IWeather) =>
{
	return new Intl.NumberFormat('ru-RU',{
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	}).format(rowData.temperature);
};

export const weatherBodyTemplate = (rowData: IWeather) =>
{
	return <Tag value={rowData.weather}></Tag>;
};


export const workerBodyTemplate = (rowData: IWeather) =>
{
	return <div className="flex align-items-center">
		<div>{rowData.responsibility?.name} {rowData.responsibility?.surname}</div>
	</div>;
};


/*-------------------Editor--------------------*/
export const datetimeEditor = (options: ColumnEditorOptions) =>
{

	return <Calendar
		showTime
		hourFormat="24"
		value={new Date(options.value)}
		onChange={(e) => options.editorCallback!(e.value)}
	/>;
};

export const temperatureEdit = (options: ColumnEditorOptions) =>
{
	return <NumberTemperature
		currentValue={options.value}
		onBlur={(e) =>
		{
			if (!e.target.value)
				options.editorCallback!(0.1);
		}}
		onChange={(e: InputNumberValueChangeEvent) => options.editorCallback!(e.value || 0)}
	/>;
};


export const weatherTypeEditor = (options: ColumnEditorOptions) =>
{
	return (
		<DropDown
			currentValue={options.value}
			onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
			optionLabel=''
			options={setWeather}
			placeholder='Select a Weather'
			type='weather'
		/>
	);
};

function textEditor(options: ColumnEditorOptions)
{
	return <TextArea
		defaultValue={options.value}
		onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => options.editorCallback!(e.target.value)}
		placeholder="Your comment"
	/>;
}
