<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trades', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wallet_id');
            $table->string('company', 10);
            $table->string('strategy', 20);
            $table->date('date');
            $table->tinyInteger('week', false, true);
            $table->smallInteger('year', false, true);
            $table->enum('status', ['DRAFT', 'COMPLETED'])->default('DRAFT');
            $table->time('time')->nullable();
            $table->float('result')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();

            $table->foreign('wallet_id')->references('id')->on('wallets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trades');
    }
};
