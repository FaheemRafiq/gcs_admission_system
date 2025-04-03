<?php

namespace App\Exports;

use App\Models\AdmissionForm;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Maatwebsite\Excel\Concerns\WithTitle;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithHeadings;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithColumnWidths;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;

class AdmissionFormsExport implements FromCollection, WithColumnWidths, WithCustomStartCell, WithEvents, WithHeadings, WithMapping, WithTitle
{
    protected $filters;

    // Constructor to accept filters
    public function __construct(array $filters = [])
    {
        $this->filters = $filters;
    }

    public function collection()
    {
        $query = AdmissionForm::with('examinations');

        // Apply filters conditionally
        if (! empty($this->filters['status'])) {
            $query->where('status', $this->filters['status']);
        }

        if (! empty($this->filters['program'])) {
            $query->where('program', $this->filters['program']);
        }

        if (! empty($this->filters['shift'])) {
            $query->where('shift', $this->filters['shift']);
        }

        if (! empty($this->filters['start_date']) && ! empty($this->filters['end_date'])) {
            $query->whereBetween('created_at', [$this->filters['start_date'], $this->filters['end_date']]);
        } elseif (! empty($this->filters['start_date'])) {
            $query->where('created_at', '>=', $this->filters['start_date']);
        } elseif (! empty($this->filters['end_date'])) {
            $query->where('created_at', '<=', $this->filters['end_date']);
        }

        if (! empty($this->filters['search'])) {
            $search = $this->filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('form_no', 'like', "%{$search}%")
                    ->orWhere('cnic', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    /**
     * Start at cell A2 to allow for section headers in row 1
     */
    public function startCell(): string
    {
        return 'A2';
    }

    /**
     * Define column headings
     */
    public function headings(): array
    {
        return [
            // Applicant Information
            'Form Number',
            'Status',
            'Name',
            'Cell',
            'Father Name',
            'Father Cell',
            'CNIC',
            'Domicile',
            'Religion',
            'Date of Birth',
            'Email',
            'Father Occupation',
            'Father CNIC',
            'Photo Path',

            // Program Details
            'Shift',
            'Program Category',
            'Program Value',
            'Intermediate Subjects',

            // Examination Details (Matric)
            'Year',
            'Roll No',
            'Marks',
            'Percentage',
            'Subjects',
            'Board/University',
            'School/College',

            // Examination Details (Intermediate)
            'Year',
            'Roll No',
            'Marks',
            'Percentage',
            'Subjects',
            'Board/University',
            'School/College',

            // Examination Details (Associate)
            'Year',
            'Roll No',
            'Marks',
            'Percentage',
            'Subjects',
            'Board/University',
            'School/College',

            // Contact Information
            'Guardian Name',
            'Guardian Occupation',
            'Guardian Cell',
            'Present Address',
            'Permanent Address',

            // Timestamps
            'Created At',
            'Updated At',
        ];
    }

    /**
     * Column widths based on content
     */
    public function columnWidths(): array
    {
        return [
            // Applicant Information
            'A' => 15,  // Form Number
            'B' => 12,  // Status
            'C' => 25,  // Name
            'D' => 15,  // Cell
            'E' => 25,  // Father Name
            'F' => 15,  // Father Cell
            'G' => 20,  // CNIC
            'H' => 15,  // Domicile
            'I' => 12,  // Religion
            'J' => 15,  // Date of Birth
            'K' => 30,  // Email
            'L' => 20,  // Father Occupation
            'M' => 20,  // Father CNIC
            'N' => 40,  // Photo Path

            // Program Details
            'O' => 12,  // Shift
            'P' => 20,  // Program Category
            'Q' => 25,  // Program Value
            'R' => 30,  // Intermediate Subjects

            // Examination Details (Matric)
            'S' => 10,  // Year
            'T' => 15,  // Roll No
            'U' => 10,  // Marks
            'V' => 12,  // Percentage
            'W' => 25,  // Subjects
            'X' => 25,  // Board/University
            'Y' => 30,  // School/College

            // Examination Details (Intermediate)
            'Z'  => 10,   // Year
            'AA' => 15,  // Roll No
            'AB' => 10,  // Marks
            'AC' => 12,  // Percentage
            'AD' => 25,  // Subjects
            'AE' => 25,  // Board/University
            'AF' => 30,  // School/College

            // Examination Details (Associate)
            'AG' => 10,  // Year
            'AH' => 15,  // Roll No
            'AI' => 10,  // Marks
            'AJ' => 12,  // Percentage
            'AK' => 25,  // Subjects
            'AL' => 25,  // Board/University
            'AM' => 30,  // School/College

            // Contact Information
            'AN' => 20,  // Guardian Name
            'AO' => 20,  // Guardian Occupation
            'AP' => 15,  // Guardian Cell
            'AQ' => 40,  // Present Address
            'AR' => 40,  // Permanent Address

            // Timestamps
            'AS' => 20,  // Created At
            'AT' => 20,  // Updated At
        ];
    }

    /**
     * Define events for sheet customization
     */
    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $sheet = $event->sheet->getDelegate();

                // Define section headers with unique colors
                $sectionHeaders = [
                    'A1:N1' => [
                        'title' => 'APPLICANT INFORMATION',
                        'color' => '4472C4', // Blue
                    ],
                    'O1:R1' => [
                        'title' => 'PROGRAM DETAILS',
                        'color' => '70AD47', // Green
                    ],
                    'S1:Y1' => [
                        'title' => 'EXAMINATION DETAILS (MATRIC)',
                        'color' => 'FFC107', // Amber
                    ],
                    'Z1:AF1' => [
                        'title' => 'EXAMINATION DETAILS (INTERMEDIATE)',
                        'color' => 'FF5722', // Deep Orange
                    ],
                    'AG1:AM1' => [
                        'title' => 'EXAMINATION DETAILS (ASSOCIATE)',
                        'color' => '9C27B0', // Purple
                    ],
                    'AN1:AR1' => [
                        'title' => 'CONTACT INFORMATION',
                        'color' => '0288D1', // Light Blue
                    ],
                    'AS1:AT1' => [
                        'title' => 'TIMESTAMPS',
                        'color' => '455A64', // Blue Grey
                    ],
                ];

                // Add section headers and apply styles
                foreach ($sectionHeaders as $range => $config) {
                    $sheet->mergeCells($range);
                    $sheet->setCellValue(explode(':', $range)[0], $config['title']);

                    $sheet->getStyle($range)->applyFromArray([
                        'font' => [
                            'bold'  => true,
                            'size'  => 12,
                            'color' => ['rgb' => 'FFFFFF'], // White text
                        ],
                        'fill' => [
                            'fillType'   => Fill::FILL_SOLID,
                            'startColor' => ['rgb' => $config['color']],
                        ],
                        'alignment' => [
                            'horizontal' => Alignment::HORIZONTAL_CENTER,
                            'vertical'   => Alignment::VERTICAL_CENTER,
                        ],
                    ]);
                }

                // Style column headers (row 2)
                $lastColumn = 'AT';
                $sheet->getStyle("A2:{$lastColumn}2")->applyFromArray([
                    'font' => [
                        'bold' => true,
                    ],
                    'fill' => [
                        'fillType'   => Fill::FILL_SOLID,
                        'startColor' => ['rgb' => 'D9E1F2'], // Light blue-grey for headers
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical'   => Alignment::VERTICAL_CENTER,
                    ],
                ]);

                // Auto-filter for data columns
                $sheet->setAutoFilter("A2:{$lastColumn}2");

                // Wrap text for all columns
                $sheet->getStyle("A:{$lastColumn}")->getAlignment()->setWrapText(true);
            },
        ];
    }

    public function map($form): array
    {
        $matric        = $form->examinations->firstWhere('name', 'Matric');
        $intermediate  = $form->examinations->firstWhere('name', 'Intermediate');
        $associate     = $form->examinations->firstWhere('name', 'Associate Degree');

        return [
            // Applicant Information
            $form->form_no,
            $form->status,
            $form->name,
            $form->cell,
            $form->father_name,
            $form->father_cell,
            $form->cnic,
            $form->domicile,
            $form->religion,
            $form->dob ? \Carbon\Carbon::parse($form->dob)->format('Y-m-d') : 'N/A',
            $form->email,
            $form->father_occupation,
            $form->father_cnic,
            $form->photo_path,

            // Program Details
            $form->shift,
            $form->program_category,
            $form->program_value,

            // Examination Details (Matric)
            $matric->year             ?? 'N/A',
            $matric->roll_no          ?? 'N/A',
            $matric->marks            ?? 'N/A',
            $matric->percentage       ?? 'N/A',
            $matric->subjects         ?? 'N/A',
            $matric->board_university ?? 'N/A',
            $matric->school_college   ?? 'N/A',

            // Examination Details (Intermediate)
            $intermediate->year             ?? 'N/A',
            $intermediate->roll_no          ?? 'N/A',
            $intermediate->marks            ?? 'N/A',
            $intermediate->percentage       ?? 'N/A',
            $intermediate->subjects         ?? 'N/A',
            $intermediate->board_university ?? 'N/A',
            $intermediate->school_college   ?? 'N/A',

            // Examination Details (Associate)
            $associate->year             ?? 'N/A',
            $associate->roll_no          ?? 'N/A',
            $associate->marks            ?? 'N/A',
            $associate->percentage       ?? 'N/A',
            $associate->subjects         ?? 'N/A',
            $associate->board_university ?? 'N/A',
            $associate->school_college   ?? 'N/A',

            // Contact Information
            $form->guardian_name       ?? 'N/A',
            $form->guardian_occupation ?? 'N/A',
            $form->guardian_cell       ?? 'N/A',
            $form->present_address,
            $form->permanent_address,

            // Timestamps
            $form->created_at->toDateTimeString(),
            $form->updated_at->toDateTimeString(),
        ];
    }

    public function title(): string
    {
        return 'Admission Forms';
    }
}
