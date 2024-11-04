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
        Schema::create('trade_lines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('trade_id');
            $table->unsignedSmallInteger('shares');
            $table->float('price');
            $table->enum('type', ['BUY', 'SELL']);
            $table->float('commission');
            $table->timestamps();

            $table->foreign('trade_id')->references('id')->on('trades')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trade_lines');
    }
};
