<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pots', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('authorEmail');
            $table->foreign('authorEmail')->references('email')->on('users');
            $table->string('desc');
            $table->time('openFrom');
            $table->time('to');
            $table->string('imageURL')->nullable();
            $table->tinyInteger('isInNeed')->default(1);
            $table->tinyInteger('state')->default(1);
            $table->decimal('lat', 7, 5)->default(12.60925);
            $table->decimal('lng', 7, 5)->default(9.06714);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pots');
    }
}
