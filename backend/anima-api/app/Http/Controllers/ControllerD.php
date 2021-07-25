<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use App\Http\Controllers\ApiController;

class ControllerD extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $email = $request->input('email');
        $donations = Donation::where('userEmail', $email)
        ->select('*')
            ->get();
        return $this->sendResponse($donations, "");
    }
    // {
    //     $donations = Donation::where('idOlla', '>=', 1)
    //         ->join('ollas', 'idOlla', '=', 'ollas.id')
    //         -->join('ollas', 'idOlla', '=', 'ollas.id')
    //         ->get();

    //     return $this->sendResponse($donations, '');
    // }

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
            $newDonation = new Donation();
            $newDonation->idOlla = $request->input('idOlla');
            $newDonation->userEmail = $request->input('userEmail');
            $newDonation->donationType = $request->input('type');
            $newDonation->date = date("Y/m/d");
            $newDonation->save();
            return "Donation stored successfully";
        } catch (\Illuminate\Database\QueryException $e) {
            return "Error $e";
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
        //
    }
}
