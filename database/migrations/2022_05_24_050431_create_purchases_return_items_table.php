<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePurchasesReturnItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasTable('purchases_return_items')) {
        Schema::create('purchases_return_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('purchase_return_id');
            $table->foreign('purchase_return_id')
                ->references('id')->on('purchases_return')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')
                ->on('products')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->double('product_cost')->nullable();
            $table->double('net_unit_cost')->nullable();
            $table->integer('tax_type');
            $table->double('tax_value')->nullable();
            $table->double('tax_amount')->nullable();
            $table->integer('discount_type');
            $table->double('discount_value')->nullable();
            $table->double('discount_amount')->nullable();
            $table->integer('purchase_unit');
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
        Schema::dropIfExists('purchases_return_items');
    }
}
