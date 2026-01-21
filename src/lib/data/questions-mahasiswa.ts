import type { SurveyConfig } from '$lib/types/survey';

export const PRODI_OPTIONS = [
	'PTIK',
	'PINDO',
	'PPKN',
	'PBIO',
	'PGSD',
	'PMAT',
	'PING',
	'Lainnya'
];

export const mahasiswaSurvey: SurveyConfig = {
	type: 'mahasiswa',
	title: 'Survei untuk Mahasiswa',
	description: 'Bantu kami memahami kebiasaan belajar dan kendala yang Anda hadapi',
	steps: [
		{
			title: 'Identitas',
			description: 'Data diri Anda (akan dijaga kerahasiaannya)',
			questions: [
				{
					id: 'gender',
					text: 'Jenis Kelamin',
					type: 'radio',
					options: ['Laki-laki', 'Perempuan'],
					required: true
				},
				{
					id: 'prodi',
					text: 'Program Studi',
					type: 'dropdown',
					options: PRODI_OPTIONS,
					required: true
				},
				{
					id: 'semester',
					text: 'Semester Saat Ini',
					type: 'radio',
					options: ['Semester 1-2', 'Semester 3-4', 'Semester 5-6', 'Semester 7+'],
					required: true
				},
				{
					id: 'ipk',
					text: 'IPK Terakhir (Opsional)',
					type: 'radio',
					options: ['< 2.5', '2.5 - 3.0', '3.0 - 3.5', '> 3.5', 'Belum ada IPK'],
					required: false
				}
			]
		},
		{
			title: 'Kebiasaan Belajar',
			description: 'Bagaimana cara Anda belajar saat ini?',
			questions: [
				{
					id: 'frekuensi_pdf',
					text: 'Seberapa sering Anda membaca modul/materi kuliah dalam format PDF digital?',
					type: 'radio',
					options: [
						'Sangat Sering (setiap hari)',
						'Sering (3-5x seminggu)',
						'Jarang (1-2x seminggu)',
						'Sangat Jarang (<1x seminggu)'
					],
					required: true
				},
				{
					id: 'kesulitan_pdf',
					text: 'Apakah Anda merasa KESULITAN menemukan jawaban spesifik di dalam dokumen PDF yang halamannya puluhan/ratusan?',
					type: 'radio',
					options: ['Sangat Kesulitan', 'Cukup Kesulitan', 'Sedikit Kesulitan', 'Tidak Kesulitan'],
					required: true
				},
				{
					id: 'waktu_cari',
					text: 'Berapa lama rata-rata waktu yang Anda butuhkan untuk mencari SATU informasi/jawaban di modul PDF?',
					type: 'radio',
					options: ['< 1 menit', '1 - 5 menit', '5 - 10 menit', '> 10 menit'],
					required: true
				},
				{
					id: 'metode_belajar',
					text: 'Alat/metode apa yang biasa Anda gunakan untuk mencari jawaban di materi kuliah? (Bisa pilih lebih dari satu)',
					type: 'checkbox',
					options: [
						'Ctrl+F di PDF',
						'Membaca halaman per halaman',
						'Bertanya ke teman',
						'Bertanya ke dosen via WA/Email',
						'Menggunakan ChatGPT/AI',
						'Mencari di Google'
					],
					required: true
				}
			]
		},
		{
			title: 'Pengalaman dengan AI',
			description: 'Pengalaman Anda menggunakan ChatGPT atau AI lainnya',
			questions: [
				{
					id: 'penggunaan_ai',
					text: 'Apakah Anda sering menggunakan ChatGPT atau AI lainnya untuk membantu belajar/mengerjakan tugas kuliah?',
					type: 'radio',
					options: ['Sangat Sering', 'Sering', 'Kadang-kadang', 'Jarang', 'Tidak Pernah'],
					required: true
				},
				{
					id: 'halusinasi_ai',
					text: 'Jika pernah menggunakan AI, apakah Anda pernah mendapati jawaban yang SALAH atau tidak sesuai dengan materi dosen (Halusinasi AI)?',
					type: 'radio',
					options: [
						'Sangat Sering (>5 kali)',
						'Sering (3-5 kali)',
						'Kadang-kadang (1-2 kali)',
						'Tidak Pernah',
						'Tidak Tahu / Tidak Mengecek'
					],
					required: true
				},
				{
					id: 'kepercayaan_ai',
					text: 'Seberapa besar kepercayaan Anda terhadap akurasi jawaban ChatGPT untuk materi kuliah?',
					type: 'radio',
					options: [
						'Sangat Percaya (langsung dipakai)',
						'Cukup Percaya (tapi tetap cek)',
						'Kurang Percaya',
						'Tidak Percaya'
					],
					required: true
				}
			]
		},
		{
			title: 'Validasi Solusi',
			description: 'Pendapat Anda tentang solusi yang akan kami kembangkan',
			questions: [
				{
					id: 'kendala_dosen',
					text: 'Apakah Anda setuju bahwa bertanya langsung ke Dosen seringkali terkendala waktu atau rasa sungkan?',
					type: 'radio',
					options: ['Sangat Setuju', 'Setuju', 'Netral', 'Tidak Setuju', 'Sangat Tidak Setuju'],
					required: true
				},
				{
					id: 'kebutuhan_asisten',
					text: 'Jika ada sistem AI khusus ("Asisten Kampus") yang bisa menjawab pertanyaan Anda HANYA berdasarkan materi PDF dari dosen (pasti akurat & ada referensi halaman), seberapa terbantu Anda?',
					type: 'radio',
					options: ['Sangat Terbantu', 'Cukup Terbantu', 'Biasa Saja', 'Tidak Terbantu'],
					required: true
				},
				{
					id: 'fitur_harapan',
					text: 'Fitur apa saja yang Anda harapkan dari sistem Asisten Kampus tersebut? (Bisa pilih lebih dari satu)',
					type: 'checkbox',
					options: [
						'Bisa menjawab dalam Bahasa Indonesia',
						'Menyertakan nomor halaman referensi',
						'Bisa diakses 24 jam',
						'Tersedia di HP (mobile-friendly)',
						'Bisa menyimpan history pertanyaan',
						'Bisa upload materi sendiri'
					],
					required: true
				},
				{
					id: 'email',
					text: 'Masukkan email Anda jika ingin menjadi beta-tester sistem ini (opsional)',
					type: 'email',
					placeholder: 'contoh@email.com',
					required: false
				}
			]
		}
	]
};
