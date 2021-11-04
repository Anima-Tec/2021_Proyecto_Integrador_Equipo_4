<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pot;
use App\Models\Donation;

date_default_timezone_set("America/Argentina/Buenos_Aires");

class PagerHandler extends Controller
{
    public function pagerWithAuth(Request $request, $contentType, $offset, $limit)
    {
        $dataValidation = $this->getValidationFactory()->make(['offset' => $offset, 'limit' => $limit], [
            'offset' => 'required|integer',
            'limit' => 'required|integer'
        ]);

        if (!$dataValidation->passes()) {
            return response()->json([
                'message' => 'Invalid offset or limit values were provided, check documentation for validation requirements.',
            ], 400);
        }
        switch ($contentType) {
            case 'donations':

                $user = $request->user();
                $pagesLeft = ceil((Donation::where('authorEmail', $user->email)->count() / $limit) - $offset);

                $Donations = Donation::where('authorEmail', $user->email)
                    ->skip($limit * $offset)
                    ->take($limit)
                    ->get();

                $pagesLeft = $pagesLeft - 1;

                if ($pagesLeft < 0) {
                    $pagesLeft = 0;
                }

                return response()->json([
                    'Donations' => $Donations,
                    'PagesLeft' => abs($pagesLeft)
                ], 200);

                break;

            case 'pots':

                $user = $request->user();
                $pagesLeft = ceil((Pot::where('authorEmail', $user->email)->count() / $limit) - $offset);

                $Pots = Pot::where('authorEmail', $user->email)
                    ->skip($limit * $offset)
                    ->take($limit)
                    ->get();

                $pagesLeft = $pagesLeft - 1;

                if ($pagesLeft < 0) {
                    $pagesLeft = 0;
                }


                return response()->json([
                    'Pots' => $Pots,
                    'PagesLeft' => abs($pagesLeft)
                ], 200);

                break;

            default:
                return response()->json([
                    'message' => "Content of type '$contentType' not found."
                ], 404);
        }
    }

    public function pagerWithoutAuth($contentType, $offset, $limit)
    {
        $dataValidation = $this->getValidationFactory()->make(['offset' => $offset, 'limit' => $limit], [
            'offset' => 'required|integer',
            'limit' => 'required|integer'
        ]);

        if (!$dataValidation->passes()) {
            return response()->json([
                'message' => 'Invalid offset or limit values were provided, check documentation for validation requirements.',
            ], 400);
        }
        switch ($contentType) {
            case 'donations':

                $pagesLeft = ceil((Donation::count() / $limit) - $offset);

                $Donations = Donation::skip($limit * $offset)
                    ->take($limit)
                    ->get();

                $pagesLeft = $pagesLeft - 1;

                if ($pagesLeft < 0) {
                    $pagesLeft = 0;
                }

                return response()->json([
                    'Donations' => $Donations,
                    'PagesLeft' => abs($pagesLeft)
                ], 200);

                break;

            case 'pots':

                $pagesLeft = ceil((Pot::where('state', 1)->count() / $limit) - $offset);

                $Pots = Pot::where('state', 1)->skip($limit * $offset)
                    ->take($limit)
                    ->get();

                $pagesLeft = $pagesLeft - 1;

                if ($pagesLeft < 0) {
                    $pagesLeft = 0;
                }

                return response()->json([
                    'Pots' => $Pots,
                    'PagesLeft' => abs($pagesLeft)
                ], 200);

                break;

            default:
                return response()->json([
                    'message' => "Content of type '$contentType' not found."
                ], 404);
        }
    }
}
