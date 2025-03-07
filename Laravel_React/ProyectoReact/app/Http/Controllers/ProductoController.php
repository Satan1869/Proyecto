<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    // Obtener todos los productos
    public function index()
    {
        $productos = Producto::all();
        return response()->json($productos, 200);
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        // Validar los datos
        $validator = Validator::make($request->all(), [
            'Nombre' => 'required|string|max:100',
            'Imagen' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Aceptar solo imágenes
            'Descripcion' => 'required|string',
            'Precio' => 'required|numeric|min:0',
            'Stock' => 'required|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Guardar la imagen en la carpeta storage/app/public/productos
        if ($request->hasFile('Imagen')) {
            $imagenPath = $request->file('Imagen')->store('productos', 'public');
        } else {
            return response()->json(['error' => 'No se proporcionó una imagen válida.'], 400);
        }

        // Crear el producto
        $producto = Producto::create([
            'Nombre' => $request->Nombre,
            'Imagen' => $imagenPath, // Guardar la ruta de la imagen
            'Descripcion' => $request->Descripcion,
            'Precio' => $request->Precio,
            'Stock' => $request->Stock,
        ]);

        return response()->json($producto, 201);
    }

    // Obtener un producto por ID
    public function show($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }
        return response()->json($producto, 200);
    }

    // Actualizar un producto
    public function update(Request $request, $id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        // Validar los datos
        $validator = Validator::make($request->all(), [
            'Nombre' => 'sometimes|string|max:100',
            'Imagen' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048', // Aceptar solo imágenes
            'Descripcion' => 'sometimes|string',
            'Precio' => 'sometimes|numeric|min:0',
            'Stock' => 'sometimes|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        // Actualizar la imagen si se proporciona una nueva
        if ($request->hasFile('Imagen')) {
            // Eliminar la imagen anterior si existe
            if ($producto->Imagen && Storage::disk('public')->exists($producto->Imagen)) {
                Storage::disk('public')->delete($producto->Imagen);
            }

            // Guardar la nueva imagen
            $imagenPath = $request->file('Imagen')->store('productos', 'public');
            $producto->Imagen = $imagenPath;
        }

        // Actualizar el producto
        $producto->Nombre = $request->input('Nombre', $producto->Nombre);
        $producto->Descripcion = $request->input('Descripcion', $producto->Descripcion);
        $producto->Precio = $request->input('Precio', $producto->Precio);
        $producto->Stock = $request->input('Stock', $producto->Stock);
        $producto->save();

        return response()->json($producto, 200);
    }

    // Eliminar un producto
    public function destroy($id)
    {
        $producto = Producto::find($id);
        if (!$producto) {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }

        // Eliminar la imagen asociada si existe
        if ($producto->Imagen && Storage::disk('public')->exists($producto->Imagen)) {
            Storage::disk('public')->delete($producto->Imagen);
        }

        $producto->delete();
        return response()->json(['message' => 'Producto eliminado'], 200);
    }
}