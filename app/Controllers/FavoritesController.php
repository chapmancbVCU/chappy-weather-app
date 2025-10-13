<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;
use App\Models\Favorites;
/**
 * Supports operations related to favorites.
 */
class FavoritesController extends Controller {
    public function manageFavoritesAction(): void {
        $user = AuthService::currentUser();
        $favorites = Favorites::findAllByUserId($user->id);
        $this->view->props = ['favorites' => $favorites];
        $this->view->renderJsx('favorites.ManageFavorites');
    }

    public function showAction(): void {
        $user = AuthService::currentUser();
        $favorites = Favorites::findAllByUserId($user->id);
    }
}
