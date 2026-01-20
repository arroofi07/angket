Berikut adalah rancangan ulang angket untuk Pra-Penelitian (Analisis Kebutuhan):

1. Daftar Pertanyaan (Instrumen Pra-Penelitian)
Fokus pertanyaan adalah menggali "rasa sakit" (pain points) pengguna saat ini agar menjadi alasan kuat mengapa skripsi Anda wajib dibuat.

A. Target Responden: MAHASISWA
(Tujuannya: Membuktikan mahasiswa kesulitan belajar dengan cara manual & AI biasa)

Bagian 1: Kebiasaan & Kendala Saat Ini

Seberapa sering Anda membaca modul/materi kuliah dalam format PDF digital? (Sering/Jarang)

Apakah Anda merasa kesulitan menemukan jawaban spesifik (misal: definisi tertentu) di dalam dokumen PDF yang halamannya puluhan/ratusan? (Ya/Tidak)

Berapa lama rata-rata waktu yang Anda butuhkan untuk mencari satu jawaban di modul PDF? (< 1 menit / 1-5 menit / > 5 menit)

Apakah Anda sering menggunakan ChatGPT/AI lain untuk mengerjakan tugas kuliah? (Ya/Tidak)

Apakah Anda pernah mendapati jawaban ChatGPT yang salah atau tidak sesuai dengan materi yang diajarkan dosen di kelas (Halusinasi)? (Sering/Kadang/Tidak Pernah)

Bagian 2: Validasi Solusi (Menawarkan Ide) 6. Apakah Anda setuju jika bertanya langsung ke Dosen (via WA/Tatap Muka) seringkali terkendala waktu atau rasa sungkan? (Setuju/Tidak) 7. Pertanyaan Kunci: Jika ada website AI khusus ("Bot Kampus") yang bisa menjawab pertanyaan Anda hanya berdasarkan materi PDF dosen (pasti akurat & ada halamannya), apakah Anda akan terbantu? (Sangat Terbantu/Biasa Saja/Tidak Perlu)

B. Target Responden: DOSEN
(Tujuannya: Membuktikan dosen terbebani pertanyaan berulang & khawatir soal validitas jawaban mahasiswa)

Apakah Anda sering menerima pertanyaan yang sama berulang-ulang dari mahasiswa berbeda terkait materi dasar?

Apakah Anda khawatir mahasiswa mendapatkan informasi yang salah (halusinasi) jika mereka belajar sembarangan menggunakan ChatGPT umum?

Apakah Anda setuju bahwa mahasiswa membutuhkan akses tanya-jawab materi yang bisa diakses 24 jam di luar jam perkuliahan?

Apakah Anda mendukung pengembangan sistem tanya jawab otomatis yang berbasiskan data materi kuliah internal Universitas Bung Hatta?

2. Platform: Website Sendiri vs Google Form?
Karena ini masih Pra-Penelitian, saran profesional saya:

Opsi A: Gunakan Google Form / Microsoft Forms (Sangat Disarankan)

Alasan: Cepat, gratis, fitur analisis grafik otomatis sudah ada. Anda tidak perlu buang waktu coding untuk hal yang hanya dipakai sebentar. Data bisa langsung di-ekspor ke Excel untuk Bab 1 atau Bab 3.

Kelebihan: Dosen biasanya sudah percaya validitas platform ini.

Opsi B: Membuat Website Angket Sendiri (Sesuai keinginan Anda)

Alasan: Jika Anda ingin "pamer skill" sejak awal atau ingin mengumpulkan database email mahasiswa yang tertarik untuk jadi beta tester nanti.

Resiko: Memakan waktu pengembangan.

Jika Anda tetap ingin membuat website angket sendiri (Opsi B), berikut alurnya:

3. Flow Sistem Web Angket (Custom)
Jika Anda membangunnya dengan Svelte + NestJS:

Halaman 1: Landing Page (Pancingan)

Headline: "Kesulitan Mencari Jawaban di Modul Kuliah yang Tebal?"

Sub-headline: "Bantu kami membangun AI Asisten Khusus Mahasiswa Universitas Bung Hatta."

Tombol: [Isi Survei Singkat (1 Menit)]

Halaman 2: Kuesioner (Wizard Step)

Jangan tampilkan semua pertanyaan sekaligus. Buat per langkah agar tidak membosankan.

Step 1: Identitas (Prodi/Angkatan - opsional nama).

Step 2: Pertanyaan Masalah (Sering baca PDF? Susah cari jawaban?).

Step 3: Pertanyaan Solusi (Butuh AI Kampus?).

Tombol: [Kirim Jawaban]

Halaman 3: Thank You & Call to Action

"Terima kasih! Jawabanmu sangat berarti."

Fitur Tambahan: "Masukkan emailmu jika ingin menjadi orang pertama yang mencoba sistem ini saat rilis nanti." (Ini bagus untuk database user Bab 4).

4. Statistik yang Harus Ditampilkan (Untuk Skripsi)
Data dari angket ini nanti akan Anda olah menjadi grafik untuk ditaruh di Bab 1 (Latar Belakang) atau Bab 3 (Analisis Kebutuhan). Statistik yang paling "menjual" adalah:

Grafik "Pain Point" (Diagram Lingkaran):

Contoh: "85% Mahasiswa merasa kesulitan mencari jawaban spesifik di PDF >50 halaman." -> Ini memvalidasi masalah nomor 1 Anda.

Grafik "Keterbatasan AI Umum" (Diagram Batang):

Contoh: "60% Mahasiswa pernah menemukan jawaban ChatGPT yang tidak sesuai materi dosen." -> Ini memvalidasi masalah nomor 4 (Halusinasi).

Grafik "Validasi Solusi" (Pie Chart):

Contoh: "95% Mahasiswa menyatakan SANGAT BUTUH sistem RAG Kampus." -> Ini menjadi landasan kuat mengapa skripsi Anda harus dilanjutkan.