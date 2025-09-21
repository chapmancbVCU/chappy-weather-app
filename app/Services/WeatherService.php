<?php
namespace App\Services;

use Core\Lib\Http\Api;

/**
 * Service that supports retrieving weather for current conditions.
 */
class WeatherService extends Api {
    private const STANDARD = 'http://api.openweathermap.org/data/2.5';

    /**
     * Setup instance of this class.  Configures default query with 
     * appid and units for suggestions to be returned.
     */
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

    /**
     * Packages query for current conditions using free tier api call.
     *
     * @param array $query The query string
     * @return array The response data for the API request containing 
     * weather information.
     */
    public function current(array $query): array {
        $allowed = ['q', 'zip', 'lat', 'lon', 'units', 'lang'];
        $params = array_intersect_key($query, array_flip($allowed));
        return $this->get('/weather', $params);
    }
}