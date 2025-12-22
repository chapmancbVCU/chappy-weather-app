<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;
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
        $user = AuthService::currentUser();
        unset($user->password);
        $props = ['user' => $user ?? null,];
        $this->view->renderJsx('alerts.Index', $props);
    }
}
