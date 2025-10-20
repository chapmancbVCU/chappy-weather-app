<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;
use App\Models\Favorites;
use Core\FormHelper;
use Core\Lib\Http\JsonResponse;
use Core\Lib\Logging\Logger;
use Throwable;
/**
 * Supports operations related to favorites.
 */
class FavoritesController extends Controller {
    use JsonResponse;
    public function manageFavoritesAction(): void {
        $user = AuthService::currentUser();
        $favorites = Favorites::findAllByUserId($user->id);
        $this->view->props = ['favorites' => $favorites];
        $this->view->renderJsx('favorites.ManageFavorites');
    }

    public function storeAction() {
        
        try {
            $favorite = new Favorites();
            if(!$this->apiCsrfCheck()) {
                return $this->jsonError('Corrupted token');
            }

            $favorite->assign($this->get());
            $favorite->user_id = AuthService::currentUser()->id;
            $favorite->save();
        } catch (Throwable $e){
            return $this->jsonError('Server error', 500);
        }
    }

    public function showAction(): void {
        $user = AuthService::currentUser();
        $data = Favorites::findAllByUserId($user->id);
        $this->jsonResponse(['success' => true, 'data' => $data]);
    }
}
