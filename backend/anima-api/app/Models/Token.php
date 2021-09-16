<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Token extends Model
{
    use HasFactory;
    protected $connection='olla_popular';
    protected $table='user_account_activation';
    protected $primaryKey = 'userEmail';
    public $timestamps=false;
}
