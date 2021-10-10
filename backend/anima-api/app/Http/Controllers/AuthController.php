<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Token;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

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
        $accessToken = $user->createToken('auth_token')->plainTextToken;

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
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'accsess_token' => $token,
            'token_type' => 'Bearer'
        ]);
    }

}
