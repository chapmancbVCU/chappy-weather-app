<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;
use App\Models\Favorites;

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
        if($user) {
            $favorites = Favorites::findAllByUserId($user->id);
        }
        
        $props = [
            'user' => $user ?? null,
            'favorites' => $favorites ?? null
        ];
        $this->view->renderJsx('daily.Index', $props);
    }
}
