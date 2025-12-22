<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;

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
        $user = AuthService::currentUser();
        unset($user->password);
        $props = ['user' => $user ?? null,];
        $this->view->renderJsx('hourly.Index', $props);
    }
}
