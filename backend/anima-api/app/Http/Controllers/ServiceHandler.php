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
        $dataValidation = $this->getValidationFactory()->make($request->only(['name', 'desc', 'openFrom', 'to']), [
            'name' => 'required|string|max:255',
            'desc' => 'required|string',
            'openFrom' => 'required|date_format:H:i',
            'to' => 'required|date_format:H:i'
        ]);

        if (!$dataValidation->passes()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }

        $validatedData = $request->only(['name', 'desc', 'openFrom', 'to']);
        $user = $request->user();

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

    public function getDonationsFromUser(Request $request)
    {
        $user = $request->user();
        $donations = Donation::where('authorEmail', $user->email)
            ->select('*')
            ->get();
        return response()->json([
            'Donations' => $donations
        ]);
    }

    public function createDonation(Request $request)
    {
        $dataValidation = $this->getValidationFactory()->make($request->only(['potId', 'donationType']), [
            'potId' => 'required|integer',
            'donationType' => 'required|string'
        ]);

        if (!$dataValidation->passes()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }

        $validatedData = $request->only(['potId', 'donationType']);

        $user = $request->user();

        if (Pot::where('id', $validatedData['potId'])->doesntExist()) {
            return response()->json([
                'message' => 'Pot not found.'
            ], 404);
        }

        $user = Donation::create([
            'potId' => $validatedData['potId'],
            'authorEmail' => $user->email,
            'donationType' => $validatedData['donationType']
        ]);

        return response()->json([
            'message' => 'New donation created.'
        ]);
    }
}
