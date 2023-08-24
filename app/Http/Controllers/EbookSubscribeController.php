<?php

namespace App\Http\Controllers;

use App\Models\EbookLimitModel;
use App\Models\EbookSubscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EbookSubscribeController extends Controller
{
    public function index()
    {
        $esub = EbookSubscription::all()->toArray();

        $amount = array_map(function ($item) {
            return $item["amount"];
        }, $esub);

        return response()->json([
            'data' => $esub,
            'message' => "Ebook Subscription Fetched Successfully",
            'totalAmount' => array_sum($amount),
            'member' => Auth::user()
        ]);
    }

    public function subscribe(Request $request)
    {
        $ebook = EbookSubscription::updateOrCreate(['member_id' => $request->member_id, "ebook_id" => $request->ebook_id], $request->all());
        $book = EbookLimitModel::where("ebook_id", $request->ebook_id)->first();
        if ($book) {
            EbookLimitModel::where("ebook_id", $request->ebook_id)->update(["count" => $book->count + 1]);
        } else {
            EbookLimitModel::create(['ebook_id' => $request->ebook_id, 'count' => 1]);
        }
        return response()->json([
            'data' => $ebook,
            'message' => !$request->renew ? "Ebook Subscribe Successfully" : "Ebook Renewed Successfully"
        ]);
    }
}
