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
class RESTfulStoreBadCSRFTest extends ApplicationTestCase {
    public function test_store_rejects_request_with_bad_csrf_and_does_not_create_row(): void
    {
        JsonResponse::$testing = true;

        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // Seed + login user
        DB::getInstance()->insert('users', [
            'fname'      => 'Test',
            'lname'      => 'User',
            'email'      => 'test2@example.com',
            'username'   => 'testuser2',
            'password'   => password_hash('Password@123', PASSWORD_DEFAULT),
            'deleted'    => 0,
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
        ]);
        $userId = (int) DB::getInstance()->lastID();
        $_SESSION[Env::get('CURRENT_USER_SESSION_NAME')] = $userId;

        // Bad CSRF (won't match session token)
        $payload = [
            'user_id'     => $userId,
            'name'       => 'Bad CSRF City',
            'latitude'   => '1.23',
            'longitude'  => '4.56',
            'csrf_token' => 'not-a-real-token',
        ];

        FavoritesController::$rawInputOverride = json_encode($payload);

        $_SERVER['REQUEST_METHOD'] = 'POST';
        $response = $this->post('/favorites/store', []);

        FavoritesController::$rawInputOverride = null;

        $response->assertStatus(200);

        $body = json_decode($response->getContent(), true);
        $this->assertIsArray($body, 'Expected JSON error payload.');
        $this->assertFalse($body['success'] ?? true);
        $this->assertSame('Corrupted token', $body['message'] ?? '');

        // Confirm row NOT created
        $row = DB::getInstance()->query(
            "SELECT * FROM favorites WHERE user_id = ? AND name = ?",
            [$userId, 'Bad CSRF City']
        )->first();

        $this->assertFalse($row, 'Did not expect favorites row to be created when CSRF fails.');
    }
}