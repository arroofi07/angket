<script lang="ts">
	import { Button, Card } from '$lib/components';

	// Animation delay for staggered elements
	let mounted = $state(false);

	$effect(() => {
		mounted = true;
	});
</script>

<div class="flex min-h-screen flex-col">
	<!-- Hero Section -->
	<main class="flex flex-1 items-center justify-center px-4 py-12">
		<div class="mx-auto max-w-4xl text-center">
			<!-- Badge -->
			<div
				class="animate-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-400"
			>
				<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
					<path
						fill-rule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clip-rule="evenodd"
					/>
				</svg>
				Survei Pra-Penelitian Skripsi
			</div>

			<!-- Main Heading -->
			<h1
				class="animate-slide-up mb-6 text-4xl font-extrabold md:text-6xl"
				style="animation-delay: 0.1s"
			>
				<span class="text-white">Kesulitan Mencari Jawaban di</span>
				<br />
				<span class="gradient-text">Modul Kuliah yang Tebal?</span>
			</h1>

			<!-- Subheading -->
			<p
				class="animate-slide-up mx-auto mb-8 max-w-2xl text-lg text-gray-400 md:text-xl"
				style="animation-delay: 0.2s"
			>
				Bantu kami membangun <strong class="text-indigo-400">Asisten AI Khusus Kampus</strong> yang menjawab
				pertanyaan berdasarkan materi kuliah dosen — akurat dan ada referensi halamannya!
			</p>

			<!-- Stats -->
			<div
				class="animate-slide-up mb-10 flex flex-wrap justify-center gap-8"
				style="animation-delay: 0.3s"
			>
				<div class="text-center">
					<div class="text-3xl font-bold text-white">3 Menit</div>
					<div class="text-sm text-gray-500">Waktu Pengisian</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-white">15</div>
					<div class="text-sm text-gray-500">Pertanyaan</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-white">100%</div>
					<div class="text-sm text-gray-500">Anonim</div>
				</div>
			</div>

			<!-- CTA Button -->
			<div class="animate-slide-up" style="animation-delay: 0.4s">
				<a href="/survey">
					<Button size="lg" class="animate-pulse-glow">
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							/>
						</svg>
						Mulai Isi Survei
					</Button>
				</a>
			</div>

			<!-- Features -->
			<div class="animate-slide-up mt-16 grid gap-6 md:grid-cols-3" style="animation-delay: 0.5s">
				<Card variant="glass" class="text-left">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/20">
						<svg
							class="h-6 w-6 text-indigo-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold text-white">Identifikasi Masalah</h3>
					<p class="text-sm text-gray-400">
						Kami ingin memahami kesulitan yang Anda hadapi saat belajar dengan modul PDF.
					</p>
				</Card>

				<Card variant="glass" class="text-left">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
						<svg
							class="h-6 w-6 text-purple-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold text-white">Validasi Solusi</h3>
					<p class="text-sm text-gray-400">
						Pendapat Anda akan membantu kami membangun Asisten AI yang benar-benar berguna.
					</p>
				</Card>

				<Card variant="glass" class="text-left">
					<div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/20">
						<svg
							class="h-6 w-6 text-pink-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
							/>
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold text-white">Jadi Beta Tester</h3>
					<p class="text-sm text-gray-400">
						Kesempatan menjadi orang pertama yang mencoba sistem Asisten Kampus saat rilis!
					</p>
				</Card>
			</div>
		</div>
	</main>

	<!-- Footer -->
	<footer class="px-4 py-6 text-center text-sm text-gray-500">
		<p>
			Penelitian oleh Nabhan Arroofi Arpansi <strong class="text-gray-400"
				>Universitas Bung Hatta</strong
			>
		</p>
		<p class="mt-1">© 2026 — Survei Pra-Penelitian Skripsi</p>
	</footer>
</div>
