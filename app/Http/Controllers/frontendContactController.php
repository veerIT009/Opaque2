<?php

namespace App\Http\Controllers;

use App\Models\frontendContactModel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class frontendContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $direction = $request->query("direction");
        $pageSize = $request->query("pageSize");
        $search = $request->query("search");
        $filter = $request->query("filter");

        if (isset($filter)) {
            $contact = frontendContactModel::where("name", "like", "%" . $filter["search"] . "%")->orWhere("email", "like", "%" . $filter["search"] . "%")->get();
            return response()->json([
                "data" => $contact,
                "message" => "Contact retrieved Successfully.",

            ]);
        } else if ($direction) {
            $contact = frontendContactModel::orderBy("created_at", $direction)->limit(10)->get();
            return response()->json([
                "data" => $contact,
                "message" => "Contact retrieved Successfully."
            ]);
        } else {
            $contact = frontendContactModel::orderBy("created_at", "desc")->limit(10)->get();
            return response()->json([
                "data" => $contact,
                "message" => "Contact retrieved Successfully."
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        try {
            $contact = frontendContactModel::create($request->all());
            return response()->json([
                "data" => $contact,
                "message" => "Contact saved Successfully.",
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => "Something went wrong.",
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $contact = frontendContactModel::where('id', $id)->delete();
            return response()->json([
                "data" => $contact,
                "message" => "Contact Deleted Successfully."
            ]);
        } catch (Exception $error) {
            return response()->json([
                "data" => $error,
                "message" => $error
            ]);
        }
    }
}
