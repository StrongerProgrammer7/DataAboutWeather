import EWeather from '../../../utils/enum/enum';
import { IWorker } from '../../../utils/interfaces/IWeather';

export enum ActionTypes
{
	DATETIME = 'datetime',
	TEMPERATURE = 'temperature',
	WORKER = 'worker',
	WEATHER = 'weather',
	COMMENT = 'comment'
}
interface IActionDatetime
{
	type: ActionTypes.DATETIME;
	payload: Date | null;
}
interface IActionTemperature
{
	type: ActionTypes.TEMPERATURE;
	payload: number;
}
interface IActionWorker
{
	type: ActionTypes.WORKER;
	payload: IWorker;
}
interface IActionWeather
{
	type: ActionTypes.WEATHER;
	payload: EWeather;
}
interface IActionComment
{
	type: ActionTypes.COMMENT;
	payload: string;
}

export type IAction = IActionComment | IActionTemperature | IActionDatetime | IActionWeather | IActionWorker;

export interface IInputs
{
	datetime: Date | null;
	temperature: number;
	worker: IWorker;
	weather: EWeather;
	comment: string;
}
