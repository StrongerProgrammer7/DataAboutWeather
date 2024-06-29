import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import React,{ FC,useRef } from 'react';
import ReactDOM from 'react-dom';

import { request } from '../../../http/request';
import { workerApi } from '../../../service/WeatherService';
import { TypeMethodFetch } from '../../../utils/enum/enum';
import { IWeather } from '../../../utils/interfaces/IWeather';
import Form from '../../Form/Form';
import { IInputs } from '../../Form/hook';
import scss from './modaladdrecord.module.scss';

interface IModal
{
	visible: boolean;
	setVisible: React.Dispatch<React.SetStateAction<boolean>>;
	data: IWeather[];
	setData: React.Dispatch<React.SetStateAction<IWeather[]>>;
}
const ModalAddRecord: FC<IModal> = ({ visible,setVisible,data,setData }) =>
{
	const workers = workerApi.useGetAllWorkersQuery('');
	const toast = useRef<Toast>(null);
	const addRecord = async (state: IInputs) =>
	{
		if (!state.datetime)
			return;
		const _data = [...data];
		const temp: IWeather =
		{
			datetime: state.datetime.toString(),
			temperature: state.temperature,
			weather: state.weather,
			comment: state.comment,
			responsibility: state.worker,
			workerId: state.worker.id
		};

		try
		{
			const result = await request<IWeather>('api/addWeather',TypeMethodFetch.POST,temp);
			if (!result)
				throw { message: "Problem with data" };

			_data.push(result);
			setData(_data);
			toast.current?.show({ severity: 'success',summary: 'Success',detail: result.weather,life: 1000 });
			setTimeout(() =>
			{
				setVisible(false);
			},800);
		} catch (error)
		{
			console.log('error',error);
			toast.current?.show({ severity: 'error',summary: 'Error',detail: 'Problem with send',life: 2000 });
		}
	};
	const close = () => setVisible(false);

	return ReactDOM.createPortal(
		<Dialog visible={visible} modal
			header={'Add new information'}
			className={scss.modal}
			onHide={() => 
			{
				if (!visible) return; close();
			}}>
			{
				workers.data &&
				<Form
					workers={workers.data}
					handleCancel={close}
					handleSubmit={addRecord}
				/>
			}
			<Toast ref={toast} />
		</Dialog>
		,document.getElementById('portal')!
	);
};

export default ModalAddRecord;
