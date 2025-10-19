<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;

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
        $user = AuthService::currentUser();
        $props = ['user' => $user ?? null,];
        $this->view->renderJsx('daily.Index', $props);
    }
}
