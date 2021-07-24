<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Olla;
use App\Http\Controllers\ApiController;

class ControllerO extends ApiController
{
    public function index()
    {
        $Ollas = Olla::where('state', '=', 1)
            ->select('name', 'schedule', 'lat', 'long' ,'id', 'desc')
            ->get();

        return $this->sendResponse($Ollas, '');
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
            $newOlla = new Olla();
            $newOlla->name = $request->input('name');
            $newOlla->schedule = $request->input('schedule');
            $newOlla->lat = $request->input('lat');
            $newOlla->long = $request->input('long');
            $newOlla->desc = $request->input('desc');
            $newOlla->save();
            return "Data stored successfully";
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
        $Pelicula = Olla::where('idPelicula', $id)
            ->select('idPelicula', 'nombre', 'img')
            ->get();
        return $this->sendResponse($Pelicula, "Pelicula obtenida correctamente");
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
