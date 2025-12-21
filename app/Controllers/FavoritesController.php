<?php
namespace App\Controllers;
use Core\Controller;
use Core\Services\AuthService;
use App\Models\Favorites;
use Core\Lib\Http\JsonResponse;
use Throwable;

/**
 * Supports operations related to favorites.
 */
class FavoritesController extends Controller {
    use JsonResponse;

    /**
     * Removes current location from list of favorites.
     *
     * @param int $id The id for favorite location we want to remove.
     * @return void
     */
    public function destroyAction(int $id) {
        try {
            if(!$this->apiCsrfCheck()) {
                return $this->jsonError('Corrupted token');
            }

            $user = AuthService::currentUser();
            $favorite = Favorites::findByIdAndUserId($id, $user->id);
            if($favorite) {
                $favorite->delete();
            }
        } catch (Throwable $e){
            return $this->jsonError('Server error', 500);
        }
    }

    /**
     * Sets currently selected location as home if not currently home.  We 
     * also want to ensure the previous home location is no longer set as 
     * home.
     *
     * @param int $id The id for selected favorite location
     * @return void
     */
    public function patchAction(int $id) {
        try {
            if(!$this->apiCsrfCheck()) {
                return $this->jsonError('Corrupted token');
            }
            $user = AuthService::currentUser();
            $currentHome = Favorites::findCurrentHome($user->id);

            if($currentHome && $currentHome->is_home == 1) {
                $currentHome->is_home = 0;
                $currentHome->save();
            }

            $favorite = Favorites::findByIdAndUserId($id, $user->id);
            if($favorite) {
                $favorite->is_home = 1;
                $favorite->save();
            }
        } catch (Throwable $e){
            return $this->jsonError('Server error' . $e, 500);
        }
    }

    /**
     * Retrieves favorites data for favorites cards.
     *
     * @return void
     */
    public function showAction(): void {
        $user = AuthService::currentUser();
        $data = Favorites::findAllByUserId($user->id);
        $this->jsonResponse(['success' => true, 'data' => $data]);
    }

    /**
     * Adds record to favorites table.
     *
     * @return void
     */
    public function storeAction() {
        try {
            if(!$this->apiCsrfCheck()) {
                return $this->jsonError('Corrupted token');
            }

            $favorite = new Favorites();
            $favorite->assign($this->get());
            $favorite->user_id = AuthService::currentUser()->id;
            $favorite->save();
        } catch (Throwable $e){
            return $this->jsonError('Server error', 500);
        }
    }
}
