import type { SurveyConfig } from '$lib/types/survey';

export const FAKULTAS_OPTIONS = [
	'Fakultas Hukum',
	'Fakultas Ilmu Budaya',
	'Fakultas Keguruan dan Ilmu Pendidikan',
	'Fakultas Ekonomi',
	'Lainnya'
];

export const dosenSurvey: SurveyConfig = {
	type: 'dosen',
	title: 'Survei untuk Dosen',
	description: 'Bantu kami memahami tantangan dalam proses pengajaran',
	steps: [
		{
			title: 'Identitas',
			description: 'Data diri Anda (akan dijaga kerahasiaannya)',
			questions: [
				{
					id: 'fakultas',
					text: 'Fakultas/Program Studi yang Diampu',
					type: 'dropdown',
					options: FAKULTAS_OPTIONS,
					required: true
				},
				{
					id: 'lama_mengajar',
					text: 'Lama Mengajar',
					type: 'radio',
					options: ['< 5 tahun', '5 - 10 tahun', '> 10 tahun'],
					required: true
				},
				{
					id: 'jumlah_matkul',
					text: 'Jumlah Mata Kuliah yang Diampu Semester Ini',
					type: 'radio',
					options: ['1-2 mata kuliah', '3-4 mata kuliah', '5+ mata kuliah'],
					required: true
				}
			]
		},
		{
			title: 'Pengalaman Mengajar',
			description: 'Pengalaman Anda dalam proses belajar mengajar',
			questions: [
				{
					id: 'materi_pdf',
					text: 'Apakah Anda menyediakan materi kuliah dalam format PDF untuk mahasiswa?',
					type: 'radio',
					options: ['Ya, selalu', 'Ya, sebagian besar', 'Kadang-kadang', 'Tidak'],
					required: true
				},
				{
					id: 'pertanyaan_berulang',
					text: 'Seberapa sering Anda menerima pertanyaan yang SAMA berulang-ulang dari mahasiswa berbeda terkait materi dasar?',
					type: 'radio',
					options: [
						'Sangat Sering (hampir setiap minggu)',
						'Sering',
						'Kadang-kadang',
						'Jarang'
					],
					required: true
				},
				{
					id: 'beban_pertanyaan',
					text: 'Apakah Anda merasa terbebani dengan pertanyaan berulang tersebut?',
					type: 'radio',
					options: ['Sangat Terbebani', 'Cukup Terbebani', 'Sedikit Terbebani', 'Tidak Terbebani'],
					required: true
				}
			]
		},
		{
			title: 'Pandangan tentang AI',
			description: 'Pendapat Anda mengenai penggunaan AI oleh mahasiswa',
			questions: [
				{
					id: 'khawatir_ai',
					text: 'Apakah Anda khawatir mahasiswa mendapatkan informasi yang SALAH jika mereka belajar menggunakan ChatGPT/AI umum?',
					type: 'radio',
					options: ['Sangat Khawatir', 'Cukup Khawatir', 'Sedikit Khawatir', 'Tidak Khawatir'],
					required: true
				},
				{
					id: 'tugas_ai_salah',
					text: 'Apakah Anda pernah menemukan tugas mahasiswa yang jawabannya berasal dari AI tetapi TIDAK SESUAI dengan materi yang diajarkan?',
					type: 'radio',
					options: ['Sangat Sering', 'Sering', 'Kadang-kadang', 'Tidak Pernah'],
					required: true
				}
			]
		},
		{
			title: 'Validasi Solusi',
			description: 'Pendapat Anda tentang solusi yang akan kami kembangkan',
			questions: [
				{
					id: 'akses_24jam',
					text: 'Apakah Anda setuju bahwa mahasiswa membutuhkan akses tanya-jawab materi yang bisa diakses 24 jam di luar jam perkuliahan?',
					type: 'radio',
					options: ['Sangat Setuju', 'Setuju', 'Netral', 'Tidak Setuju', 'Sangat Tidak Setuju'],
					required: true
				},
				{
					id: 'dukungan_sistem',
					text: 'Apakah Anda MENDUKUNG pengembangan sistem Asisten AI yang berbasis materi kuliah internal (hanya menjawab dari PDF materi Anda)?',
					type: 'radio',
					options: ['Sangat Mendukung', 'Mendukung', 'Netral', 'Tidak Mendukung'],
					required: true
				},
				{
					id: 'bersedia_upload',
					text: 'Apakah Anda bersedia mengunggah materi kuliah Anda ke sistem tersebut jika dikembangkan?',
					type: 'radio',
					options: [
						'Ya, sangat bersedia',
						'Ya, dengan beberapa syarat',
						'Mungkin, perlu dikaji lebih lanjut',
						'Tidak bersedia'
					],
					required: true
				},
				{
					id: 'saran',
					text: 'Saran untuk pengembangan sistem Asisten Kampus (opsional)',
					type: 'textarea',
					placeholder: 'Tuliskan saran Anda di sini...',
					required: false
				},
				{
					id: 'email',
					text: 'Masukkan email Anda jika ingin dihubungi untuk diskusi lebih lanjut (opsional)',
					type: 'email',
					placeholder: 'contoh@email.com',
					required: false
				}
			]
		}
	]
};
