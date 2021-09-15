<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class donation extends Model
{
    use HasFactory;
    protected $connection='olla_popular';
    protected $table='donacion';
    protected $primaryKey = "idDonacion";
    public $timestamps=false;
}
