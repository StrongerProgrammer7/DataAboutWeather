
import 'primeicons/primeicons.css';

import { Column,ColumnEditorOptions } from 'primereact/column';
import { DataTable,DataTableExpandedRows,DataTableRowEditCompleteEvent,DataTableValueArray } from 'primereact/datatable';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useCallback,useRef,useState } from 'react';

import { workerApi } from '../../service/WeatherService';
import { FieldWeather } from '../../utils/enum/enum';
import { IWeather } from '../../utils/interfaces/IWeather';
import ModalAddRecord from '../Modal/ModalAddRecord/ModalAddRecord';
import ModalRequiredAction from '../Modal/ModalRequired/ModalRequiredAction';
import PulsarBtn from '../UI/btn/PulsarBtn/PulsarBtn';
import DropDown from '../UI/select/DropDown/DropDown';
import scss from './table.module.scss';
import { allowExpansion,deleteData,onRowCollapse,onRowExpand,showMessage,updateData } from './Table.service';
import { datetimeEditor,datetimeTemplate,rowExpansionTemplate,tempBodyTemplate,temperatureEdit,weatherBodyTemplate,weatherTypeEditor,workerBodyTemplate } from './Table.template';

export default function TableWeatherData({ data }: { data: IWeather[]; })
{
	const workers = workerApi.useGetAllWorkersQuery('');
	const [dataWeather,setDataWeather] = useState<IWeather[]>(data);
	const [expandedRows,setExpandedRows] = useState<DataTableExpandedRows | DataTableValueArray | undefined>(undefined);
	const [isVisible,setVisible] = useState<boolean>(false);
	const [choseRowForDelete,setChoseRowForDelete] = useState<IWeather | undefined>();
	const toast = useRef<Toast>(null);

	const editData = useCallback(async (data: IWeather,index?: number) =>
	{
		try 
		{
			const updatedData = await updateData(dataWeather,data,index);
			setDataWeather(updatedData);
		}
		catch (error) 
		{
			console.log('error',error);
			showMessage(toast,'error','Update data: ' + data.weather);
		}
	},[dataWeather]);

	const onRowEditComplete = (e: DataTableRowEditCompleteEvent) =>
	{
		const { newData,index } = e;
		editData(newData as IWeather,index);
	};

	const deleteRow = useCallback(async (id?: number) =>
	{
		if (!id)
			return;

		try
		{
			setDataWeather(await deleteData(dataWeather,id));
			showMessage(toast,'success','Delete data: ' + id);
		}
		catch (error)
		{
			console.log('error',error);
			showMessage(toast,'error','Delete data: ' + id);
		}
		finally
		{
			setChoseRowForDelete(undefined);
		}

	},[dataWeather]);


	const deleteTemplate = useCallback((rowData: IWeather): JSX.Element =>
	{
		return <button
			className={scss.btn_delete}
			onClick={() => setChoseRowForDelete(rowData)}
		>
			<i className="pi pi-times" style={{ fontSize: '1.5rem' }}>
			</i>
		</button>;
	},[]);

	const workersTypeEditor = (options: ColumnEditorOptions) =>
	{
		return (
			<DropDown
				type='worker'
				currentValue={options.value}
				onChange={(e: DropdownChangeEvent) => options.editorCallback!(e.value)}
				placeholder='Select a Worker'
				options={workers.data || []}
				optionLabel='name'
			/>
		);
	};

	return (
		<>
			<div className="card p-fluid">
				<Toast ref={toast} />
				<DataTable
					expandedRows={expandedRows}
					onRowToggle={(e) => setExpandedRows(e.data)}
					onRowExpand={(e) => onRowExpand(e,toast)}
					onRowCollapse={(e) => onRowCollapse(e,toast)}
					rowExpansionTemplate={(elem) => rowExpansionTemplate({ data: elem,editData: editData })}
					paginator
					value={dataWeather}
					editMode="row"
					dataKey="id"
					rows={5}
					rowsPerPageOptions={[5,10,25,50]}
					onRowEditComplete={onRowEditComplete}
					tableStyle={{ minWidth: '250px' }}>
					<Column expander={allowExpansion} style={{ width: '2rem' }} />
					<Column
						field={FieldWeather.datetime}
						header="Datetime"
						body={datetimeTemplate}
						editor={datetimeEditor}
						style={{ width: '20%' }}></Column>
					<Column
						field={FieldWeather.responsibility}
						body={workerBodyTemplate}
						header="Worker"
						editor={workersTypeEditor}
						style={{ width: '30%' }}></Column>

					<Column
						field={FieldWeather.weather}
						header="Weather"
						body={weatherBodyTemplate}
						editor={weatherTypeEditor}
						style={{ width: '20%' }}></Column>

					<Column
						field={FieldWeather.temperature}
						header="Temperature"

						body={tempBodyTemplate}
						editor={temperatureEdit}
						style={{ width: '5%',textAlign: 'center' }}></Column>
					<Column
						header="Edit"
						rowEditor={true}
						headerStyle={{ width: '10%' }}
						bodyStyle={{ textAlign: 'center' }}>

					</Column>
					<Column
						className='flex '
						body={deleteTemplate}
						header="Delete"
						headerStyle={{ width: '5%',minWidth: '4rem' }}
						bodyStyle={{ textAlign: 'center' }}>
					</Column>
				</DataTable>

			</div>
			<div className={scss.wrapper_btn}>
				<PulsarBtn
					onClick={() => setVisible(true)}
					title='New record'
				/>
			</div>
			<ModalAddRecord
				visible={isVisible}
				setVisible={setVisible}
				data={dataWeather}
				setData={setDataWeather}

			/>
			<ModalRequiredAction
				isVisible={choseRowForDelete ? true : false}
				approveAction={() => deleteRow(choseRowForDelete?.id)}
				cancelAction={() => setChoseRowForDelete(undefined)}

			/>
		</>
	);
}
