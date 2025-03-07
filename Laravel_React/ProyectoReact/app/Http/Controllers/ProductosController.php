<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Illuminate\Support\Facades\Storage;

class ProductosController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'Nombre' => 'required|string|max:100',
            'Descripcion' => 'nullable|string',
            'Precio' => 'required|numeric',
            'Stock' => 'required|integer',
            'Imagen' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        // Manejo de imagen
        if ($request->hasFile('Imagen')) {
            $imagenPath = $request->file('Imagen')->store('productos', 'public');
        } else {
            $imagenPath = null;
        }

        $producto = Producto::create([
            'Nombre' => $request->Nombre,
            'Descripcion' => $request->Descripcion,
            'Precio' => $request->Precio,
            'Stock' => $request->Stock,
            'Imagen' => $imagenPath, // Guardamos solo la ruta
        ]);

        return response()->json($producto, 201);
    }

    public function index()
    {
        $productos = Producto::all();
        return response()->json($productos);
    }
}
