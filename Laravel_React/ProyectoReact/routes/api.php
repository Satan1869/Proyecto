<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;




// Ruta para obtener el listado de usuarios (GET)
Route::get('usuarios', [UsuarioController::class, 'index']);

// Ruta para obtener un usuario específico por ID (GET)
Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);

// Ruta para crear un nuevo usuario (POST)
Route::post('/usuarios', [UsuarioController::class, 'store']);

// Ruta para actualizar un usuario existente (PUT/PATCH)
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
Route::patch('/usuarios/{id}', [UsuarioController::class, 'update']);

// Ruta para eliminar un usuario (DELETE)
Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);


// Login

Route::post('/login', [UsuarioController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [UsuarioController::class, 'logout']);


// rutas de prouctos

// Obtener todos los productos
Route::get('/productos', [ProductoController::class, 'index']);

// Crear un nuevo producto
Route::post('/productos/crear', [ProductoController::class, 'store']);

// Obtener un producto por ID
Route::get('/productos/{id}', [ProductoController::class, 'show']);

// Actualizar un producto por ID
Route::put('/productos/actualizar/{id}', [ProductoController::class, 'update']);

// Eliminar un producto por ID
Route::delete('/productos/eliminar/{id}', [ProductoController::class, 'destroy']);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */
