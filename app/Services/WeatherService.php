<?php
namespace App\Services;

use Core\Lib\Http\Api;
use InvalidArgumentException;

/**
 * Service that supports retrieving weather for current conditions.
 */
class WeatherService extends Api {
    private const GEO_LOCATE = 'http://api.openweathermap.org/geo/1.0';
    private const ONE_CALL = 'http://api.openweathermap.org/data/3.0';
    private const STANDARD = 'http://api.openweathermap.org/data/2.5';
    /**
     * Setup instance of this class.  Configures default query with 
     * appid and units for suggestions to be returned.
     */
    public function __construct(string $mode = self::STANDARD) {
        
        self::isValidMode($mode);
        parent::__construct(
            baseUrl: $mode,
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

    /**
     * Packages query for geo location based on user input.
     *
     * @param array $query The query string.
     * @return array The response data for the API request.
     */
    public function geoLocation(array $query): array {
        $allowed = ['q'];
        $params = array_intersect_key($query, array_flip($allowed));
        return $this->get('/direct', $params);
    }
    
    /**
     * Determines if mode provided in constructor is valid value
     *
     * @param string $mode The mode that determines appropriate API call.
     * @return void
     */
    private function isValidMode(string $mode): void {
        if(!in_array($mode, [self::GEO_LOCATE, self::ONE_CALL, self::STANDARD])) {
            throw new InvalidArgumentException("Invalid api call: $mode");
        }
    }
}