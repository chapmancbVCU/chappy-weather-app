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
class RESTfulStoreTest extends ApplicationTestCase {
    public function test_store_creates_favorite_for_current_user(): void
    {
        // Prevent jsonResponse() from exiting during tests
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

        // 2) Authenticate session (whatever AuthService::currentUser() expects)
        $_SESSION[Env::get('CURRENT_USER_SESSION_NAME')] = $userId;

        // 3) Prepare JSON payload (storeAction reads JSON body via JsonResponse::get())
        $payload = [
            'name'       => 'Norfolk, VA',
            'latitude'   => '36.85',
            'longitude'  => '-76.28',
            'csrf_token' => FormHelper::generateToken(),
        ];

        // Inject JSON body for JsonResponse::get()
        FavoritesController::$rawInputOverride = json_encode($payload);

        // 4) Call store endpoint (your controller/action routing)
        $_SERVER['REQUEST_METHOD'] = 'POST';
        $response = $this->post('/favorites/store', []);

        // Cleanup override to avoid leaking into other tests
        FavoritesController::$rawInputOverride = null;

        // 5) On success, your action returns no JSON body (same as patch)
        $response->assertStatus(200);
        $this->assertSame('', trim($response->getContent()), 'Expected empty response body on success.');

        // 6) Assert DB row created for this user
        $row = DB::getInstance()->query(
            "SELECT * FROM favorites WHERE user_id = ? AND name = ?",
            [$userId, 'Norfolk, VA']
        )->first();

        $this->assertNotNull($row, 'Expected favorites row to be created.');
        $this->assertSame($userId, (int)$row->user_id);
        $this->assertSame('Norfolk, VA', (string)$row->name);

        // Float comparisons can be annoying; cast to float and compare with delta if needed
        $this->assertEquals(36.85, (float)$row->latitude);
        $this->assertEquals(-76.28, (float)$row->longitude);

        // Optional if you use soft deletes
        if (property_exists($row, 'deleted')) {
            $this->assertSame(0, (int)$row->deleted);
        }
    }
}