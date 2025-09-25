<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Supports operations for rendering hourly forecast.
 */
class HourlyController extends Controller {
    /**
     * Renders hourly forecast.
     *
     * @return void
     */
    public function indexAction(): void {
        $this->view->renderJsx('hourly.Index');
    }
}
