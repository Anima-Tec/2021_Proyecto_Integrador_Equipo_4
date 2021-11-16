<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Models\Pot;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\File;

date_default_timezone_set("America/Argentina/Buenos_Aires");

class PotHandler extends Controller
{
    public function updatePot(Request $request, $potID)
    {
        $dataValidation = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'desc' => 'string',
            'openFrom' => 'date_format:H:i',
            'to' => 'date_format:H:i',
            'address' => 'string',
            'lat' => 'numeric',
            'lng' => 'numeric',
            'image' => 'mimes:jpg,png,jpeg,gif,svg',
            'isInNeed' => [Rule::in(['1', '0'])],
            'state' => [Rule::in(['1', '0'])]
        ]);

        if ($dataValidation->fails()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }

        $validatedData = $request->only(['name', 'desc', 'openFrom', 'to', 'address', 'lat', 'lng', 'image', 'isInNeed', 'state']);
        $user = $request->user();
        if (Pot::where('id', $potID)->doesntExist()) {
            return response()->json([
                'message' => 'Pot not found.'
            ], 404);
        }
        if (Pot::where('id', $potID)->where('authorEmail', $request->user()->email)->doesntExist()) {
            return response()->json([
                'message' => 'Pot does not belong to the current user.'
            ], 403);
        }
        $oldPot = Pot::where('id', $potID)->get()[0];
        $newPot = ['name' => $validatedData['name'] ?? $oldPot->name, 'authorEmail' => $user->email, 'desc' => $validatedData['desc'] ?? $oldPot->desc, 'openFrom' => $validatedData['openFrom'] ?? $oldPot->openFrom, 'to' => $validatedData['to'] ?? $oldPot->to, 'address' => $validatedData['address'] ?? $oldPot->address, 'lat' => $validatedData['lat'] ?? $oldPot->lat, 'lng' => $validatedData['lng'] ?? $oldPot->lng, 'isInNeed' => $validatedData['isInNeed'] ?? $oldPot->isInNeed, 'state' => $validatedData['state'] ?? $oldPot->state];
        if ($request->hasFile('image')) {
            File::delete(public_path("/assets/pots/pot_$potID/pot_$potID.jpg"));
            $request->file('image')->move(public_path("/assets/pots/pot_$potID"), "pot_$potID.jpg");
        }
        Pot::where('id', $potID)->update($newPot);
        return response()->json([
            'message' => 'Update successful.',
            'newValues' => $newPot
        ], 200);
    }
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

        $Pots = Pot::where('state', 1)
            ->select('*')
            ->get();

        return response()->json([
            'Pots' => $Pots
        ], 200);
    }

    public function createPot(Request $request)
    {

        $dataValidation = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'desc' => 'required|string',
            'openFrom' => 'required|date_format:H:i',
            'to' => 'required|date_format:H:i',
            'address' => 'required|string',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'image' => 'required|mimes:jpg,png,jpeg,gif,svg'
        ]);

        if ($dataValidation->fails()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }

        $validatedData = $request->only(['name', 'desc', 'openFrom', 'to', 'address', 'lat', 'lng']);
        $user = $request->user();

        Pot::create([
            'name' => $validatedData['name'],
            'authorEmail' => $user->email,
            'desc' => $validatedData['desc'],
            'openFrom' => $validatedData['openFrom'],
            'to' => $validatedData['to'],
            'address' => $validatedData['address'],
            'lat' => $validatedData['lat'],
            'lng' => $validatedData['lng']
        ]);

        $latestPot = Pot::where([
            ['name', '=', $validatedData['name']],
            ['authorEmail', '=',  $user->email],
            ['desc', '=',  $validatedData['desc']],
            ['openFrom', '=', $validatedData['openFrom']],
            ['to', '=', $validatedData['to']]
        ])->orderBy('id', 'desc')->select('id')->limit(1)->get()[0]->id;

        $fileName = "pot_" . $latestPot . ".jpg";
        $request->file('image')->move(public_path("/assets/pots/pot_$latestPot"), $fileName);
        Pot::where('id', $latestPot)->update(['imageURL' => url("/assets/pots/pot_$latestPot" . '/' . $fileName)]);

        return response()->json([
            'message' => 'New pot created.'
        ]);
    }

    public function getPotById(Request $request, $id)
    {
        if (Pot::where('id', $id)->doesntExist()) {
            return response()->json([
                'message' => "No pot under id $id was found."
            ], 404);
        }
        $Pot = Pot::where('id', $id)->get();
        return response()->json([
            'Pot' => $Pot
        ], 200);
    }
}
