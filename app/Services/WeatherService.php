<?php
namespace App\Services;

use Core\Lib\Http\Api;
use InvalidArgumentException;

/**
 * Service that supports retrieving weather for current conditions.
 */
class WeatherService extends Api {
    public const GEO_LOCATE = 'http://api.openweathermap.org/geo/1.0';
    public const ONE_CALL = 'http://api.openweathermap.org/data/3.0';
    public const STANDARD = 'http://api.openweathermap.org/data/2.5';
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
            defaultQuery: self::buildQuery($mode),
            defaultTtl: 120,
            timeout: 6
        );
    }

    /**
     * Builds defaultQuery based on which API is selected.
     *
     * @param string $mode The specific API to use.
     * @return array $query The params for the defaultQuery.
     */
    private function buildQuery(string $mode): array {
        $query = [];
        $query['appid'] = env('OWM_API_KEY');
        // $query['units'] = 'imperial';

        if($mode === self::GEO_LOCATE) {
            $query['limit'] = env('OWM_SEARCH_TERM_LIMIT');
        }

        return $query;
    }

    /**
     * Packages query for current conditions using free tier api call.
     *
     * @param array $query The query string
     * @return array The response data for the API request containing 
     * weather information.
     */
    public function current(array $query): array {
        $allowed = ['q', 'units', 'lang'];
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
     * Packages query for onecall api call.
     *
     * @param array $query The query string.
     * @return array The response data for the API request.
     */
    public function oneCall(array $query): array {
        $allowed = ['lat', 'lon', 'units', 'lang'];
        $params = array_intersect_key($query, array_flip($allowed));
        return $this->get('/onecall', $params);
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