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
});

$router->group(['middleware' => 'auth', 'prefix' => 'api/'], function () use ($router) {
    $router->get('usuario', 'UsersController@usuario');
    $router->get('saldo', 'UsersController@show');
    $router->put('saque', 'UsersController@saque');
    $router->put('deposito', 'UsersController@deposito');
    $router->put('transferencia', 'UsersController@transferencia');
    $router->post('deleteuser', 'UsersController@deleteUser');
});