<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\ApiController;

class ControllerU extends ApiController
{
    public function tempLogin(Request $request)
    {
        $email = $request->input('email');
        $passwd = $request->input('passwd');
        if (User::where('correo', $email)
            ->where('passwd', $passwd)->exists()
        ) {
            $user = User::where('correo', $email)
                ->where('passwd', $passwd)
                ->select('nombre', 'apellido')
                ->get();

            return $this->sendResponse($user, '', 200);
        }
        return $this->sendError('User not found', 404, 'Invalid credentials');
    }

    public function tempRegister(Request $request)
    {
        try {
            if (!$request->input('email') || !$request->input('name') || !$request->input('surname') || !$request->input('passwd')){
                return $this->sendError('Missing parameters', 400, 'The request body does not contain all necessary parameters');
            }
            if (User::where('correo', $request->input('email'))->exists()) {
                return $this->sendError('Email is already in use', 409, 'Duplicated entry for email');
            }
            $newUser = new User();
            $newUser->correo = $request->input('email');
            $newUser->nombre = $request->input('name');
            $newUser->apellido = $request->input('surname');
            $newUser->passwd = $request->input('passwd');
            $newUser->state = 0;
            $newUser->save();
            return $this->sendResponse('User created successfully', '', 201);
        } catch (\Illuminate\Database\QueryException $e) {
            return 'Error $e';
        }
    }
}
