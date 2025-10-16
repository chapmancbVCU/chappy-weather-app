<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;
use App\Models\Favorites;

/**
 * Supports operations for rendering current conditions.  This is our 
 * DEFAULT_CONTROLLER.
 */
class CurrentController extends Controller {
    /** 
     * Home page that renders current conditions.
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
        $this->view->renderJSX('current.Index', $props);
    }
}