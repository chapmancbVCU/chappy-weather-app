<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;
use App\Models\Favorites;

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
        $favorites = Favorites::findAllByUserId($user->id);
        $props = [
            'user' => $user ?? null,
            'favorites' => $favorites
        ];
        $this->view->renderJsx('hourly.Index', $props);
    }
}
