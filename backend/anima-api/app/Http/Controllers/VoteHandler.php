<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pot;
use App\Models\Vote;
use Illuminate\Validation\Rule;

date_default_timezone_set("America/Argentina/Buenos_Aires");

class VoteHandler extends Controller
{
    public function createVote(Request $request)
    {
        $dataValidation = $this->getValidationFactory()->make($request->only(['potID', 'value']), [
            'potID' => 'required|integer|exists:App\Models\Pot,id',
            'value' => ['required', Rule::in(['1', '2', '3', '4', '5'])],
        ]);

        if (!$dataValidation->passes()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }

        $validatedData = $request->only(['potID', 'value']);
        $user = $request->user();

        if (Vote::where('votedPot', $validatedData['potID'])->where('authorEmail', $user->email)->exists()) {
            Vote::where('votedPot', $validatedData['potID'])->where('authorEmail', $user->email)->delete();
        }

        Vote::create([
            'votedPot' => $validatedData['potID'],
            'value' => $validatedData['value'],
            'authorEmail' => $user->email
        ]);
        $newVoteAvg = Vote::where('votedPot', $validatedData['potID'])->avg('value');
        $totalVotes = Vote::where('votedPot', $validatedData['potID'])->count();
        Pot::where('id', $validatedData['potID'])->update(['vote_average' => $newVoteAvg, 'vote_count' => $totalVotes]);
        return response()->json([
            'message' => 'New vote created.'
        ]);
    }
}
