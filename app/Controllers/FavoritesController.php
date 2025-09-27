<?php
namespace App\Controllers;
use Core\Controller;

/**
 * Undocumented class
 */
class FavoritesController extends Controller {
    public function manageFavoritesAction(): void {
        $this->view->renderJsx('favorites.ManageFavorites');
    }
}
