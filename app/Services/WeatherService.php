<?php
namespace App\Services;

use Core\Lib\Utilities\Env;
use Core\Lib\Http\Api;
/**
 * Service that supports the WeatherService model.
 */
class WeatherService extends Api{
    private const ONE_CALL = 'http://api.openweathermap.org/data/3.0/onecall';
    private const STANDARD = 'http://api.openweathermap.org/data/2.5';
}