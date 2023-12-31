<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCountriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        if (!Schema::hasTable('countries')) {
        Schema::create('countries', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 170)->unique();
            $table->string('short_code', 170)->unique()->nullable();
            $table->string('code')->unique();
            $table->integer('phone_code')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('countries');
    }
}
