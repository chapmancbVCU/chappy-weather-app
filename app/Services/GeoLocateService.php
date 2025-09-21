<?php
namespace App\Services;

use Core\Lib\Http\Api;
use App\Models\GeoLocate;

/**
 * Service that supports the GeoLocate model.
 */
class GeoLocateService extends Api {
    private const GEO_LOCATE = 'http://api.openweathermap.org/geo/1.0';

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

    public function geoLocation(array $query): array {
        $allowed = ['q'];
        $params = array_intersect_key($query, array_flip($allowed));
        return $this->get('/direct', $params);
    }
}