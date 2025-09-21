<?php
namespace App\Controllers;
use Core\Controller;
use App\Services\WeatherService;
use Throwable;

/**
 * Undocumented class
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

    public function preflightAction(): void {
        $this->preflight();
    }

    public function searchAction(): void {
        $this->jsonResponse(['success' => true, 'test' => 'test']);
    }
}
