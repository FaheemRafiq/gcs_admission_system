<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdmissionFormResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return array_merge(
            parent::toArray($request), [
                'created_at'   => $this->created_at?->format(config('app.formats.informal.datetime')),
                'dob'          => $this->dob?->format(config('app.formats.formal.date')),
                'examinations' => $this->whenLoaded('examinations', FormExaminationResource::collection($this->examinations)),
            ]
        );
    }
}
