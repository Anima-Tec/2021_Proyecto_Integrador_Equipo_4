<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $connection='olla_popular';
    protected $table='usuario';
    protected $primaryKey = 'correo';
    public $timestamps=false;
}
