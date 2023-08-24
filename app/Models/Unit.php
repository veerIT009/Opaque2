<?php

namespace App\Models;

use App\Traits\HasJsonResourcefulData;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class Unit
 *
 * @property int $id
 * @property string $name
 * @property string $short_name
 * @property string $base_unit
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Unit newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Unit newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Unit query()
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereBaseUnit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereShortName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Unit whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Unit extends BaseModel
{
    use HasFactory, HasJsonResourcefulData;

    protected $table = 'units';

    const JSON_API_TYPE = 'units';

    protected $fillable = [
        'name',
        'short_name',
        'base_unit',
    ];

    public static $rules = [
        'name'       => 'required|unique:units',
        'short_name' => 'required',
        'base_unit'  => 'required',
    ];

    /**
     * @return array
     */
    function prepareLinks(): array
    {
        return [
            "self" => route('units.show', $this->id),
        ];
    }

    /**
     * @return array
     */
    function prepareAttributes(): array
    {
        $fields = [
            'name'       => $this->name,
            'short_name' => $this->short_name,
            'base_unit'  => $this->base_unit,
            'created_at' => $this->created_at,
        ];

        return $fields;
    }
}
