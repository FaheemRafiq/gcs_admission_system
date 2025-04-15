<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Admission Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #000000;
            margin: 0;
            padding: 10mm;
            width: 210mm;
        }
        h1 {
            font-size: 24px;
            font-weight: bold;
            color: #ff0000;
            text-align: center;
            margin-bottom: 5px;
        }
        p {
            font-size: 12px;
            color: #000000;
            margin: 2px 0;
        }
        .section-title {
            font-size: 14px;
            font-weight: bold;
            border-bottom: 1px solid #000000;
            margin-bottom: 8px;
            padding-bottom: 2px;
        }
        .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin-top: 8px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid #000000;
            margin-top: 8px;
        }
        th, td {
            border: 1px solid #000000;
            padding: 4px;
            font-size: 12px;
            color: #000000;
            text-align: center;
        }
        .form-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        .logo {
            width: 80px;
            height: auto;
        }
        .photo-box {
            width: 90px;
            height: 120px;
            border: 1px solid #000000;
            text-align: center;
            padding: 5px;
            font-size: 10px;
        }
        .checkbox {
            width: 12px;
            height: 12px;
            border: 1px solid #000;
            display: inline-block;
            margin-right: 5px;
            position: relative;
        }
        .checkbox.checked:after {
            content: "✓";
            position: absolute;
            top: -3px;
            left: 2px;
        }
        .signature-line {
            border-top: 1px solid #000;
            width: 150px;
            margin-top: 30px;
            display: inline-block;
        }
        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }
        .signature-box {
            text-align: center;
            width: 30%;
        }
        .bilingual-text {
            display: flex;
            justify-content: space-between;
        }
        .urdu-text {
            font-family: "Jameel Noori Nastaleeq", "Noto Nastaliq Urdu", Arial, sans-serif;
            text-align: right;
        }
        .form-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        .admission-committee {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
        }
        .footer-form {
            margin-top: 30px;
            border-top: 1px dashed #000;
            padding-top: 10px;
        }
        .subject-groups {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 5px;
            margin-top: 10px;
            margin-bottom: 10px;
        }
        .subject-box {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
            font-size: 10px;
        }
        .shift-boxes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="form-header">
        <div>
            <!-- Logo would go here -->
            <img src="{{ asset('android-chrome-512x512.png') }}" alt="College Logo" class="logo" onerror="this.style.display='none'">
        </div>
        <div style="text-align: center; flex-grow: 1;">
            <div class="bilingual-text">
                <div></div>
                <h1>Government Graduate College of Science</h1>
                <div class="urdu-text">گورنمنٹ گریجویٹ کالج آف سائنس</div>
            </div>
            <p>Wahdat Road, Lahore (www.gcslahore.edu.pk)</p>
            <p style="font-weight: bold;">APPLICATION FOR ADMISSION - {{ date('Y') }}</p>
        </div>
        <div class="photo-box">
            <p>Paste one recent<br>photograph of size<br>2" x 1.5" with blue<br>background</p>
        </div>
    </div>

    <!-- Form Info -->
    <div class="form-info">
        <div>
            <p>Form No: <b>{{ $form->form_no ?? '____' }}</b></p>
            <p>College Roll No: ________________</p>
        </div>
        <div>
            <p>Diary No: _______________</p>
        </div>
    </div>

    <!-- Group Selection for Intermediate -->
    <div style="margin-bottom: 10px;">
        <div class="bilingual-text">
            <p><strong>GROUP FOR INTERMEDIATE CLASS (Tick One)</strong></p>
            <p class="urdu-text">گروپ برائے انٹرمیڈیٹ کلاس (ایک منتخب کریں)</p>
        </div>
        <div class="subject-groups">
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Pre-Med' ? 'checked' : '' }}"></div>
                <span>Pre-Med</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Pre-Eng' ? 'checked' : '' }}"></div>
                <span>Pre-Eng</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'ICS' ? 'checked' : '' }}"></div>
                <span>I.C.S</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'I.Com' ? 'checked' : '' }}"></div>
                <span>I.Com</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'F.A' ? 'checked' : '' }}"></div>
                <span>F.A</span>
            </div>
        </div>
    </div>

    <!-- Shift Selection -->
    <div style="margin-bottom: 10px;">
        <div class="bilingual-text">
            <p><strong>SHIFT (Tick One)</strong></p>
            <p class="urdu-text">شفٹ (ایک منتخب کریں)</p>
        </div>
        <div class="shift-boxes">
            <div class="subject-box">
                <div class="checkbox {{ $form->shift == 'Morning' ? 'checked' : '' }}"></div>
                <span>Morning</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->shift == 'Evening' ? 'checked' : '' }}"></div>
                <span>Evening</span>
            </div>
        </div>
    </div>

    <!-- Major Discipline for BS -->
    <div style="margin-bottom: 10px;">
        <div class="bilingual-text">
            <p><strong>MAJOR DISCIPLINE FOR BS 4 YEARS DEGREE PROGRAM (Tick One)</strong></p>
            <p class="urdu-text">میجر ڈسپلن برائے بی ایس 4 سالہ ڈگری پروگرام (ایک منتخب کریں)</p>
        </div>
        <div class="subject-groups">
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'BBA' ? 'checked' : '' }}"></div>
                <span>BBA</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Botany' ? 'checked' : '' }}"></div>
                <span>Botany</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Bio Tech' ? 'checked' : '' }}"></div>
                <span>Bio Tech</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Chemistry' ? 'checked' : '' }}"></div>
                <span>Chemistry</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Computer Science' ? 'checked' : '' }}"></div>
                <span>Computer Science</span>
            </div>
        </div>
        <div class="subject-groups">
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Economics' ? 'checked' : '' }}"></div>
                <span>Economics</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'English' ? 'checked' : '' }}"></div>
                <span>English</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Geography' ? 'checked' : '' }}"></div>
                <span>Geography</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Mathematics' ? 'checked' : '' }}"></div>
                <span>Mathematics</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Physics' ? 'checked' : '' }}"></div>
                <span>Physics</span>
            </div>
        </div>
        <div class="subject-groups">
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Psychology' ? 'checked' : '' }}"></div>
                <span>Psychology</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Statistics' ? 'checked' : '' }}"></div>
                <span>Statistics</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Urdu' ? 'checked' : '' }}"></div>
                <span>Urdu</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Zoology' ? 'checked' : '' }}"></div>
                <span>Zoology</span>
            </div>
        </div>
    </div>

    <!-- Subject Department -->
    <div style="margin-bottom: 10px;">
        <div class="bilingual-text">
            <p><strong>SUBJECT DEPARTMENT FOR BS SEMESTER-I (Tick One)</strong></p>
            <p class="urdu-text">سبجیکٹ ڈیپارٹمنٹ برائے بی ایس سمسٹر 1 (ایک منتخب کریں)</p>
        </div>
        <div class="subject-groups">
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Chemistry' ? 'checked' : '' }}"></div>
                <span>Chemistry</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Physics' ? 'checked' : '' }}"></div>
                <span>Physics</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Mathematics' ? 'checked' : '' }}"></div>
                <span>Mathematics</span>
            </div>
            <div class="subject-box">
                <div class="checkbox {{ $form->program->name == 'Zoology' ? 'checked' : '' }}"></div>
                <span>Zoology</span>
            </div>
        </div>
    </div>

    <!-- Associate Degree -->
    <div style="margin-bottom: 16px;">
        <div class="bilingual-text">
            <p><strong>Associate Degree in Commerce (B.Com-IT) 2 Years</strong></p>
            <p class="urdu-text">ایسوسی ایٹ ڈگری ان کامرس (بی کام آئی ٹی) 2 سالہ</p>
        </div>
        <div class="subject-box" style="width: 30px; display: inline-block;">
            <div class="checkbox {{ $form->program == 'B.Com-IT' ? 'checked' : '' }}"></div>
        </div>
    </div>

    <!-- Personal Information -->
    <div style="margin-bottom: 16px;">
        <table>
            <tr>
                <td width="25%">
                    <div class="bilingual-text">
                        <p>Name of Candidate</p>
                        <p class="urdu-text">امیدوار کا نام</p>
                    </div>
                </td>
                <td width="25%">{{ $form->name }}</td>
                <td width="25%">
                    <div class="bilingual-text">
                        <p>Cell #</p>
                        <p class="urdu-text">سیل نمبر</p>
                    </div>
                </td>
                <td width="25%">{{ $form->cell }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Father's Name</p>
                        <p class="urdu-text">والد کا نام</p>
                    </div>
                </td>
                <td>{{ $form->father_name }}</td>
                <td>
                    <div class="bilingual-text">
                        <p>Cell #</p>
                        <p class="urdu-text">سیل نمبر</p>
                    </div>
                </td>
                <td>{{ $form->father_cell }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Candidate's CNIC/'Bay' Form No.</p>
                        <p class="urdu-text">امیدوار کا شناختی کارڈ/بے فارم نمبر</p>
                    </div>
                </td>
                <td>{{ $form->cnic }}</td>
                <td>
                    <div class="bilingual-text">
                        <p>Domicile</p>
                        <p class="urdu-text">ڈومیسائل</p>
                    </div>
                </td>
                <td>{{ $form->domicile }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Date of Birth (According to S.S.C)</p>
                        <p class="urdu-text">تاریخ پیدائش (ایس ایس سی کے مطابق)</p>
                    </div>
                </td>
                <td>{{ \Carbon\Carbon::parse($form->dob)->format('d-m-Y') }}</td>
                <td>
                    <div class="bilingual-text">
                        <p>Religion</p>
                        <p class="urdu-text">مذہب</p>
                    </div>
                </td>
                <td>{{ $form->religion }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Father's Occupation</p>
                        <p class="urdu-text">والد کا پیشہ</p>
                    </div>
                </td>
                <td>{{ $form->father_occupation }}</td>
                <td>
                    <div class="bilingual-text">
                        <p>E-mail</p>
                        <p class="urdu-text">ای میل</p>
                    </div>
                </td>
                <td>{{ $form->email }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Father's CNIC No.</p>
                        <p class="urdu-text">والد کا شناختی کارڈ نمبر</p>
                    </div>
                </td>
                <td colspan="3">{{ $form->father_cnic }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Guardian's Name</p>
                        <p class="urdu-text">سرپرست کا نام</p>
                    </div>
                </td>
                <td>{{ $form->guardian_name }}</td>
                <td>
                    <div class="bilingual-text">
                        <p>Occupation</p>
                        <p class="urdu-text">پیشہ</p>
                    </div>
                </td>
                <td>{{ $form->guardian_occupation }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Present Address</p>
                        <p class="urdu-text">موجودہ پتہ</p>
                    </div>
                </td>
                <td colspan="3">{{ $form->present_address }}</td>
            </tr>
            <tr>
                <td>
                    <div class="bilingual-text">
                        <p>Permanent Home Address</p>
                        <p class="urdu-text">مستقل گھر کا پتہ</p>
                    </div>
                </td>
                <td colspan="3">{{ $form->permanent_address }}</td>
            </tr>
        </table>
    </div>

    <!-- Subjects Section -->
    <div style="margin-bottom: 16px;">
        <div class="bilingual-text">
            <p><strong>Subjects</strong> (For Intermediate Classes only)</p>
            <p class="urdu-text">مضامین (صرف انٹرمیڈیٹ کلاسز کے لیے)</p>
        </div>
        <table>
            <tr>
                <td>(1) English/انگریزی</td>
                <td>(2) Urdu/اردو</td>
                <td>(3) Islamiat/اسلامیات</td>
                <td>(4) Pak Studies/پاک سٹڈیز</td>
                <td>(5) _____________</td>
            </tr>
            <tr>
                <td>(6) _____________</td>
                <td>(7) _____________</td>
                <td colspan="3">Elective Subject Set No as given in Prospectus / انتخابی مضامین سیٹ نمبر پراسپیکٹس میں دیا گیا ہے</td>
            </tr>
        </table>
    </div>

    <!-- Examination Details -->
    <div style="margin-bottom: 16px;">
        <table>
            <tr>
                <th rowspan="2">
                    <div class="bilingual-text">
                        <p>Examination</p>
                        <p class="urdu-text">امتحان</p>
                    </div>
                </th>
                <th rowspan="2">
                    <div class="bilingual-text">
                        <p>Year</p>
                        <p class="urdu-text">سال</p>
                    </div>
                </th>
                <th rowspan="2">
                    <div class="bilingual-text">
                        <p>Roll No</p>
                        <p class="urdu-text">رول نمبر</p>
                    </div>
                </th>
                <th rowspan="2">
                    <div class="bilingual-text">
                        <p>Marks</p>
                        <p class="urdu-text">نمبرات</p>
                    </div>
                </th>
                <th rowspan="2">
                    <div class="bilingual-text">
                        <p>%age</p>
                        <p class="urdu-text">فیصد</p>
                    </div>
                </th>
                <th rowspan="2">
                    <div class="bilingual-text">
                        <p>Subjects</p>
                        <p class="urdu-text">مضامین</p>
                    </div>
                </th>
                <th colspan="2">
                    <div class="bilingual-text">
                        <p>From where passed</p>
                        <p class="urdu-text">کہاں سے پاس کیا</p>
                    </div>
                </th>
            </tr>
            <tr>
                <th>
                    <div class="bilingual-text">
                        <p>Board/University</p>
                        <p class="urdu-text">بورڈ/یونیورسٹی</p>
                    </div>
                </th>
                <th>
                    <div class="bilingual-text">
                        <p>School/College</p>
                        <p class="urdu-text">سکول/کالج</p>
                    </div>
                </th>
            </tr>
            @if($form->examinations && $form->examinations->count() > 0)
                @foreach($form->examinations as $exam)
                    <tr>
                        <td>{{ $exam->name }}</td>
                        <td>{{ $exam->year ?? 'N/A' }}</td>
                        <td>{{ $exam->roll_no ?? 'N/A' }}</td>
                        <td>{{ $exam->obtained_marks }}/{{ $exam->total_marks }}</td>
                        <td>{{ $exam->percentage ? $exam->percentage . '%' : 'N/A' }}</td>
                        <td>{{ $exam->subjects ?? 'N/A' }}</td>
                        <td>{{ $exam->board_university ?? 'N/A' }}</td>
                        <td>{{ $exam->school_college ?? 'N/A' }}</td>
                    </tr>
                @endforeach
            @else
                <tr>
                    <td>Matric<br>(Arts/Science)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Intermediate<br>(Arts/Science)</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>Associate<br>Degree</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            @endif
        </table>
    </div>

    <!-- Signature Section -->
    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line"></div>
            <p>Signature of the Candidate</p>
            <p class="urdu-text">دستخط امیدوار</p>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <p>Signature of the Father / Guardian</p>
            <p class="urdu-text">دستخط والد/سرپرست</p>
        </div>
    </div>

    <!-- Admission Committee Section -->
    <div class="admission-committee">
        <div class="signature-box">
            <div class="signature-line"></div>
            <p>Recommended for Admission</p>
            <p class="urdu-text">داخلے کی سفارش کی گئی</p>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <p>Admitted</p>
            <p class="urdu-text">داخل</p>
        </div>
    </div>

    <div class="admission-committee">
        <div class="signature-box">
            <div class="signature-line"></div>
            <p>Convener of Admission Committee</p>
            <p class="urdu-text">کنوینر داخلہ کمیٹی</p>
        </div>
        <div class="signature-box">
            <div class="signature-line"></div>
            <p>Principal</p>
            <p class="urdu-text">پرنسپل</p>
        </div>
    </div>

    <!-- Footer Form -->
    <div class="footer-form">
        <div style="text-align: center; margin-bottom: 10px;">
            <h2>GOVERNMENT GRADUATE COLLEGE OF SCIENCE</h2>
            <p>WAHDAT ROAD, LAHORE.</p>
        </div>
        <div class="form-info">
            <div>
                <p>Form No: <b>{{ $form->form_no ?? '____' }}</b></p>
                <p>Name of Candidate: {{ $form->name }}</p>
                <p>Group/Discipline: {{ $form->program->name ?? $form->program->program_group->name ?? '____' }}</p>
            </div>
            <div>
                <p>Diary No: _______________</p>
                <p>Father's Name: {{ $form->father_name }}</p>
                <p>1st Shift: {{ $form->shift == 'Morning' ? '✓' : '_____' }} 2nd Shift: {{ $form->shift == 'Evening' ? '✓' : '_____' }}</p>
            </div>
            <div>
                <p>Date: _______________</p>
                <p>Class: _______________</p>
            </div>
        </div>
        <div style="text-align: right; margin-top: 20px;">
            <div class="signature-line"></div>
            <p>Signature of Receiving Official</p>
        </div>
    </div>

    <script>
        window.print();

        window.onafterprint = function() {
            window.close();
        }

        window.oncancel = function() {
            window.close();
        }
        
    </script>
</body>
</html>