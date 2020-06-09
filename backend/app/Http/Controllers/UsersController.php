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
        
        try {
            $user = User::where('cpf', $request->input('cpf'))->first();

            if(Hash::check($request->input('password'), $user->password)){
                $apikey = base64_encode(Str::random(40));
                User::where('cpf', $request->input('cpf'))->update(['api_key' => "$apikey"]);
                return response()->json(['status' => true,'api_key' => $apikey, 'cpf' => $request->input('cpf')]);
            }else{
                return response()->json(['status' => false]);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => false]);
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
        $user->balance = 0;

        $user->save();

    }

    public function show(Request $request)
    {
        $user = User::where('id', $request->userid)->first();
        return $user;
    }

    public function saque(Request $request)
    {
        $this->validate($request, [
            'valor' => 'required'
        ]);

        $user = User::where('id', $request->userid)->first();
        if ($request->valor > $user->balance) {
            $balance = $user->balance;
            $message = 'O valor de saque R$'. $request->valor . ' é maior que o saldo em conta.';
            return response()->json(['balance' => $balance, 'message' => $message, 'status' => false]);
        } else {
            $balance = $user->balance - $request->valor;
            User::where('cpf', $user->cpf)->update(['balance' => $balance]);
            $message = 'Saque de R$'. $request->valor . ' realizado com sucesso.';
            return response()->json(['balance' => $balance, 'message' => $message, 'status' => true]);
        }
    }

    public function deposito(Request $request)
    {
        $this->validate($request, [
            'valor' => 'required'
        ]);

        $user = User::where('id', $request->userid)->first();

        $balance = $user->balance + $request->valor;
        User::where('cpf', $user->cpf)->update(['balance' => $balance]);
        $message = 'Depósito de R$'. $request->valor . ' realizado com sucesso.';
        
        return response()->json(['balance' => $balance, 'message' => $message]);
    }

    public function transferencia(Request $request)
    {
        $this->validate($request, [
            'cpf' => 'required',
            'valor' => 'required'
        ]);
        $cpf_destinatario = $request->cpf;
        $user = User::where('id', $request->userid)->first();
        $user_destinatario = User::where('cpf', $cpf_destinatario)->first();
        
        if ($request->valor > $user->balance) {
            $message = 'O valor da transferência R$'. $request->valor . ' é maior que o saldo em conta.';
            return response()->json(['balance' => $user->balance, 'message' => $message, 'status' => false]);
        } else {
            $balance = $user->balance - $request->valor;
            User::where('id', $request->userid)->update(['balance' => $balance]);
            User::where('id', $user_destinatario->id)->update(['balance' => $user_destinatario->balance + $request->valor]);
            $message = 'Tranferência de R$'. $request->valor . ' realizado com sucesso.';
            return response()->json(['balance' => $balance, 'message' => $message, 'status' => true]);
        }
    }

}

?>