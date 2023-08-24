<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EbookSubscription extends Model
{
    use HasFactory;

    protected $fillable = ['ebook_id', 'member_id', 'issued_on', 'returned_on', 'razorpay_payment_id', 'amount'];
}
