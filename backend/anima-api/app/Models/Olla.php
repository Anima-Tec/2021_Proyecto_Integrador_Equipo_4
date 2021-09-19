<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Olla extends Model
{
    use HasFactory;
    protected $connection='olla_popular';
    protected $table='olla';
    protected $primaryKey = 'idOlla';
    public $timestamps=false;
}
