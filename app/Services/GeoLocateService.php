<?php
namespace App\Services;

use Core\Lib\Http\Api;

/**
 * Service that supports the geo location api calls.
 */
class GeoLocateService extends Api {
    private const GEO_LOCATE = 'http://api.openweathermap.org/geo/1.0';

    /**
     * Setup instance of this class.  Configures default query with 
     * appid and limit for suggestions to be returned.
     */
    public function __construct() {
        parent::__construct(
            baseUrl: self::GEO_LOCATE,
            cacheNamespace: 'owm',
            defaultHeaders: ['Accept' => 'application/json'],
            defaultQuery: [
                'appid' => env('OWM_API_KEY'),
                'limit' => env('OWM_SEARCH_TERM_LIMIT'),
            ],
            defaultTtl: 120,
            timeout: 6
        );
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
}