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
        //$this->request->csrfCheck();
        try {
            $raw = file_get_contents('php://input') ?: '';
            //$input = json_decode($raw, true);
            $input = $this->get();
            if(!is_array($input)) {
                $input = $this->request->get();
            }
            $csrf = $this->get('csrf_token');
            
            //if(!FormHelper::checkToken($csrf)) {
                //Router::redirect('restricted/badToken');
                //return $this->jsonError('Corrupted token');
            //} //else {
              //  $this->jsonResponse(['Corrupted token']);
            //}
            Logger::log("Data");
            Logger::log(json_encode($input));
            //Logger::log($csrf);
            if(!$this->apiCsrfCheck())
               return $this->jsonError('Corrupted token');
        } catch (Throwable $e){
            //return $this->jsonError('Corrupted token');
        }
    }

    public function showAction(): void {
        $user = AuthService::currentUser();
        $favorites = Favorites::findAllByUserId($user->id);
    }
}
