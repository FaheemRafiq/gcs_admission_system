<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admission Form - {{ $form->form_no }}</title>
    <style>
        /* Regular styles */
        body {
            font-family: Arial, sans-serif;
            color: #000000;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            background: #f5f5f5;
        }
        .print-container {
            background: white;
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        @media print {
            body {
                padding: 0;
                background: white;
            }
            .print-container {
                width: 100%;
                min-height: auto;
                padding: 0;
                margin: 0;
                box-shadow: none;
            }
            .no-print {
                display: none !important;
            }
            @page {
                size: A4;
                margin: 20mm;
            }
        }
        /* Rest of your existing styles */
        h1 {
            font-size: 24px;
            font-weight: bold;
            color: #000000;
            text-align: center;
            margin: 5px 0;
        }
        p {
            margin: 2px 0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 10px 0;
        }
        th, td {
            border: 1px solid #000000;
            padding: 4px;
            text-align: left;
        }
        .header {
            width: 100%;
            margin-bottom: 20px;
            position: relative;
            height: 120px;
        }
        .logo {
            position: absolute;
            left: 0;
            top: 0;
            width: 100px;
            height: auto;
        }
        .title {
            text-align: center;
            margin-left: 100px;
            margin-right: 100px;
        }
        .photo-box {
            position: absolute;
            right: 0;
            top: 0;
            width: 90px;
            height: 120px;
            border: 1px solid #000000;
            text-align: center;
            overflow: hidden;
        }
        .photo-box img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .section {
            margin: 15px 0;
            clear: both;
        }
        .signature-line {
            border-top: 1px solid #000;
            width: 150px;
            margin-top: 50px;
            display: inline-block;
        }
        /* Print button styles */
        .print-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        .print-button:hover {
            background: #0056b3;
        }
        @media print {
            .print-button {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="print-container">
        <div class="header">
            <img src="{{ asset('android-chrome-512x512.png') }}" alt="College Logo" class="logo">
            <div class="title">
                <h1>Government Graduate College of Science</h1>
                <p>Wahdat Road, Lahore (www.gcslahore.edu.pk)</p>
                <p style="font-weight: bold;">APPLICATION FOR ADMISSION - {{ date('Y') }}</p>
            </div>
            <div class="photo-box">
                @if($form->photo_path)
                    <img src="{{ $form->photo_path }}" alt="Student Photo">
                @else
                    <p style="margin-top: 40px; font-size: 10px;">Paste one recent photograph of size 2" x 1.5" with blue background</p>
                @endif
            </div>
        </div>

        <div class="section">
            <p><strong>Form No:</strong> {{ $form->form_no }}</p>
            <p><strong>College Roll No:</strong> _________________</p>
            <p><strong>Diary No:</strong> _________________</p>
            <p><strong>Program/Group:</strong> {{ $form->program->program_full_name ?? '_________________' }}</p>
            <p><strong>Shift:</strong> {{ $form->shift ?? '_________________' }}</p>
        </div>

        <div class="section">
            <p><strong>Personal Information</strong></p>
            <table>
                <tr>
                    <td width="25%">Name of Candidate</td>
                    <td width="25%">{{ $form->name }}</td>
                    <td width="25%">Cell #</td>
                    <td width="25%">{{ $form->cell }}</td>
                </tr>
                <tr>
                    <td>Father's Name</td>
                    <td>{{ $form->father_name }}</td>
                    <td>Father's Cell #</td>
                    <td>{{ $form->father_cell }}</td>
                </tr>
                <tr>
                    <td>CNIC/B-Form</td>
                    <td>{{ $form->cnic }}</td>
                    <td>Domicile</td>
                    <td>{{ $form->domicile }}</td>
                </tr>
                <tr>
                    <td>Date of Birth</td>
                    <td>{{ \Carbon\Carbon::parse($form->dob)->format('d-m-Y') }}</td>
                    <td>Religion</td>
                    <td>{{ $form->religion }}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td colspan="3">{{ $form->email }}</td>
                </tr>
                <tr>
                    <td>Present Address</td>
                    <td colspan="3">{{ $form->present_address }}</td>
                </tr>
                <tr>
                    <td>Permanent Address</td>
                    <td colspan="3">{{ $form->permanent_address }}</td>
                </tr>
            </table>
        </div>

        <div class="section">
            <p><strong>Academic Record</strong></p>
            <table>
                <tr>
                    <th>Examination</th>
                    <th>Year</th>
                    <th>Roll No</th>
                    <th>Marks</th>
                    <th>%age</th>
                    <th>Board/University</th>
                    <th>School/College</th>
                </tr>
                @if($form->examinations && $form->examinations->count() > 0)
                    @foreach($form->examinations as $exam)
                        <tr>
                            <td>{{ $exam->name }}</td>
                            <td>{{ $exam->year ?? 'N/A' }}</td>
                            <td>{{ $exam->roll_no ?? 'N/A' }}</td>
                            <td>{{ $exam->obtained_marks }}/{{ $exam->total_marks }}</td>
                            <td>{{ $exam->percentage ? $exam->percentage . '%' : 'N/A' }}</td>
                            <td>{{ $exam->board_university ?? 'N/A' }}</td>
                            <td>{{ $exam->school_college ?? 'N/A' }}</td>
                        </tr>
                    @endforeach
                @endif
            </table>
        </div>

        <div class="section clearfix" style="margin-top: 30px;">
            <div style="float: left; width: 33%; text-align: center;">
                <div class="signature-line"></div>
                <p>Signature of Candidate</p>
            </div>
            <div style="float: left; width: 33%; text-align: center;">
                <div class="signature-line"></div>
                <p>Signature of Parent/Guardian</p>
            </div>
            <div style="float: left; width: 33%; text-align: center;">
                <div class="signature-line"></div>
                <p>Principal</p>
            </div>
        </div>

        <div class="section" style="margin-top: 50px; border-top: 1px dashed #000; padding-top: 20px;">
            <div style="text-align: center;">
                <h2>GOVERNMENT GRADUATE COLLEGE OF SCIENCE</h2>
                <p>WAHDAT ROAD, LAHORE</p>
            </div>
            <table>
                <tr>
                    <td>Form No: <strong>{{ $form->form_no }}</strong></td>
                    <td>Name: {{ $form->name }}</td>
                    <td>Date: {{ date('d-m-Y') }}</td>
                </tr>
            </table>
            <div style="text-align: right; margin-top: 20px;">
                <div class="signature-line"></div>
                <p>Receiving Official</p>
            </div>
        </div>
    </div>

    <!-- Print button -->
    <button onclick="window.print()" class="print-button no-print">
        Print Form
    </button>

    <script>
        // Auto-print when the page loads
        window.onload = function() {
            // Small delay to ensure everything is loaded
            setTimeout(function() {
                window.print();
            }, 500);
        };

        // Close window after print (optional)
        window.onafterprint = function() {
            window.close();
        };
    </script>
</body>
</html>