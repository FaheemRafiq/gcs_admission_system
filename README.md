# GCS Admission System

The **GCS Admission System** is a Laravel-based web application designed to manage admission forms, examinations, and related administrative tasks. This project leverages modern PHP and JavaScript tools, including Laravel, Inertia.js, React, and SQLite (by default) for local development.

This README provides instructions to set up and run the project locally for development purposes.

## Prerequisites

Before setting up the project, ensure you have the following installed on your system:

- **Git**
- **PHP** (>= 8.2 recommended for Laravel 12)
- **Composer**
- **Node.js** (>= 18.x recommended) and **npm**
- **A terminal or command-line interface**

### Optional:

- **SQLite** (default database; included with PHP)
- Alternatively, configure **MySQL/PostgreSQL** if preferred (update `.env` accordingly)

## Setup Instructions

Follow these steps to set up the project locally:

### 1. Clone the Repository
Clone the project from GitHub to your local machine:

```sh
git clone https://github.com/FaheemRafiq/gcs_admission_system.git
cd gcs_admission_system
```

### 2. Install PHP Dependencies
Install the required PHP packages using Composer:

```sh
composer install
```

This will install all dependencies listed in `composer.json`, including Laravel, Inertia, Pest, and other packages.

### 3. Install JavaScript Dependencies
Install the required Node.js packages using npm:

```sh
npm install
```

> **Note:** You may see warnings about deprecated packages (e.g., `lodash.isequal`). These can typically be ignored for development. To resolve vulnerabilities, run `npm audit fix` after installation.

### 4. Configure Environment
Copy the example environment file and generate an application key:

```sh
cp .env.example .env
php artisan key:generate
```

Edit the `.env` file if you need to customize settings (e.g., database connection). By default, it uses SQLite (`database/database.sqlite`).

### 5. Run Database Migrations and Seed Data
Set up the database and seed initial data:

```sh
php artisan migrate --seed
```

If prompted to create the SQLite database file (`database/database.sqlite`), select **"Yes"**. 
This command creates tables for users, admission forms, examinations, and Telescope (for debugging).

### 6. Start the Development Environment
Run the development servers and services using the `composer run dev` script, which launches multiple processes concurrently:

```sh
composer run dev
```

This command starts:

- **Laravel Server**: `php artisan serve` (runs at http://127.0.0.1:8000)
- **Queue Listener**: `php artisan queue:listen --tries=1` (processes queued jobs)
- **Log Tailing**: `php artisan pail --timeout=0` (displays real-time logs)
- **Vite Dev Server**: `npm run dev` (serves frontend assets, typically at http://localhost:5173)

> **Note:** If port **5173** is in use, Vite will automatically try another port. Watch the terminal output for the correct URL.

### 7. Access the Application
Open your browser and visit:

```
http://127.0.0.1:8000
```

You should see the **GCS Admission System** dashboard (assuming authentication and routing are configured).

## Project Structure

```
app/        # Laravel application logic (models, controllers, etc.)
database/   # Migrations, seeders, and SQLite database file (database.sqlite)
resources/  # Frontend assets (React components, CSS, etc.) and views
routes/     # Application routes (e.g., web.php)
public/     # Publicly accessible files (images, compiled assets)
```

## Useful Commands

- **Run Tests**: `composer run test` (uses Pest for testing)
- **Build Frontend**: `npm run build` (compiles assets for production)
- **Clear Cache**: `php artisan optimize:clear`
- **View Logs**: `php artisan pail` (standalone log tailing)
- **Telescope Debugging**: Visit `/telescope` (if enabled in development)

## Troubleshooting

- **"No such table: jobs" Error**: Ensure migrations ran successfully (`php artisan migrate`). Check the `queue.php` config and `.env` for queue settings.
- **Port Conflicts**: If **5173** or **8000** are in use, edit `.env` (`VITE_PORT`, `APP_PORT`) or stop conflicting processes.
- **Dependencies Fail**: Run `composer update` or `npm install --force` if versions conflict.

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```sh
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```sh
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is open-source and available under the **MIT License**.

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALI