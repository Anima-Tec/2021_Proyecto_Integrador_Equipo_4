<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pot;
use App\Models\Donation;
use App\Mail\Mailer;
use Illuminate\Support\Facades\Mail;

date_default_timezone_set("America/Argentina/Buenos_Aires");

class DonationHandler extends Controller
{
    // Comments ------------------------------------------------------------------------------------------------------------------------------
    // Pots ------------------------------------------------------------------------------------------------------------------------------
    // Pagers ------------------------------------------------------------------------------------------------------------------------------
    // Donations ------------------------------------------------------------------------------------------------------------------------------
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
        Donation::create([
            'potId' => $validatedData['potId'],
            'authorEmail' => $user->email,
            'donationType' => $validatedData['donationType']
        ]);

        $potOwner = Pot::where('id', $validatedData['potId'])->select('authorEmail')->get()[0]->authorEmail;
        Mail::to($potOwner)->send(new Mailer(['authorEmail' => $user->email, 'donationType' => $validatedData['donationType']]));
        return response()->json([
            'message' => 'New donation created.'
        ]);
    }
}
