# Authentication-Migrate

Authentication-Migrate adalah sebuah proyek yang bertujuan untuk mengimplementasikan sistem autentikasi pada aplikasi web menggunakan Node.js dan database MYSQL dengan migrasi Sequelize.

## Deskripsi

Proyek ini menyediakan fitur autentikasi yang meliputi pendaftaran pengguna baru, login, dan autentikasi terhadap rute-rute yang memerlukan akses terbatas. Proyek ini menggunakan teknologi Sequelize untuk melakukan migrasi basis data dan menyimpan informasi pengguna seperti email dan password secara aman.

## Fitur

- Pendaftaran Pengguna: Pengguna dapat mendaftar sebagai pengguna baru dengan menyediakan informasi seperti email dan password.
- Login: Pengguna dapat melakukan login dengan menggunakan email dan password yang terdaftar.
- Autentikasi Rute: Rute-rute tertentu dalam aplikasi dapat diakses hanya oleh pengguna yang sudah terotentikasi.
- Keamanan: Password pengguna disimpan dengan menggunakan enkripsi sehingga tidak dapat dilihat dalam bentuk teks biasa.

## Teknologi yang Digunakan

Proyek Authentication-Migrate dibangun menggunakan teknologi-teknologi berikut:

- Node.js: Framework JavaScript yang digunakan sebagai dasar untuk backend.
- Express.js: Framework Node.js yang digunakan untuk membangun server dan mengatur rute-rute API.
- Sequelize: ORM (Object-Relational Mapping) untuk berinteraksi dengan database.
- MYSQL: Sistem manajemen basis data relasional yang digunakan untuk menyimpan data aplikasi.
- Bcrypt: Library yang digunakan untuk melakukan enkripsi password pengguna.

## Cara Menggunakan Proyek

Berikut adalah langkah-langkah untuk menggunakan proyek Authentication-Migrate:

1. Clone repositori ini ke komputer lokal Anda.
2. Install semua dependensi yang diperlukan dengan menjalankan perintah `npm install`.
3. Konfigurasikan koneksi database PostgreSQL di file `config/configDatabase.json`.
4. Jalankan migrasi untuk membuat skema database dengan menjalankan perintah `npx sequelize-cli db:migrate / sequelize db:migrate jika sudah install cli sequelize secara global`.
5. Jalankan server API dengan perintah `node server.js` atau `npm start`.
6. Proyek Authentication-Migrate sekarang dapat diakses melalui URL `http://localhost:3000`.

## Endpoint Utama

Berikut adalah beberapa endpoint utama yang dapat digunakan dalam proyek Authentication-Migrate:

- `POST api/auth/signup` - Mendaftar pengguna baru.
- `POST api/auth/signin` - Melakukan login untuk mendapatkan token akses.
- `GET /api/status`: Mengembalikan daftar status. Tidak memerlukan otentikasi pengguna.
- `GET /api/statususer`: Mengembalikan daftar status yang terkait dengan pengguna yang terotentikasi. Endpoint ini memerlukan otentikasi token JWT.
- `GET /api/status/:id`: Mengembalikan informasi status berdasarkan ID. Endpoint ini memerlukan otentikasi token JWT dan hanya dapat diakses oleh pengguna dengan peran admin.
- `POST /api/status`: Menambahkan status baru. Endpoint ini memerlukan otentikasi token JWT dan hanya dapat diakses oleh pengguna dengan peran admin.
- `PUT /api/status/:id`: Memperbarui status berdasarkan ID. Endpoint ini memerlukan otentikasi token JWT dan hanya dapat diakses oleh pengguna dengan peran admin.
- `DELETE /api/status/:id`: Menghapus status berdasarkan ID. Endpoint ini memerlukan otentikasi token JWT dan hanya dapat diakses oleh pengguna dengan peran admin.

Silakan ikuti langkah-langkah ini untuk memulai menggunakan proyek Authentication-Migrate. Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk bertanya. Selamat mengembangkan!
