<script lang="ts">
	import { Card, Button } from '$lib/components';
</script>

<svelte:head>
	<title>Pilih Jenis Responden | Survei Pra-Penelitian</title>
</svelte:head>

<div class="flex min-h-screen flex-col items-center justify-center px-4 py-12">
	<div class="mx-auto w-full max-w-3xl">
		<!-- Header -->
		<div class="animate-fade-in mb-12 text-center">
			<a
				href="/"
				class="mb-6 inline-flex items-center text-gray-400 transition-colors hover:text-indigo-400"
			>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Kembali
			</a>
			<h1 class="mb-4 text-3xl font-bold text-white md:text-4xl">Jenis Responden</h1>
			<p class="text-gray-400">Pilih jenis responden yang sesuai dengan Anda</p>
		</div>

		<!-- Options -->
		<div class="grid gap-6 md:grid-cols-2">
			<!-- Mahasiswa Card -->
			<a href="/survey/mahasiswa" class="animate-slide-up block" style="animation-delay: 0.1s">
				<Card variant="gradient" hoverable class="group h-full">
					<div class="text-center">
						<!-- Icon -->
						<div
							class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 transition-transform duration-300 group-hover:scale-110"
						>
							<svg
								class="h-10 w-10 text-indigo-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
								/>
							</svg>
						</div>

						<h2 class="mb-3 text-2xl font-bold text-white">Mahasiswa</h2>
						<p class="mb-6 text-gray-400">
							Mahasiswa aktif di Universitas Bung Hatta
						</p>

						<!-- Features -->
						<div class="mb-6 flex flex-wrap justify-center gap-2">
							<span class="rounded-full bg-indigo-500/10 px-3 py-1 text-sm text-indigo-400"
								>15 pertanyaan</span
							>
							<span class="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-400"
								>~3 menit</span
							>
						</div>

						<div
							class="flex items-center justify-center font-medium text-indigo-400 group-hover:text-indigo-300"
						>
							Mulai Survei
							<svg
								class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Card>
			</a>

			<!-- Dosen Card -->
			<a href="/survey/dosen" class="animate-slide-up block" style="animation-delay: 0.2s">
				<Card variant="gradient" hoverable class="group h-full">
					<div class="text-center">
						<!-- Icon -->
						<div
							class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 transition-transform duration-300 group-hover:scale-110"
						>
							<svg
								class="h-10 w-10 text-emerald-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
								/>
							</svg>
						</div>

						<h2 class="mb-3 text-2xl font-bold text-white">Dosen</h2>
						<p class="mb-6 text-gray-400">
							Dosen atau tenaga pengajar di Universitas Bung Hatta
						</p>

						<!-- Features -->
						<div class="mb-6 flex flex-wrap justify-center gap-2">
							<span class="rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400"
								>12 pertanyaan</span
							>
							<span class="rounded-full bg-teal-500/10 px-3 py-1 text-sm text-teal-400"
								>~2 menit</span
							>
						</div>

						<div
							class="flex items-center justify-center font-medium text-emerald-400 group-hover:text-emerald-300"
						>
							Mulai Survei
							<svg
								class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</div>
					</div>
				</Card>
			</a>
		</div>

		<!-- Info -->
		<div
			class="animate-fade-in mt-8 text-center text-sm text-gray-500"
			style="animation-delay: 0.3s"
		>
			<p>
				Data yang Anda berikan akan dijaga kerahasiaannya dan hanya digunakan untuk keperluan
				penelitian.
			</p>
		</div>
	</div>
</div>
