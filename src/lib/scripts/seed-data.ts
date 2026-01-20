// Script to generate dummy data for the survey database
// Run with: npx tsx src/lib/scripts/seed-data.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Firebase configuration - same as your .env
const firebaseConfig = {
	apiKey: 'AIzaSyD81k37nCJMHthLCCD-Ho62bSfNkC2G5sM',
	authDomain: 'angket-5b31b.firebaseapp.com',
	projectId: 'angket-5b31b',
	storageBucket: 'angket-5b31b.firebasestorage.app',
	messagingSenderId: '1017259840410',
	appId: '1:1017259840410:web:010c4f0b70bd82fba0a023'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Options data
const PRODI_OPTIONS = [
	'Teknik Informatika',
	'Sistem Informasi',
	'Teknik Elektro',
	'Teknik Sipil',
	'Teknik Mesin',
	'Teknik Industri',
	'Arsitektur',
	'Akuntansi',
	'Manajemen',
	'Ilmu Hukum',
	'Ilmu Komunikasi',
	'Psikologi',
	'Farmasi',
	'Pendidikan Guru'
];

const FAKULTAS_OPTIONS = [
	'Fakultas Teknologi Industri',
	'Fakultas Teknik Sipil dan Perencanaan',
	'Fakultas Ekonomi dan Bisnis',
	'Fakultas Hukum',
	'Fakultas Ilmu Budaya',
	'Fakultas Keguruan dan Ilmu Pendidikan',
	'Fakultas Farmasi'
];

// Helper function to pick random item from array
function randomPick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

// Helper function to pick multiple random items
function randomPickMultiple<T>(arr: T[], min: number, max: number): T[] {
	const count = Math.floor(Math.random() * (max - min + 1)) + min;
	const shuffled = [...arr].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

// Generate mahasiswa dummy data
function generateMahasiswaData(index: number) {
	const genderOptions = ['Laki-laki', 'Perempuan'];
	const semesterOptions = ['Semester 1-2', 'Semester 3-4', 'Semester 5-6', 'Semester 7+'];
	const ipkOptions = ['< 2.5', '2.5 - 3.0', '3.0 - 3.5', '> 3.5', 'Belum ada IPK'];
	const frekuensiPdfOptions = [
		'Sangat Sering (setiap hari)',
		'Sering (3-5x seminggu)',
		'Jarang (1-2x seminggu)',
		'Sangat Jarang (<1x seminggu)'
	];
	const kesulitanPdfOptions = ['Sangat Kesulitan', 'Cukup Kesulitan', 'Sedikit Kesulitan', 'Tidak Kesulitan'];
	const waktuCariOptions = ['< 1 menit', '1 - 5 menit', '5 - 10 menit', '> 10 menit'];
	const metodeBelajarOptions = [
		'Ctrl+F di PDF',
		'Membaca halaman per halaman',
		'Bertanya ke teman',
		'Bertanya ke dosen via WA/Email',
		'Menggunakan ChatGPT/AI',
		'Mencari di Google'
	];
	const penggunaanAiOptions = ['Sangat Sering', 'Sering', 'Kadang-kadang', 'Jarang', 'Tidak Pernah'];
	const halusinasiAiOptions = [
		'Sangat Sering (>5 kali)',
		'Sering (3-5 kali)',
		'Kadang-kadang (1-2 kali)',
		'Tidak Pernah',
		'Tidak Tahu / Tidak Mengecek'
	];
	const kepercayaanAiOptions = [
		'Sangat Percaya (langsung dipakai)',
		'Cukup Percaya (tapi tetap cek)',
		'Kurang Percaya',
		'Tidak Percaya'
	];
	const kendalaDosenOptions = ['Sangat Setuju', 'Setuju', 'Netral', 'Tidak Setuju', 'Sangat Tidak Setuju'];
	const kebutuhanAsistenOptions = ['Sangat Terbantu', 'Cukup Terbantu', 'Biasa Saja', 'Tidak Terbantu'];
	const fiturHarapanOptions = [
		'Bisa menjawab dalam Bahasa Indonesia',
		'Menyertakan nomor halaman referensi',
		'Bisa diakses 24 jam',
		'Tersedia di HP (mobile-friendly)',
		'Bisa menyimpan history pertanyaan',
		'Bisa upload materi sendiri'
	];

	// Weighted random to make data more realistic (more positive responses)
	const weightedPick = (options: string[], weights: number[]) => {
		const totalWeight = weights.reduce((a, b) => a + b, 0);
		let random = Math.random() * totalWeight;
		for (let i = 0; i < options.length; i++) {
			random -= weights[i];
			if (random <= 0) return options[i];
		}
		return options[options.length - 1];
	};

	return {
		respondentType: 'mahasiswa',
		createdAt: Timestamp.fromDate(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)), // Random date in last 7 days
		answers: {
			gender: randomPick(genderOptions),
			prodi: randomPick(PRODI_OPTIONS),
			semester: randomPick(semesterOptions),
			ipk: randomPick(ipkOptions),
			frekuensi_pdf: weightedPick(frekuensiPdfOptions, [30, 40, 20, 10]),
			kesulitan_pdf: weightedPick(kesulitanPdfOptions, [35, 40, 20, 5]), // More people find it difficult
			waktu_cari: weightedPick(waktuCariOptions, [10, 35, 35, 20]),
			metode_belajar: randomPickMultiple(metodeBelajarOptions, 2, 4),
			penggunaan_ai: weightedPick(penggunaanAiOptions, [25, 35, 25, 10, 5]),
			halusinasi_ai: weightedPick(halusinasiAiOptions, [15, 25, 35, 15, 10]),
			kepercayaan_ai: weightedPick(kepercayaanAiOptions, [10, 50, 30, 10]),
			kendala_dosen: weightedPick(kendalaDosenOptions, [30, 40, 20, 8, 2]),
			kebutuhan_asisten: weightedPick(kebutuhanAsistenOptions, [50, 35, 12, 3]), // Most find it helpful
			fitur_harapan: randomPickMultiple(fiturHarapanOptions, 2, 5),
			email: index % 3 === 0 ? `mahasiswa${index}@student.ubh.ac.id` : '' // Some leave email
		}
	};
}

// Generate dosen dummy data
function generateDosenData(index: number) {
	const lamaMengajarOptions = ['< 5 tahun', '5 - 10 tahun', '> 10 tahun'];
	const jumlahMatkulOptions = ['1-2 mata kuliah', '3-4 mata kuliah', '5+ mata kuliah'];
	const materiPdfOptions = ['Ya, selalu', 'Ya, sebagian besar', 'Kadang-kadang', 'Tidak'];
	const pertanyaanBerulangOptions = [
		'Sangat Sering (hampir setiap minggu)',
		'Sering',
		'Kadang-kadang',
		'Jarang'
	];
	const bebanPertanyaanOptions = ['Sangat Terbebani', 'Cukup Terbebani', 'Sedikit Terbebani', 'Tidak Terbebani'];
	const khawatirAiOptions = ['Sangat Khawatir', 'Cukup Khawatir', 'Sedikit Khawatir', 'Tidak Khawatir'];
	const tugasAiSalahOptions = ['Sangat Sering', 'Sering', 'Kadang-kadang', 'Tidak Pernah'];
	const akses24jamOptions = ['Sangat Setuju', 'Setuju', 'Netral', 'Tidak Setuju', 'Sangat Tidak Setuju'];
	const dukunganSistemOptions = ['Sangat Mendukung', 'Mendukung', 'Netral', 'Tidak Mendukung'];
	const bersediaUploadOptions = [
		'Ya, sangat bersedia',
		'Ya, dengan beberapa syarat',
		'Mungkin, perlu dikaji lebih lanjut',
		'Tidak bersedia'
	];

	const saranOptions = [
		'Sistem ini sangat dibutuhkan untuk membantu mahasiswa belajar mandiri.',
		'Perlu memastikan keamanan dan privasi materi yang diunggah.',
		'Bagus untuk mengurangi pertanyaan repetitif dari mahasiswa.',
		'Sebaiknya ada fitur untuk dosen bisa memantau pertanyaan mahasiswa.',
		'Harap pastikan jawaban AI tetap sesuai dengan kurikulum.',
		''
	];

	const weightedPick = (options: string[], weights: number[]) => {
		const totalWeight = weights.reduce((a, b) => a + b, 0);
		let random = Math.random() * totalWeight;
		for (let i = 0; i < options.length; i++) {
			random -= weights[i];
			if (random <= 0) return options[i];
		}
		return options[options.length - 1];
	};

	return {
		respondentType: 'dosen',
		createdAt: Timestamp.fromDate(new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)),
		answers: {
			fakultas: randomPick(FAKULTAS_OPTIONS),
			lama_mengajar: randomPick(lamaMengajarOptions),
			jumlah_matkul: randomPick(jumlahMatkulOptions),
			materi_pdf: weightedPick(materiPdfOptions, [40, 35, 20, 5]),
			pertanyaan_berulang: weightedPick(pertanyaanBerulangOptions, [35, 35, 20, 10]),
			beban_pertanyaan: weightedPick(bebanPertanyaanOptions, [20, 40, 30, 10]),
			khawatir_ai: weightedPick(khawatirAiOptions, [30, 40, 20, 10]),
			tugas_ai_salah: weightedPick(tugasAiSalahOptions, [20, 35, 35, 10]),
			akses_24jam: weightedPick(akses24jamOptions, [35, 40, 20, 4, 1]),
			dukungan_sistem: weightedPick(dukunganSistemOptions, [40, 40, 15, 5]), // Most support
			bersedia_upload: weightedPick(bersediaUploadOptions, [30, 35, 25, 10]),
			saran: randomPick(saranOptions),
			email: index % 2 === 0 ? `dosen${index}@ubh.ac.id` : ''
		},
		suggestions: randomPick(saranOptions)
	};
}

// Main seed function
async function seedDatabase() {
	console.log('🌱 Starting database seeding...\n');

	const MAHASISWA_COUNT = 50; // Generate 50 mahasiswa responses
	const DOSEN_COUNT = 15; // Generate 15 dosen responses

	// Seed Mahasiswa data
	console.log(`📚 Generating ${MAHASISWA_COUNT} mahasiswa responses...`);
	for (let i = 1; i <= MAHASISWA_COUNT; i++) {
		try {
			const data = generateMahasiswaData(i);
			await addDoc(collection(db, 'responses'), data);
			process.stdout.write(`  ✓ Mahasiswa ${i}/${MAHASISWA_COUNT}\r`);
		} catch (error) {
			console.error(`  ✗ Failed to add mahasiswa ${i}:`, error);
		}
	}
	console.log(`\n✅ Mahasiswa data seeded successfully!\n`);

	// Seed Dosen data
	console.log(`👨‍🏫 Generating ${DOSEN_COUNT} dosen responses...`);
	for (let i = 1; i <= DOSEN_COUNT; i++) {
		try {
			const data = generateDosenData(i);
			await addDoc(collection(db, 'responses'), data);
			process.stdout.write(`  ✓ Dosen ${i}/${DOSEN_COUNT}\r`);
		} catch (error) {
			console.error(`  ✗ Failed to add dosen ${i}:`, error);
		}
	}
	console.log(`\n✅ Dosen data seeded successfully!\n`);

	console.log('🎉 Database seeding completed!');
	console.log(`   Total: ${MAHASISWA_COUNT} mahasiswa + ${DOSEN_COUNT} dosen = ${MAHASISWA_COUNT + DOSEN_COUNT} responses`);
	
	process.exit(0);
}

// Run the seeder
seedDatabase().catch((error) => {
	console.error('❌ Seeding failed:', error);
	process.exit(1);
});
