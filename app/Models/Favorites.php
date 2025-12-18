<?php
namespace App\Models;
use Core\Model;

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
