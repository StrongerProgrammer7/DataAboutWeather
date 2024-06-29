import EWeather from '../enum/enum';

export interface IWeather
{
	id?: number;
	datetime: string;
	temperature: number;
	weather: EWeather;
	responsibility?: IWorker;
	workerId?: number;
	comment?: string;
}

export interface IWorker
{
	id: number;
	name: string;
	surname: string;
}
