<?php
declare(strict_types=1);

namespace Tests\Feature;

use App\Controllers\FavoritesController;
use Core\DB;
use Core\Lib\Utilities\Env;
use Core\Lib\Http\JsonResponse; // trait with static test mode toggles
use Core\Lib\Testing\ApplicationTestCase;
use Core\FormHelper;

/**
 * Unit tests
 */
class RESTfulPatchTest extends ApplicationTestCase {
    public function test_patch_sets_selected_favorite_as_home_and_unsets_previous_home(): void
    {
        // Ensure JSON responses don't exit during tests
        JsonResponse::$testing = true;

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // 1) Seed user
        DB::getInstance()->insert('users', [
            'fname'       => 'Test',
            'lname'       => 'User',
            'email'       => 'test@example.com',
            'username'    => 'testuser',
            'description' => 'Seeded user',
            'password'    => password_hash('Password@123', PASSWORD_DEFAULT),
            'deleted'     => 0,
            'created_at'  => date('Y-m-d H:i:s'),
            'updated_at'  => date('Y-m-d H:i:s'),
        ]);

        $userId = (int) DB::getInstance()->lastID();
        $this->assertGreaterThan(0, $userId);

        // 2) Authenticate session (match what your router/AuthService expects)
        $_SESSION[Env::get('CURRENT_USER_SESSION_NAME')] = $userId;

        // 3) Seed two favorites: one currently home, one not
        DB::getInstance()->insert('favorites', [
            'user_id'     => $userId,
            'name'        => 'Norfolk, VA',
            'latitude'    => 36.8508,
            'longitude'   => -76.2859,
            'is_home'     => 1,
            'deleted'     => 0
        ]);
        $currentHomeId = (int) DB::getInstance()->lastID();

        DB::getInstance()->insert('favorites', [
            'user_id'     => $userId,
            'name'        => 'Virginia Beach, VA',
            'latitude'    => 36.8529,
            'longitude'   => -75.9780,
            'is_home'     => 0,
            'deleted'     => 0
        ]);
        $targetId = (int) DB::getInstance()->lastID();

        $this->assertNotSame($currentHomeId, $targetId);

        // 4) Prepare JSON body (apiCsrfCheck reads csrf_token from JsonResponse::get())
        $payload = [
            'csrf_token' => FormHelper::generateToken(),
        ];

        // IMPORTANT: set the override on the class using the trait
        FavoritesController::$rawInputOverride = json_encode($payload);

        // If you added this testing flag to prevent exit()
        FavoritesController::$testing = true;

        $_SERVER['REQUEST_METHOD'] = 'PATCH';

        $response = $this->patch("/favorites/patch/{$targetId}", []);

        FavoritesController::$rawInputOverride = null;
        // 6) Assert response looks like JSON success (optional but helpful)
        $response->assertStatus(200);

        $this->assertSame('', trim($response->getContent()), 'Expected empty response body on success.');

        // 7) Assert DB: previous home unset, target set
        $old = DB::getInstance()->query("SELECT is_home FROM favorites WHERE id = ?", [$currentHomeId])->first();
        $new = DB::getInstance()->query("SELECT is_home FROM favorites WHERE id = ?", [$targetId])->first();

        $this->assertNotNull($old);
        $this->assertNotNull($new);

        $this->assertSame(0, (int) $old->is_home, 'Expected previous home to be unset.');
        $this->assertSame(1, (int) $new->is_home, 'Expected selected favorite to be set as home.');

        // Cleanup override so it doesn't leak into other tests
        JsonResponse::$rawInputOverride = null;
    }

    

    
}