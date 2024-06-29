import { useReducer } from 'react';

import EWeather from '../../../utils/enum/enum';
import { IWorker } from '../../../utils/interfaces/IWeather';
import { ActionTypes,IAction,IInputs } from './useForm.types';

const initialInput: IInputs =
{
	datetime: new Date(),
	temperature: 0.0,
	comment: '',
	weather: EWeather.SUNNY,
	worker: {} as IWorker
};

const inputReducer = (state: IInputs,action: IAction) =>
{
	const { type,payload } = action;

	switch (type)
	{
		case ActionTypes.DATETIME:

			return {
				...state,
				datetime: payload
			};
		case ActionTypes.COMMENT:
			return {
				...state,
				comment: payload
			};
		case ActionTypes.TEMPERATURE:
			return {
				...state,
				temperature: payload
			};
		case ActionTypes.WEATHER:
			return {
				...state,
				weather: payload
			};
		case ActionTypes.WORKER:
			return {
				...state,
				worker: payload
			};
		default:
			return state;
	}
};

function useForm(): [IInputs,React.Dispatch<IAction>]
{
	const [state,dispatch] = useReducer(inputReducer,initialInput);
	return [state,dispatch];
}

export default useForm;
