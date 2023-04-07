import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class WeatherService {
  constructor(private configService: ConfigService) {}
  async getWeather(city: string): Promise<any> {
    const apiKey = 'HQWcZw9nBUeaSNFAVlLH3dsGWiTAc4v4';
    const locationSearchUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${city}`;
    const locationResponse = await axios.get(locationSearchUrl);
    const locationKey = locationResponse.data[0].Key;
    const forecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&details=true`;
    const forecastResponse = await axios.get(forecastUrl);
    return forecastResponse.data;
  }
}
