<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Olla;
use App\Http\Controllers\ApiController;

class ControllerO extends ApiController
{
    public function getAll()
    {
        $Ollas = Olla::where('estado', '=', 1)
            ->select('*')
            ->get();

        return $this->sendResponse($Ollas, '', 200);
    }

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
            return 'Data stored successfully';
        } catch (\Illuminate\Database\QueryException $e) {
            return "Error $e";
        }
    }

    // public function show($id)
    // {
    //     $olla = Olla::where('idPelicula', $id)
    //         ->select('idPelicula', 'nombre', 'img')
    //         ->get();
    //     return $this->sendResponse($olla, 'Olla obtenida correctamente');
    // }
}
