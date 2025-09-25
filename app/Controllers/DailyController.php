<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Supports operations for rendering daily forecast.
 */
class DailyController extends Controller {
    /**
     * Renders daily forecast.
     *
     * @return void
     */
    public function indexAction(): void {
        $this->view->renderJsx('daily.Index');
    }
}
