<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pot;
use App\Models\Donation;

date_default_timezone_set("America/Argentina/Buenos_Aires");

class ServiceHandler extends Controller
{
    public function getAllPots()
    {
        $Pots = Pot::where('state', 1)
            ->select('*')
            ->get();

        return response()->json([
            'Pots' => $Pots
        ], 200);
    }

    public function createPot(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'required|string',
            'openFrom' => 'required',
            'to' => 'required'
        ]);
        $user = $request->user();
        // if (User::where('email', $validatedData['authorEmail'])->doesntExist()) {
        //     return response()->json([
        //         'message' => 'Email does not belong to a registered user.'
        //     ], 404);
        // }

        Pot::create([
            'name' => $validatedData['name'],
            'authorEmail' => $user->email,
            'desc' => $validatedData['desc'],
            'openFrom' => $validatedData['openFrom'],
            'to' => $validatedData['to'],
        ]);

        return response()->json([
            'message' => 'New pot created.'
        ]);
    }

    public function getDonationsFromUser(Request $request, $userEmail)
    {
        $donations = Donation::where('authorEmail', $userEmail)
            ->select('*')
            ->get();
        return response()->json([
            'Donations' => $donations
        ]);
    }

    public function createDonation(Request $request)
    {
        $validatedData = $request->validate([
            'potId' => 'required|integer',
            'authorEmail' => 'required|string|email|max:255',
            'donationType' => 'required|string'
        ]);
        if (User::where('email', $validatedData['authorEmail'])->doesntExist()) {
            return response()->json([
                'message' => 'Email does not belong to a registered user.'
            ], 404);
        }
        if (Pot::where('id', $validatedData['potId'])->doesntExist()) {
            return response()->json([
                'message' => 'Pot not found.'
            ], 404);
        }

        $user = Donation::create([
            'potId' => $validatedData['potId'],
            'authorEmail' => $validatedData['authorEmail'],
            'donationType' => $validatedData['donationType']
        ]);

        return response()->json([
            'message' => 'New donation created.'
        ]);
    }
}
