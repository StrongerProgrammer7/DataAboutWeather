
enum EWeather
{
	SUNNY = 'sunny',
	CLOUDY = 'cloudy',
	RAINY = 'rainy',
	WINDY = 'windy',
	SNOWY = 'snowy',

}

export enum FieldWeather
{
	id = 'id',
	datetime = 'datetime',
	temperature = 'temperature',
	weather = 'weather',
	responsibility = 'responsibility',
	workerId = 'workerId',
	comment = 'comment'
}
export enum TypeMethodFetch
{
	GET = 'GET',
	DELETE = 'DELETE',
	POST = 'POST',
	PUT = 'PUT'
}

export default EWeather;
