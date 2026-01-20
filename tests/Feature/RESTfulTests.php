<?php
declare(strict_types=1);

namespace Tests\Feature;

use Core\DB;
use Core\Lib\Utilities\Env;
use Core\Lib\Http\JsonResponse; // trait with static test mode toggles
use Core\Lib\Testing\ApplicationTestCase;

/**
 * Unit tests
 */
class RESTfulTests extends ApplicationTestCase {
    public function test_show_returns_favorites_for_current_user(): void
    {
        // Ensure JSON responses don't exit during tests
        JsonResponse::$testing = true;

        // Start session for AuthService::currentUser()
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        // 1) Seed a user record
        DB::getInstance()->insert('users', [
            'fname'       => 'Test',
            'lname'       => 'User',
            'email'       => 'test@example.com',
            'username'    => 'testuser',
            'description' => 'PHPUnit seeded user',
            'password'    => password_hash('Password@123', PASSWORD_DEFAULT),

            // Include fields your model/framework expects
            'deleted'     => 0,
            'created_at'  => date('Y-m-d H:i:s'),
            'updated_at'  => date('Y-m-d H:i:s'),
        ]);

        $userId = (int) DB::getInstance()->lastID();
        $this->assertGreaterThan(0, $userId);

        // 2) "Log in" as that user (adjust this key to your AuthService/session convention)
        $sessionKey = Env::get('CURRENT_USER_SESSION_NAME');
        $_SESSION[$sessionKey] = $userId;

        // 3) Seed favorites for that user
        DB::getInstance()->insert('favorites', [
            'user_id'     => $userId,
            'name'        => 'Norfolk, VA',
            'latitude'         => 36.8508,
            'longitude'         => -76.2859,
            'is_home'     => 0,
            'deleted'     => 0,
        ]);

        DB::getInstance()->insert('favorites', [
            'user_id'     => $userId,
            'name'        => 'Virginia Beach, VA',
            'latitude'         => 36.8529,
            'longitude'         => -75.9780,
            'is_home'     => 1,
            'deleted'     => 0
        ]);

        // 4) Call the controller endpoint (router-style URL)
        // If your ApplicationTestCase::get() routes /controller/action, this should hit FavoritesController::showAction()
        $response = $this->get('/favorites/show');

        // 5) Assert response status + JSON payload
        $response->assertStatus(200);

        $payload = json_decode($response->getContent(), true);

        $this->assertIsArray($payload, 'Response body is not valid JSON.');
        $this->assertTrue($payload['success'] ?? false, 'Expected success=true in JSON response.');
        $this->assertArrayHasKey('data', $payload, 'Expected data key in JSON response.');
        $this->assertIsArray($payload['data'], 'Expected data to be an array.');

        // 6) Assert only this user’s favorites returned
        $this->assertCount(2, $payload['data']);

        foreach ($payload['data'] as $fav) {
            $this->assertSame($userId, (int)($fav['user_id'] ?? 0));
        }
    }
}