<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Donation;
use App\Http\Controllers\ApiController;

class ControllerD extends ApiController
{
    
    public function getDonationsFromUser(Request $request, $userEmail)
    {
        $donations = Donation::where('userEmail', $userEmail)
        ->select('*')
            ->get();
        return $this->sendResponse($donations, "");
    }
    
    public function saveDonation(Request $request)
    {
        try {
            $newDonation = new Donation();
            $newDonation->idOlla = $request->input('idOlla');
            $newDonation->email = $request->input('email');
            $newDonation->tipoDonacion = $request->input('type');
            $newDonation->fecha = date("Y/m/d");
            $newDonation->save();
            return "Donation stored successfully";
        } catch (\Illuminate\Database\QueryException $e) {
            return "Error $e";
        }
    }
}
