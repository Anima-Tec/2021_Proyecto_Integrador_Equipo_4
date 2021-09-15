<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Controllers\ApiController;

class ControllerU extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
            return $this->sendResponse($user, "", 200);
        }
        return $this->sendError("User not found", 404, "Invalid credentials");
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
    public function tempRegister(Request $request)
    {
        try {
            if (!$request->input('email') || !$request->input('name') || !$request->input('surname') || !$request->input('passwd')){
                return $this->sendError("Missing parameters", 400, "The request body does not contain all necessary parameters");
            }
            if (User::where('correo', $request->input('email'))->exists()) {
                return $this->sendError("Email is already in use", 409, "Duplicated entry for email");
            }
            $newUser = new User();
            $newUser->correo = $request->input('email');
            $newUser->nombre = $request->input('name');
            $newUser->apellido = $request->input('surname');
            $newUser->passwd = $request->input('passwd');
            $newUser->state = 0;
            $newUser->save();
            return $this->sendResponse("User created successfully", "Account requires activation, a token has been sent via email", 201);
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
