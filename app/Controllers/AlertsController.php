<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Supports operations for rendering alerts view.
 */
class AlertsController extends Controller {
    /**
     * Renders alerts at specified location.
     *
     * @return void
     */
    public function indexAction(): void {
        $this->view->renderJsx('alerts.Index');
    }
}
