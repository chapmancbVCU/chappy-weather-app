<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Supports operations related to favorites.
 */
class FavoritesController extends Controller {
    public function manageFavoritesAction(): void {
        $this->view->renderJsx('favorites.ManageFavorites');
    }
}
