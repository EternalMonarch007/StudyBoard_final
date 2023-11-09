<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    use HasFactory;
    protected $table = 'qa_policies';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'policies'
    ];
}
