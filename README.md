<div align="center">
    <h1><b>Plog</b></h1>
    <h3>A blog app made with Laravel and react. 🔥 </h3>
    
![GitHub Repo stars](https://img.shields.io/github/stars/momcilovicluka/plog?style=for-the-badge&color=ff0050) 
![GitHub last commit](https://img.shields.io/github/last-commit/momcilovicluka/plog?style=for-the-badge&color=ff0050) 
![GitHub repo size](https://img.shields.io/github/repo-size/momcilovicluka/plog?style=for-the-badge&color=ff0050)
</div>


# 🚀 Setup Guide
## 🛠 Prerequisites

Make sure you have the following installed on your machine:

- [PHP](https://www.php.net/downloads) 🐘
- [Composer](https://getcomposer.org/) 🎻
- [Laravel Installer](https://github.com/laravel/installer) 🐛
- [Node.js](https://nodejs.org/) 🧩
- [NPM](https://www.npmjs.com/) 📦

For a quick guide on how to install, laravel has great instructions:
[Guide](https://laravel.com/docs/11.x/installation#installing-php)

---

## ⚡️ Getting Started

Follow these steps to set up and run the Laravel application locally.

### 1. Clone the Repository 📂
- 1.1 With git:
```bash
git clone https://github.com/momcilovicluka/plog.git
```
or
- 1.2 With GitHub cli:
```bash
gh repo clone momcilovicluka/plog
```

### 2. Navigate to the Project Directory 📁
```bash
cd plog
```

### 3. Install Dependencies 🚀
Install the PHP dependencies using Composer and node deps with npm:
```bash
composer install
npm install
```
Then compile the assets:
```bash
npm run build
```

### 4. Set Up Environment Variables 🌍
Create a .env file by copying the example:
```bash
cp .env.example .env
```

### 5. Generate Application Key 🔑
Run the following command to generate an encryption key for your application:
```bash
php artisan key:generate
```

### 6. Set up Database 💿
Create a SQLite database file:
```bash
touch database/database.sqlite
```
Run migrations to create tables:
```bash
php artisan migrate:fresh
```
Run seeders to populate the tables with mock data:
```bash
php artisan db:seed
```

### 7. Run the application! 💨
```bash
php artisan serve
```

### Run it with sail:
Although it can be run with docker, it is recommended to run it with sail
```bash
./vendor/bin/sail up
```

### You can also run it with docker 🐳:
```bash
docker compose up
```
Or use the prebuilt image from [DockerHub](https://hub.docker.com/r/momcilovicluka/plog) with
```bash
docker pull momcilovicluka/plog
```

---

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
