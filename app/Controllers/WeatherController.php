<?php
namespace App\Controllers;
use Core\Controller;
use App\Services\WeatherService;

/**
 * Undocumented class
 */
class WeatherController extends Controller {
    /**
     * Runs when the object is constructed.
     *
     * @return void
     */
    public function onConstruct(): void {
        $this->view->setLayout('default');
    }
}
