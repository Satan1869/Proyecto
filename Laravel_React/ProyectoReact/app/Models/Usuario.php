<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'usuario';

    // Nombre de la clave primaria
    protected $primaryKey = 'Id';

    // Evitar timestamps si la tabla no tiene created_at y updated_at
    public $timestamps = false;

    // Campos que se pueden llenar masivamente
    protected $fillable = ['NombreUsuario', 'Correo', 'Clave'];

    public function getAuthPassword()
{
    return $this->Clave; // Indica que la columna de la contraseña es 'Clave'
}

    // Mutador para encriptar la clave automáticamente
   /*/ public function setClaveAttribute($value)
    {
        $this->attributes['Clave'] = bcrypt($value);
    } /*/ 
}
