<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
date_default_timezone_set("America/Argentina/Buenos_Aires");
class CreateVotesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('votes', function (Blueprint $table) {
            $table->id();
            $table->string('authorEmail');
            $table->bigInteger('votedPot')->unsigned();
            $table->foreign('votedPot')->references('id')->on('pots');
            $table->foreign('authorEmail')->references('email')->on('users');
            $table->integer('value');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('votes');
    }
}
