<?php
namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    // Obtener todos los usuarios
    public function index()
    {
        return response()->json(Usuario::all(), 200);
    }

    public function store(Request $request)
    {
        // Validar los datos
        $validator = Validator::make($request->all(), [
            'NombreUsuario' => 'required|string|max:255',
            'Correo' => 'required|email|unique:usuario,Correo',
            'Clave' => 'required|string|min:1',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }
    
        // Crear usuario
        $usuario = Usuario::create([
            'NombreUsuario' => $request->NombreUsuario,
            'Correo' => $request->Correo,
            'Clave' => bcrypt($request->Clave), // Encriptar la clave
        ]);
    
        return response()->json($usuario, 201);
    }
    

    // Obtener un usuario por ID con manejo de error 404
    public function show($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }
        return response()->json($usuario, 200);
    }

    // Actualizar usuario con validación
    public function update(Request $request, $id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        // Validar datos
        $validator = Validator::make($request->all(), [
            'NombreUsuario' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:usuarios,email,' . $id,
            'password' => 'sometimes|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Actualizar usuario
        $usuario->update($request->all());

        return response()->json($usuario, 200);
    }

   

    // Eliminar usuario
    public function destroy($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado'], 200);
    }

// login

    public function login(Request $request)
{
    $request->validate([
        'Correo' => 'required|email',
        'Clave' => 'required|string',
    ]);

    $usuario = Usuario::where('Correo', $request->Correo)->first();

    if (!$usuario || !Hash::check($request->Clave, $usuario->Clave)) {
        return response()->json(['error' => 'Credenciales inválidas'], 401);
    }

    $token = $usuario->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Inicio de sesión exitoso',
        'token' => $token,
        'user' => $usuario,
    ]);
}

public function logout(Request $request)
{
    $request->user()->tokens()->delete();
    return response()->json(['message' => 'Cierre de sesión exitoso'], 200);
}





}
