<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Undocumented class
 */
class AlertsController extends Controller {
    public function indexAction(): void {
        $this->view->renderJsx('alerts.Index');
    }
}
