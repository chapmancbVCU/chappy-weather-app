<?php
namespace Database\Migrations;
use Core\Lib\Database\Schema;
use Core\Lib\Database\Blueprint;
use Core\Lib\Database\Migration;

/**
 * Migration class for the favorites table.
 */
class Migration1758935369 extends Migration {
    /**
     * Performs a migration for a new table.
     *
     * @return void
     */
    public function up(): void {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->float('latitude');
            $table->float('longitude');
            $table->integer('user_id');
            $table->index('user_id');
        });
    }

    /**
     * Undo a migration task.
     *
     * @return void
     */
    public function down(): void {
        Schema::dropIfExists('favorites');
    }
}
