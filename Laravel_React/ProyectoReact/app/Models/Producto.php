<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'productos';

    // Nombre de la clave primaria
    protected $primaryKey = 'id';

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'Nombre',
        'Imagen',
        'Descripcion',
        'Precio',
        'Stock',
    ];

    // Evitar timestamps si la tabla no tiene created_at y updated_at
    public $timestamps = false;
}