<?php
namespace App\Controllers;

use App\Services\GeoLocateService;
use Throwable;
use Core\Controller;
use Core\Lib\Logging\Logger;
use App\Services\WeatherService;

/**
 * Has actions that serves as endpoints for api requests.
 */
class WeatherController extends Controller {
    public function currentConditionsAction() {
        try {
            $q = $this->request->get('q') ?? null;
            $lat = $this->request->get('lat') ?? null;
            $lon = $this->request->get('lon') ?? null;

            if(!$q && !($lat && $lon)) {
                return $this->jsonError('Provide ?q=City or ?lat=&lon=', 422);
            }

            $svc = new WeatherService();
            $data = $svc->current($this->request->get());

            $this->jsonResponse(['success' => true, 'data' => $data]);
        } catch(Throwable $e) {
            $this->jsonError('Upstream error', 502, ['detail' => $e->getMessage()]);
        }
    }

    /**
     * OPTIONS /weather/*  (CORS preflight)
     *
     * @return void
     */
    public function preflightAction(): void {
        $this->preflight();
    }

    public function searchAction() {
        try {
            $q = $this->request->get('q') ?? null;
            if(!$q) {
                return $this->jsonError('Invalid location provided', 422);
            }
            
            $geo = new GeoLocateService();
            $data = $geo->geoLocation($this->request->get());
            $this->jsonResponse(['success' => true, 'data' => $data ?? '']);
        } catch(Throwable $e) {
            $this->jsonError('Upstream error', 502, ['detail' => $e->getMessage()]);
        }
    }
}
