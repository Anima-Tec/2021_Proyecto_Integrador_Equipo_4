<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Models\Comment;

date_default_timezone_set("America/Argentina/Buenos_Aires");

class CommentHandler extends Controller
{
    // Comments ------------------------------------------------------------------------------------------------------------------------------
    public function createComment(Request $request)
    {

        $dataValidation = Validator::make($request->all(), [
            'potID' => 'required|integer|exists:App\Models\Pot,id',
            'body' => 'required|string|max:255'
        ]);

        if ($dataValidation->fails()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }

        $validatedData = $request->only(['potID', 'body']);
        $user = $request->user();

        Comment::create([
            'potID' => $validatedData['potID'],
            'authorEmail' => $user->email,
            'body' => $validatedData['body']
        ]);

        return response()->json([
            'message' => 'New comment created.'
        ]);
    }

    public function getCommentsFromPot($potID)
    {
        $dataValidation = Validator::make(['potID' => $potID], [
            'potID' => 'required|integer'
        ]);

        if ($dataValidation->fails()) {
            return response()->json([
                'message' => 'Invalid values were provided, check documentation for validation requirements.',
            ], 400);
        }
        $Comments = Comment::where('potID', $potID)->get();
        return response()->json([
            "Comments" => $Comments
        ], 200);
    }

    public function getCommentsFromUser(Request $request)
    {
        $Comments = Comment::where('authorEmail', $request->user()->email)->get();
        return response()->json([
            "Comments" => $Comments
        ], 200);
    }
}
