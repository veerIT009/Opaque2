<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('transfer_items')) {
        Schema::create('transfer_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('transfer_id');
            $table->foreign('transfer_id')
                ->references('id')->on('transfers')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')
                ->on('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->double('product_price')->nullable();
            $table->double('net_unit_price')->nullable();
            $table->integer('tax_type');
            $table->double('tax_value')->nullable();
            $table->double('tax_amount')->nullable();
            $table->integer('discount_type');
            $table->double('discount_value')->nullable();
            $table->double('discount_amount')->nullable();
            $table->double('quantity')->nullable();
            $table->double('sub_total')->nullable();
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
        Schema::dropIfExists('transfer_items');
    }
}
