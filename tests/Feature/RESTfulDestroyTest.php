<?php
declare(strict_types=1);

namespace Tests\Feature;

use App\Controllers\FavoritesController;
use Core\DB;
use Core\FormHelper;
use Core\Lib\Http\JsonResponse;
use Core\Lib\Testing\ApplicationTestCase;
use Core\Lib\Utilities\Env;

class RESTfulDestroyTest extends ApplicationTestCase
{
    public function test_destroy_deletes_one_favorite_and_leaves_other_intact(): void
    {
        self::enableJsonTestingMode();

        self::ensureSessionStarts();

        // 1) Seed user
        DB::getInstance()->insert('users', [
            'fname'       => 'Test',
            'lname'       => 'User',
            'email'       => 'destroy@example.com',
            'username'    => 'destroyuser',
            'description' => 'Seeded user',
            'password'    => password_hash('Password@123', PASSWORD_DEFAULT),
            'deleted'     => 0,
            'created_at'  => date('Y-m-d H:i:s'),
            'updated_at'  => date('Y-m-d H:i:s'),
        ]);
        $userId = (int) DB::getInstance()->lastID();
        $_SESSION[Env::get('CURRENT_USER_SESSION_NAME')] = $userId;

        // 2) Seed TWO favorites
        DB::getInstance()->insert('favorites', [
            'user_id'    => $userId,
            'name'       => 'Norfolk, VA',
            'latitude'   => 36.85,    // you said you store 2 decimal places
            'longitude'  => -76.29,
            'is_home'    => 0,
            'deleted'    => 0,
        ]);
        $fav1Id = (int) DB::getInstance()->lastID();

        DB::getInstance()->insert('favorites', [
            'user_id'    => $userId,
            'name'       => 'Virginia Beach, VA',
            'latitude'   => 36.85,
            'longitude'  => -75.98,
            'is_home'    => 0,
            'deleted'    => 0,
        ]);
        $fav2Id = (int) DB::getInstance()->lastID();

        $this->assertNotSame($fav1Id, $fav2Id);

        // 3) JSON body for CSRF (destroyAction reads csrf_token from JsonResponse::get())
        $payload = ['csrf_token' => FormHelper::generateToken(),];
        FavoritesController::setRawInputOverride(json_encode($payload));

        // 4) DELETE /favorites/destroy/{id}
        $_SERVER['REQUEST_METHOD'] = 'DELETE';
        $response = $this->delete("/favorites/destroy/{$fav1Id}", []);

        // Cleanup override
        FavoritesController::setRawInputOverride();

        // 5) On success, destroyAction returns no body
        $response->assertStatus(200);
        $this->assertSame('', trim($response->getContent()), 'Expected empty response body on success.');

        // 6) Assert only ONE favorite was deleted
        // Soft delete (preferred): deleted = 1
        $deletedRow = DB::getInstance()->query("SELECT * FROM favorites WHERE id = ?", [$fav1Id])->first();
        $remainingRow = DB::getInstance()->query("SELECT * FROM favorites WHERE id = ?", [$fav2Id])->first();

        // If you hard delete, $deletedRow will be false/null.
        // If you soft delete, it will exist and have deleted=1.
        if ($deletedRow) {
            $this->assertSame(1, (int)($deletedRow->deleted ?? 0), 'Expected destroyed favorite to be soft-deleted.');
        } else {
            $this->assertFalse($deletedRow, 'Expected destroyed favorite to be removed.');
        }

        $this->assertNotNull($remainingRow, 'Expected second favorite to remain.');
        if ($remainingRow) {
            $this->assertSame(0, (int)($remainingRow->deleted ?? 0), 'Expected remaining favorite to not be deleted.');
            $this->assertSame('Virginia Beach, VA', (string)$remainingRow->name);
        }
    }
}
