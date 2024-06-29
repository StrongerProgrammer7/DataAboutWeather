import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DropdownChangeEvent } from 'primereact/dropdown';
import { InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { FC,FormEvent,useState } from 'react';

import { setWeather } from '../../utils/const';
import { IWorker } from '../../utils/interfaces/IWeather';
import NumberTemperature from '../UI/input/NumberTemperature';
import DropDown from '../UI/select/DropDown/DropDown';
import TextArea from '../UI/textArea/TextArea';
import scss from './form.module.scss';
import { ActionTypes,IInputs,useForm } from './hook';

interface IForm
{
	workers: IWorker[];
	handleSubmit?: (data: IInputs) => void;
	handleCancel?: () => void;
}
const Form: FC<IForm> = ({ workers,handleSubmit,handleCancel }) =>
{
	const [state,dispatch] = useForm();
	const [isEmptyFieldWorker,setIsEmptyFieldWorker] = useState<boolean>(false);
	const [isEmptyDatetime,setIsEmptyDatetime] = useState<boolean>(false);

	const onSubmit = (e: FormEvent) =>
	{
		e.preventDefault();

		if (Object.keys(state.worker).length === 0)
		{
			setIsEmptyFieldWorker(true);
			console.log('state.worker',state.worker);
			setTimeout(() =>
			{
				setIsEmptyFieldWorker(false);
			},3000);
			return;
		}
		if (!state.datetime)
		{
			setIsEmptyDatetime(true);
			setTimeout(() =>
			{
				setIsEmptyDatetime(false);
			},3000);
			return;
		}

		handleSubmit?.(state);
	};

	const onChangeSelect = (e: DropdownChangeEvent) =>
	{
		if (e.target.id === 'weather')
			dispatch({ type: ActionTypes.WEATHER,payload: e.value });
		else if (e.target.id === 'worker')
			dispatch({ type: ActionTypes.WORKER,payload: e.value });
	};

	const onChangeTemperature = (e: InputNumberValueChangeEvent) => dispatch({ type: ActionTypes.TEMPERATURE,payload: e.value || 0 });
	const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch({ type: ActionTypes.COMMENT,payload: e.target.value });

	return (
		<form
			onSubmit={onSubmit}
		>
			<div className='flex flex-wrap flex-column gap-4 p-fluid'>
				<div className="flex gap-3 flex-wrap">
					<div className="flex-auto">
						<label htmlFor="calendar" className="font-bold block mb-2">Datetime</label>
						<Calendar
							className={isEmptyDatetime ? scss.border_red : ''}
							showButtonBar
							onClearButtonClick={() => dispatch({ type: ActionTypes.DATETIME,payload: null })}
							id='calendar'
							showTime
							hourFormat="24"
							value={state.datetime}
							onChange={(e) => 
							{
								if (e.value)
									dispatch({ type: ActionTypes.DATETIME,payload: e.value });
							}}
							required />
					</div>
					<div className="flex-auto">
						<NumberTemperature
							currentValue={state.temperature}
							onChange={onChangeTemperature}
							showLabel={true}
							onBlur={(e) =>
							{
								if (!e.target.value)
									dispatch({ type: ActionTypes.TEMPERATURE,payload: 0.1 });
							}
							}
						/>
					</div>
				</div>
				<div className="flex gap-3 flex-wrap">
					<div className="flex-auto mt-2">
						<DropDown
							currentValue={state.worker}
							onChange={onChangeSelect}
							optionLabel="name.surname"
							options={workers}
							placeholder="Select a Worker"
							type="worker"
							labelName="Select worker"
							className={isEmptyFieldWorker ? scss.border_red : ''}
							required
						/>
					</div>
					<div className="flex-auto mt-2">
						<DropDown
							currentValue={state.weather}
							onChange={onChangeSelect}
							options={setWeather}
							placeholder="Select a Weather"
							type="weather"
							required
							optionLabel=""
							labelName="Select weather"
						/>
					</div>
				</div>
				<div className="flex-auto mb-3">
					<TextArea
						label="Comment"
						defaultValue={state.comment}
						onChange={onChangeComment}
						placeholder="Your comment"

					/>
				</div>
			</div>
			<div className={scss.footer__btn_wrapper}>
				<Button
					type="submit"
					className={`${scss.btn} ${scss.btn_save}`}
					label="Save"
					icon="pi pi-check"
					onClick={onSubmit}
					autoFocus />
				{
					handleCancel &&
					<Button
						className={`${scss.btn} ${scss.btn_close} p-button-text`}
						label="Close"
						icon="pi pi-times"
						onClick={handleCancel} />
				}
			</div>
		</form>
	);
};

export default Form;
