# Laundry API

Laundry API adalah sebuah aplikasi RESTful API yang digunakan untuk mengelola data pengguna, peran pengguna, dan pesanan. API ini menyediakan berbagai endpoint untuk melakukan operasi CRUD (Create, Read, Update, Delete) pada data yang terkait.

## Fitur

- Pendaftaran Pengguna: Pengguna dapat mendaftar sebagai pengguna baru dengan menyediakan informasi seperti email dan password.
- Login: Pengguna dapat melakukan login dengan menggunakan email dan password yang terdaftar.
- Autentikasi Rute: Rute-rute tertentu dalam aplikasi dapat diakses hanya oleh pengguna yang sudah terotentikasi.
- Keamanan: Password pengguna disimpan dengan menggunakan enkripsi sehingga tidak dapat dilihat dalam bentuk teks biasa.
- CRUD - Setiap table memiliki operasi CRUD nya tersendiri, untuk lebih jelasnya dapat di lihat di bagian routes

## Teknologi yang Digunakan

Proyek Authentication-Migrate dibangun menggunakan teknologi-teknologi berikut:

- Node.js: Framework JavaScript yang digunakan sebagai dasar untuk backend.
- Express.js: Framework Node.js yang digunakan untuk membangun server dan mengatur rute-rute API.
- Sequelize: ORM (Object-Relational Mapping) untuk berinteraksi dengan database.
- MYSQL: Sistem manajemen basis data relasional yang digunakan untuk menyimpan data aplikasi.
- Bcrypt: Library yang digunakan untuk melakukan enkripsi password pengguna.
- etc ( dapat di lihat dari package.json )

## Daftar Routes

Berikut adalah daftar routes yang tersedia dalam API ini:

### Auth Routes

- **POST /login**: Mengirimkan permintaan untuk login pengguna.
- **POST /register**: Mengirimkan permintaan untuk registrasi pengguna.

### User Routes

- **GET /users**: Mendapatkan daftar semua pengguna. Membutuhkan token verifikasi dan otorisasi admin.
- **GET /users/:id**: Mendapatkan detail pengguna berdasarkan ID. Membutuhkan token verifikasi.
- **PUT /users/:id**: Mengupdate data pengguna berdasarkan ID. Membutuhkan token verifikasi.
- **DELETE /users/:id**: Menghapus pengguna berdasarkan ID. Membutuhkan token verifikasi.

### User Role Routes

- **GET /users/:userId/roles**: Mendapatkan daftar peran pengguna berdasarkan ID pengguna. Membutuhkan token verifikasi dan otorisasi admin.
- **POST /users/:userId/roles**: Menambahkan peran pengguna. Membutuhkan token verifikasi dan otorisasi admin.
- **DELETE /users/:userId/roles/:roleId**: Menghapus peran pengguna berdasarkan ID pengguna dan ID peran. Membutuhkan token verifikasi dan otorisasi admin.
- **PUT /users/:userId/roles/:roleId**: Mengupdate peran pengguna berdasarkan ID pengguna dan ID peran. Membutuhkan token verifikasi dan otorisasi admin.

### Role Routes

- **GET /roles**: Mendapatkan daftar peran. Membutuhkan token verifikasi dan otorisasi admin.
- **POST /roles**: Membuat peran baru. Membutuhkan token verifikasi dan otorisasi admin.
- **PUT /roles/:roleId**: Mengupdate peran berdasarkan ID peran. Membutuhkan token verifikasi dan otorisasi admin.
- **DELETE /roles/:roleId**: Menghapus peran berdasarkan ID peran. Membutuhkan token verifikasi dan otorisasi admin.

### Order Routes

- **GET /orders**: Mendapatkan daftar pesanan. Membutuhkan token verifikasi dan otorisasi admin.
- **GET /orders/:orderId/users/:userId**: Mendapatkan detail pesanan berdasarkan ID pesanan dan ID pengguna. Membutuhkan token verifikasi.
- **POST /orders**: Membuat pesanan baru. Membutuhkan token verifikasi.
- **PUT /orders/:orderId/users/:userId**: Mengupdate pesanan berdasarkan ID pesanan dan ID pengguna. Membutuhkan token verifikasi.
- **DELETE /orders/:orderId/users/:userId**: Menghapus pesanan berdasarkan ID pesanan dan ID pengguna. Membutuhkan token verifikasi.

## Penggunaan

1. Clone repositori ini ke dalam komputer Anda.
2. Install dependencies dengan menjalankan perintah `npm install`.
3. Konfigurasi koneksi database dan pengaturan lainnya di file `.env`.
4. Jalankan aplikasi dengan perintah `npm start`.
5. Aplikasi akan berjalan di `http://localhost:3000`.

Catatan: Routes yang membutuhkan token verifikasi menggunakan middleware verifyToken, sedangkan routes yang membutuhkan otorisasi admin menggunakan middleware authorizeAdmin.

Silakan ikuti langkah-langkah ini untuk memulai menggunakan proyek Laundry-API. Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk bertanya. Selamat mengembangkan!

