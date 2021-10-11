<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Token;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Mail\Mailer;
use Illuminate\Support\Facades\Mail;

date_default_timezone_set("America/Argentina/Buenos_Aires");
class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'fullName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8'
        ]);

        $user = User::create([
            'fullName' => $validatedData['fullName'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password'])
        ]);
        $user->createToken('auth_token')->plainTextToken;

        $currentDate = date('Y/m/d H:i:s');
        $expTimeStamp = strtotime(" $currentDate + 5 minutes");

        $token = Token::create([
            'tokenValue' => rand(111111, 999999),
            'email' => $validatedData['email'],
            'expiration' =>  date('Y/m/d H:i:s', $expTimeStamp)
        ]);
        Mail::to($validatedData['email'])->send(new Mailer($token));

        return response()->json([
            'Message' => 'Account must be activated, an email has been sent.',
        ]);
    }
    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Invalid login credentials'
            ], 401);
        }
        
        $user = User::where('email', $request['email'])->firstOrFail();
        if (!$user->email_verified_at){
            return response()->json([
                'message' => 'Account has not been activated.'
            ], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'username' => $user->fullName,
            'access_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

    public function accountActivation(Request $request)
    {
        $expiredTokens = Token::where('expiration', '<', date('Y/m/d H:i:s'))->get();
        Token::where('expiration', '<', date('Y/m/d H:i:s'))->delete();
        foreach ($expiredTokens as $token) {
            User::where('email', $token->email)->where('email_verified_at', null)->delete();
        }

        $validatedData = $request->validate([
            'email' => 'required|string|email|max:255',
            'token' => 'required|integer'
        ]);

        if (Token::where('email', $validatedData['email'])->where('tokenValue', $validatedData['token'])->exists()) {
            User::where('email', $validatedData['email'])->update(['email_verified_at' => date('Y/m/d H:i:s')]);
            Token::where('email', $validatedData['email'])->delete();

            return response()->json([
                'Message' => 'User activated successfully.'
            ]);
        }
        return response()->json([
            'Message' => 'Token has expired or provided values are incorrect.'
        ], 404);
    }
}
