<?php
namespace App\Models;
use Core\Model;
use Core\Lib\Logging\Logger;
/**
 * Implements features of the Favorites class.
 */
class Favorites extends Model {

    // Fields you don't want saved on form submit
    public const blackList = ['deleted', 'id'];

    // Set to name of database table.
    protected static $_table = 'favorites';

    // Soft delete
    protected static $_softDelete = true;
    
    // Fields from your database
    public $deleted = 0;
    public $id;
    public $is_home = 0;
    public $latitude;
    public $longitude;
    public $name;

    /**
     * Returns favorite location for a user that is set to home.
     *
     * @param int $user_id The id for current logged in user.
     * @return Favorites The favorite location that is set to home.
     */
    public static function findCurrentHome(int $user_id) {
        $conditions = [
            'conditions' => 'user_id = ? AND is_home = ?',
            'bind' => [(int)$user_id, 1]
        ];
        
        return self::findFirst($conditions);
    } 

    public function afterDelete(): void {
        // Implement your function
    }

    public function afterSave(): void {
        // Implement your function
    }

    public function beforeDelete(): void {
        // Implement your function
    }

    public function beforeSave(): void {
        // Implement your function
    }

    /**
     * Performs validation for the Favorites model.
     *
     * @return void
     */
    public function validator(): void {
        // Implement your function
    }
}
