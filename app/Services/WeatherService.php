<?php
namespace App\Services;

use Core\Lib\Utilities\Env;
use Core\Lib\Http\Api;
/**
 * Service that supports the WeatherService model.
 */
class WeatherService extends Api {
    private const GEO_LOCATE = 'http://api.openweathermap.org/geo/1.0/direct';
    private const ONE_CALL = 'http://api.openweathermap.org/data/3.0/onecall';
    private const STANDARD = 'http://api.openweathermap.org/data/2.5';

    public function __construct(bool $oneCall = false) {
        $baseUrl = ($oneCall) ? self::ONE_CALL : self::STANDARD;
        parent::__construct(
            baseUrl: $baseUrl,
            cacheNamespace: 'owm',
            defaultHeaders: ['Accept' => 'application/json'],
            defaultQuery: [
                'appid' => env('OWM_API_KEY'),
                'units' => 'imperial'
            ],
            defaultTtl: 120,
            timeout: 6
        );
    }

    public function current(array $query): array {
        $allowed = ['q', 'zip', 'lat', 'lon', 'units', 'lang'];
        $params = array_intersect_key($query, array_flip($allowed));

        return $this->get('/weather', $params);
    }
}