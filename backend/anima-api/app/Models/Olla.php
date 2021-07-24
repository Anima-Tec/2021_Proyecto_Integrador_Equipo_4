<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Olla extends Model
{
    use HasFactory;
    protected $connection='databasepe';
    protected $table='ollas';
    protected $primaryKey = "id";
    public $timestamps=false;
}
