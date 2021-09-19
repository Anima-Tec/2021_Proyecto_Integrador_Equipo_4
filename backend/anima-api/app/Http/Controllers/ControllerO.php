<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Olla;
use App\Http\Controllers\ApiController;
use App\Models\User;

class ControllerO extends ApiController
{
    public function getAll()
    {
        $Ollas = Olla::where('estado', '=', 1)
            ->select('*')
            ->get();

        return $this->sendResponse($Ollas, 'Ok', 200);
    }

    public function createOlla(Request $request)
    {
        if (!$request->input('email') || !$request->input('name') || !$request->input('description') || !$request->input('latitude') || !$request->input('longitude') || !$request->input('from') || !$request->input('to')) {
            return $this->sendError('Missing parameters.', 400, 'The request body does not contain all necessary parameters.');
        }
        if (User::where('correo', $request->input('email'))->where('state', 1)->doesntExist()){
            return $this->sendError('Provided email does not belong to an account.', 404, 'Invalid email.');
        }
        try {
            $newOlla = new Olla();
            $newOlla->nombre = $request->input('name');
            $newOlla->autor = $request->input('email');
            $newOlla->descripcion = $request->input('description');
            $newOlla->latitud = $request->input('latitude');
            $newOlla->longitud = $request->input('longitude');
            $newOlla->horarioApertura = $request->input('from');
            $newOlla->horarioCierre = $request->input('to');
            $newOlla->conNecesidad = 1;
            $newOlla->estado = 1;
            $newOlla->save();
            return $this->sendResponse('Success', 'Ok', 200);
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
