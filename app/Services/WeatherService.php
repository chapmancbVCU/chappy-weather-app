<?php
namespace App\Services;

use Core\Lib\Http\Api;

/**
 * Service that supports retrieving weather for current conditions.
 */
class WeatherService extends Api {
    private const STANDARD = 'http://api.openweathermap.org/data/2.5';

    public function __construct(bool $oneCall = false) {
        parent::__construct(
            baseUrl: self::STANDARD,
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