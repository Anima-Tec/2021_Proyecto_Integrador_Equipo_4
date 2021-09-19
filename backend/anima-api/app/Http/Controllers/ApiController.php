<?php

namespace App\Http\Controllers;

class ApiController
{
    public function sendResponse($result, $message, $code)
    {
        $response = [
            "success" => true,
            "data" => $result,
            "message" => $message
        ];
        return response()->json($response, $code);
    }

    public function sendError($error, $code, $errorMessages = [])
    {
        $response = [
            "success" => false,
            "error" => $error,
            "errorMessages" => $errorMessages
        ];
        return response()->json($response, $code);
    }
}
