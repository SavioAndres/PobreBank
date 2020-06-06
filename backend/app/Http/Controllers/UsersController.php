<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Str;

class UsersController extends Controller

{



    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function authenticate(Request $request)
    {
        $this->validate($request, [
            'cpf' => 'required',
            'password' => 'required'
        ]);

        $user = User::where('cpf', $request->input('cpf'))->first();

        if(Hash::check($request->input('password'), $user->password)){
            $apikey = base64_encode(Str::random(40));
            User::where('cpf', $request->input('cpf'))->update(['api_key' => "$apikey"]);;
            return response()->json(['status' => 'success','api_key' => $apikey]);
        }else{
            return response()->json(['status' => 'fail'],401);
        }
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'cpf' => 'required',
            'password' => 'required'
        ]);

        $user = new User;

        $user->name = $request->input('name');
        $user->cpf = $request->input('cpf');
        $user->password = Hash::make($request->input('password'));
        $user->api_key = base64_encode(Str::random(40));

        $user->save();

    }

}

?>