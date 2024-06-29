import { DataTableRowEvent } from 'primereact/datatable';
import { Toast } from 'primereact/toast';

import { request } from '../../http/request';
import { TypeMethodFetch } from '../../utils/enum/enum';
import { IWeather } from '../../utils/interfaces/IWeather';

export const onRowExpand = (event: DataTableRowEvent,toast: React.RefObject<Toast>) =>
{
	toast.current?.show({ severity: 'info',summary: 'Product Expanded',detail: event.data.weather,life: 2000 });
};

export const onRowCollapse = (event: DataTableRowEvent,toast: React.RefObject<Toast>) =>
{
	toast.current?.show({ severity: 'success',summary: 'Product Collapsed',detail: event.data.weather,life: 2000 });
};

export const showMessage = (toast: React.RefObject<Toast>,severity: 'success' | 'error',detail: string) =>
{
	toast.current?.show({ severity: severity,summary: severity.toUpperCase(),detail: detail,life: 2000 });
};

export const updateData = (data: IWeather[],newData: IWeather,index?: number): IWeather[] =>
{
	const _data = [...data];
	let curIndex = -1;
	if (index)
		curIndex = index;
	else
		curIndex = _data.findIndex((elem) => elem.id === newData.id);
	if (curIndex === -1)
		return data;
	_data[curIndex] = newData;
	request('api/weather/' + newData.workerId,TypeMethodFetch.PUT,data);
	return _data;
};

export const deleteData = (data: IWeather[],id: number) =>
{
	const temp = [...data].filter((elem) => elem.id !== id);
	request(`api/weather/${id}`,TypeMethodFetch.DELETE);
	return temp;
};

export const allowExpansion = (rowData: IWeather): boolean =>
{
	return rowData.comment ? true : false;
};
