<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(['prefix' => 'api/'], function ($router) {
    $router->post('login/', 'UsersController@authenticate');
    $router->post('create/', 'UsersController@create');
    $router->get('saldo/{cpf}', 'UsersController@show');
    $router->put('saque/{cpf}', 'UsersController@saque');
    $router->put('deposito/{cpf}', 'UsersController@deposito');
    $router->put('transferencia/{cpf}', 'UsersController@transferencia');
});

$router->group(['middleware' => 'auth', 'prefix' => 'api/'], function () use ($router) {
        
        $router->get('post', function ()    {
            return 'User ';
        });
    
        $router->get('user/profile', function () {
            // Uses Auth Middleware
        });

});