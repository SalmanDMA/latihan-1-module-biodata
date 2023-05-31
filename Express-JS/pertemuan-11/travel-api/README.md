# Travel API
Travel API adalah sebuah aplikasi web yang menyediakan layanan pemesanan perjalanan dan informasi destinasi. API ini memungkinkan pengguna untuk melakukan berbagai operasi seperti pemesanan tiket perjalanan, melihat jadwal keberangkatan, mendapatkan informasi destinasi, dan lain sebagainya. API ini dirancang untuk mendukung operasional backend dari sebuah situs web atau aplikasi mobile dalam industri perjalanan.

### Fitur Utama
- Pemesanan Tiket: Pengguna dapat membuat pemesanan tiket perjalanan dengan menyediakan informasi seperti jadwal dan status pembayaran.
- Jadwal Perjalanan: Pengguna dapat melihat jadwal keberangkatan yang tersedia, termasuk informasi tentang waktu keberangkatan, waktu kedatangan,  kendaraan yang digunakan, dan tujuan wisata.
- Informasi Destinasi: Pengguna dapat memperoleh informasi tentang destinasi wisata, termasuk nama destinasi, dan lokasi
- Autentikasi Pengguna: API ini menyediakan fitur autentikasi pengguna dengan menggunakan token JWT, sehingga hanya pengguna yang terotentikasi yang dapat mengakses fitur-fitur tertentu.

### Teknologi yang Digunakan
API Travel dibangun menggunakan teknologi-teknologi berikut:

- Node.js: Framework JavaScript yang digunakan sebagai dasar untuk backend.
- Express.js: Framework Node.js yang digunakan untuk membangun server dan mengatur rute-rute API.
- Sequelize: ORM (Object-Relational Mapping) untuk berinteraksi dengan database.
- MYSQL: Sistem manajemen basis data relasional yang digunakan untuk menyimpan data aplikasi.
- JWT (JSON Web Tokens): Digunakan untuk autentikasi pengguna dan mengamankan rute-rute yang memerlukan akses terbatas.

### Cara Menggunakan API
Berikut adalah langkah-langkah untuk menggunakan API Travel:

- Install semua dependensi yang diperlukan dengan menjalankan perintah npm install.
- Konfigurasikan koneksi database MYSQL di file config/configDatabase.json.
- Jalankan migrasi untuk membuat skema database dengan menjalankan perintah npx sequelize-cli db:migrate./ sequelize db:migrate untuk yang sudah menginstall cli sequelize secara global
- Jalankan server API dengan perintah node server.js atau npm start.
- API Travel sekarang dapat diakses melalui URL http://localhost:3000.


### Endpoint Utama
Berikut adalah beberapa endpoint utama yang dapat digunakan dalam API Travel:

- POST /register - Mendaftar pengguna baru.
- POST /login - Melakukan login untuk mendapatkan token akses
- POST /bookings - Membuat pemesanan baru.
- DELETE /bookings/:bookingId - Menghapus pemesanan berdasarkan id pemesanan
- PUT /bookings/:bookingId - Mengubah pemesanan berdasarkan id pemesanan
- GET /bookings/user - Mendapatkan daftar pemesanan berdasarkan id user
- GET /bookings - Mendapatkan daftar semua pemesanan .
- GET /schedules - Mendapatkan daftar semua jadwal perjalanan.
- GET /destinations - Mendapatkan daftar semua destinasi wisata..

Silakan ikuti langkah-langkah ini untuk memulai menggunakan API Travel. Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk bertanya. Selamat mengembangkan!