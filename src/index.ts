require('dotenv').config();
import { WeatherClient } from "./struct/Client";

export const client = new WeatherClient();

client.start();