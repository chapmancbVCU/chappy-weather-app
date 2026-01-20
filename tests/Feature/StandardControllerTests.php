<?php
namespace Tests\Feature;

use App\Models\Users;
use Core\DB;
use Core\FormHelper;
use Core\Lib\Testing\ApplicationTestCase;

/**
 * Unit tests
 */
class StandardControllerTests extends ApplicationTestCase {
    public function test_register_action_creates_user(): void {
        // 👤 Mock file upload (required even if no image uploaded)
        $this->mockFile('profileImage');

        // 🧪 Prepare valid form input with CSRF token
        $postData = [
            'fname' => 'Test',
            'lname' => 'User',
            'email' => 'testuser@example.com',
            'username' => 'testuser',
            'description' => 'Test description',
            'password' => 'Password@123',
            'confirm' => 'Password@123',
            'csrf_token' => FormHelper::generateToken(),
        ];

        // 🚀 Perform request to controller
        $response = $this->post('/auth/register', $postData);

        // ✅ Assert user was created
        $user = \Core\DB::getInstance()->query(
            "SELECT * FROM users WHERE username = ?",
            ['testuser']
        )->first();

        $this->assertNotNull($user, 'User should exist in the database');
        $this->assertEquals('testuser', $user->username);

        // 🔒 Also confirm with database helper
        $this->assertDatabaseHas('users', [
            'username' => 'testuser',
            'email' => 'testuser@example.com',
        ]);
    }

    public function test_put_updates_user(): void
    {
        // ✅ Seed user
        DB::getInstance()->insert('users', [
            'fname' => 'Original',
            'lname' => 'User',
            'email' => 'original@example.com',
            'username' => 'originaluser',
            'description' => 'Seeded user',
            'password' => password_hash('Password@123', PASSWORD_DEFAULT),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s'),
            'acl' => '[""]',
            'deleted' => 0
        ]);

        $userId = DB::getInstance()->lastID();

        // ✅ Prepare updated values
        $data = [
            'username' => 'updateduser',
            'email' => 'updated@example.com',
            'images_sorted' => '[]',
            'csrf_token' => FormHelper::generateToken()
        ];

        // ✅ Simulate PUT request to update controller
        $response = $this->put("/admindashboard/edit/{$userId}", $data);

        // ✅ Assert changes in DB
        $user = DB::getInstance()->query("SELECT * FROM users WHERE id = ?", [$userId])->first();

        $this->assertNotNull($user);
        $this->assertEquals('updateduser', $user->username);
        $this->assertEquals('updated@example.com', $user->email);
    }
}