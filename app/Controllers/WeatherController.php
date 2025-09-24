<?php
namespace App\Controllers;

use Throwable;
use Core\Controller;
use Core\Lib\Logging\Logger;
use App\Services\WeatherService;

/**
 * Has actions that serves as endpoints for api requests.
 */
class WeatherController extends Controller {
    /**
     * Supports query for getting current conditions for a given area.
     *
     * @return void
     */
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
            $this->jsonError("Upstream error - {$e->getMessage()}", 502);
        }
    }

    public function hourlyAction()
    {
        try {
            $lat = $this->request->get('lat') ?? null;
            $lon = $this->request->get('lon') ?? null;

            if (!($lat && $lon)) {
                return $this->jsonError('Provide ?lat=&lon=', 422);
            }

            $svc = new WeatherService(WeatherService::ONE_CALL);

            // Only need hourly; drop other blocks to reduce size/cost
            $params = [
                'lat' => $lat,
                'lon' => $lon,
                'units' => $this->request->get('units') ?? 'imperial',
                'lang'  => $this->request->get('lang')  ?? 'en',
                'exclude' => 'minutely,alerts,current,daily', // optional
            ];

            $data = $svc->oneCall($params);
            return $this->jsonResponse(['success' => true, 'data' => $data]);
        } catch (\Throwable $e) {
            return $this->jsonError("Upstream error - {$e->getMessage()}", 502);
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

    /**
     * Performs query for geo location suggestions based on user input in 
     * search bar.
     *
     * @return void
     */
    public function searchAction() {
        try {
            $q = $this->request->get('q') ?? null;
            if(!$q) {
                return $this->jsonError('Invalid location provided', 422);
            }
            
            $geo = new WeatherService(WeatherService::GEO_LOCATE);
            $data = $geo->geoLocation($this->request->get());
            $this->jsonResponse(['success' => true, 'data' => $data ?? '']);
        } catch(Throwable $e) {
            $this->jsonError('Upstream error', 502, ['detail' => $e->getMessage()]);
        }
    }
}
