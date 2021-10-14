<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Pot;
use App\Models\Donation;
use Illuminate\Support\Facades\Cache;
use App\Mail\Mailer;
use Illuminate\Support\Facades\Mail;

date_default_timezone_set("America/Argentina/Buenos_Aires");

class ServiceHandler extends Controller
{
    public function getAllPotsFromUser(Request $request)
    {
        $user = $request->user();
        $Pots = Pot::where('state', 1)->where('authorEmail', $user->email)
            ->select('*')
            ->get();

        return response()->json([
            'Pots' => $Pots
        ], 200);
    }

    public function getAllPots()
    {
        $potsCache = Cache::get('pots');

        if ($potsCache) {
            return response()->json([
                'Pots' => $potsCache
            ], 200);
        }

        $Pots = Pot::where('state', 1)
            ->select('*')
            ->get();

        Cache::put('pots', $Pots, 600);

        return response()->json([
            'Pots' => $Pots
        ], 200);
    }

    public function getPotsPager($offset, $limit)
    {
        $dataValidation = $this->getValidationFactory()->make(['offset' => $offset, 'limit' => $limit], [
            'offset' => 'required|integer',
            'limit' => 'required|integer'
        ]);

        if (!$dataValidation->passes()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }

        $Pots = Pot::where('state', 1)
            ->skip($limit * $offset)
            ->take($limit)
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
        Cache::forget('pots');
        return response()->json([
            'message' => 'New pot created.'
        ]);
    }

    public function getDonationsPager(Request $request, $offset, $limit)
    {
        $dataValidation = $this->getValidationFactory()->make(['offset' => $offset, 'limit' => $limit], [
            'offset' => 'required|integer',
            'limit' => 'required|integer'
        ]);

        if (!$dataValidation->passes()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }
        
        $user = $request->user();

        $Pots = Donation::where('authorEmail', $user->email)
            ->skip($limit * $offset)
            ->take($limit)
            ->get();


        return response()->json([
            'Pots' => $Pots
        ], 200);
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
