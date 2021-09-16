<?php

namespace App\Http\Controllers;

date_default_timezone_set("America/Argentina/Buenos_Aires");

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Token;
use App\Http\Controllers\ApiController;

class ControllerU extends ApiController
{
    public function tempLogin(Request $request)
    {
        $email = $request->input('email');
        $passwd = $request->input('passwd');
        if (!$email || !$passwd){
            return $this->sendError('Missing parameters', 400, 'The request body does not contain all necessary parameters');
        }
        if (User::where('correo', $email)
            ->where('passwd', $passwd)->where('state', 1)->exists()
        ) {
            $user = User::where('correo', $email)
                ->where('passwd', $passwd)
                ->select('nombre', 'apellido')
                ->get();

            return $this->sendResponse($user, 'Ok', 200);
        }
        if (User::where('correo', $email)
            ->where('passwd', $passwd)->where('state', 0)->exists()
        ) {
            return $this->sendError('Disabled account.', 403, 'Account has not been activated.');
        }
        return $this->sendError('User not found', 404, 'Invalid credentials');
    }

    public function tempRegister(Request $request)
    {
        try {
            $this->accountActivation(null, null);
            if (!$request->input('email') || !$request->input('name') || !$request->input('surname') || !$request->input('passwd')){
                return $this->sendError('Missing parameters.', 400, 'The request body does not contain all necessary parameters.');
            }
            if (Token::where('userEmail', $request->input('email'))->exists()) {
                return $this->sendError('This account is awaiting activation.', 409, 'Activation token will expire in 24 hours.');
            }
            if (User::where('correo', $request->input('email'))->exists()) {
                return $this->sendError('Email is already in use.', 409, 'Duplicated entry for email.');
            }
            $newUser = new User();
            $newUser->correo = $request->input('email');
            $newUser->nombre = $request->input('name');
            $newUser->apellido = $request->input('surname');
            $newUser->passwd = $request->input('passwd');
            $newUser->state = 0;
            $newUser->save();
            $this->createRegisterToken($request->input('email'));
            return $this->sendResponse('User created successfully.', 'Account requires activation, a token has been sent via email.', 201);
        } catch (\Illuminate\Database\QueryException $e) {
            return "Error $e";
        }
    }

    function createRegisterToken($userEmail)
    {
        $token = new Token();
        $tokenValue = rand(111111, 999999);
        $currentDate = date('Y/m/d H:i:s');
        $expTimeStamp = strtotime(" $currentDate + 5 minutes");
        $tokenExp = date('Y/m/d H:i:s', $expTimeStamp);

        $token->userEmail = $userEmail;
        $token->expiration = $tokenExp;
        $token->value = $tokenValue;
       // Mail::to('kevinmorapais532@gmail.com')->send(new Mailer($token));
        $token->save();
    }

    function accountActivation($userEmail, $token)
    {
        $expiredTokens = Token::where('expiration', '<', date('Y/m/d H:i:s'))->get();
        foreach ($expiredTokens as $token){
            User::where('correo', $token->userEmail)->where('state', 0)->delete();
        }
        Token::where('expiration', '<', date('Y/m/d H:i:s'))->delete();
        if (Token::where('userEmail', $userEmail)->where('value', $token)->doesntExist()){
            return $this->sendError('Invalid email-token combination.', 404, 'Token and email values did not match any record.');
        }
        User::where('correo', $userEmail)->update(['state' => 1]);
        Token::where('userEmail', $userEmail)->delete();
        return $this->sendResponse('Account activated successfully.', 'Ok.', 201);
    }
}
