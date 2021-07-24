<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class donation extends Model
{
    use HasFactory;
    protected $connection='databasepe';
    protected $table='donations';
    protected $primaryKey = "id";
    public $timestamps=false;
}
