<script lang="ts">
	import { page } from '$app/stores';
	import { Card, Button } from '$lib/components';
	import { onMount } from 'svelte';

	let respondentType = $state<string>('');
	let confetti = $state(false);

	onMount(() => {
		const type = $page.url.searchParams.get('type');
		respondentType = type || '';

		// Trigger confetti animation after a short delay
		setTimeout(() => {
			confetti = true;
		}, 300);
	});

	const messages = {
		mahasiswa: {
			title: 'Terima Kasih, Mahasiswa!',
			subtitle: 'Jawaban Anda sangat berharga untuk penelitian ini.',
			icon: '🎓'
		},
		dosen: {
			title: 'Terima Kasih, Bapak/Ibu Dosen!',
			subtitle: 'Dukungan Anda sangat berarti untuk pengembangan sistem ini.',
			icon: '📚'
		}
	};

	const message = $derived(messages[respondentType as keyof typeof messages] || messages.mahasiswa);
</script>

<svelte:head>
	<title>Terima Kasih! | Survei Pra-Penelitian</title>
</svelte:head>

<div class="flex min-h-screen items-center justify-center px-4 py-12">
	<div class="mx-auto max-w-lg text-center">
		<!-- Success Animation -->
		<div class="animate-fade-in mb-8">
			<div
				class="animate-pulse-glow mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20"
				style="--tw-ring-color: rgba(16, 185, 129, 0.5);"
			>
				<div class="text-5xl">{message.icon}</div>
			</div>

			<!-- Checkmark -->
			<div
				class="mx-auto -mt-12 ml-16 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30"
			>
				<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="3"
						d="M5 13l4 4L19 7"
					/>
				</svg>
			</div>
		</div>

		<!-- Message -->
		<div class="animate-slide-up">
			<h1 class="mb-4 text-3xl font-bold text-white md:text-4xl">
				{message.title}
			</h1>
			<p class="mb-8 text-lg text-gray-400">
				{message.subtitle}
			</p>
		</div>

		<!-- Info Card -->
		<Card variant="glass" class="animate-slide-up mb-8 text-left" style="animation-delay: 0.2s">
			<div class="flex items-start gap-4">
				<div
					class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-500/20"
				>
					<svg
						class="h-5 w-5 text-indigo-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<div>
					<h3 class="mb-1 font-medium text-white">Apa selanjutnya?</h3>
					<p class="text-sm text-gray-400">
						Jawaban Anda akan dianalisis untuk mengembangkan sistem <strong class="text-indigo-400"
							>Asisten Kampus AI</strong
						> yang dapat membantu mahasiswa belajar dengan lebih efektif.
					</p>
				</div>
			</div>
		</Card>



		<!-- Actions -->
		<div
			class="animate-slide-up flex flex-col justify-center gap-4 sm:flex-row"
			style="animation-delay: 0.4s"
		>
			<a href="/">
				<Button variant="outline">
					<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
						/>
					</svg>
					Kembali ke Beranda
				</Button>
			</a>
		</div>

		<!-- Share -->
		<div class="animate-fade-in mt-8 text-sm text-gray-500" style="animation-delay: 0.5s">
			<p class="mb-3">Bagikan survei ini ke teman Anda:</p>
			<div class="flex justify-center gap-3">
				<button
					class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 transition-colors hover:bg-gray-700"
					onclick={() => {
						if (navigator.share) {
							navigator.share({
								title: 'Survei Pra-Penelitian Asisten Kampus AI',
								text: 'Bantu kami membangun Asisten AI untuk mahasiswa!',
								url: window.location.origin
							});
						} else {
							navigator.clipboard.writeText(window.location.origin);
							alert('Link berhasil disalin!');
						}
					}}
				>
					<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>

<!-- Confetti particles (CSS-based) -->
{#if confetti}
	<div class="pointer-events-none fixed inset-0 overflow-hidden">
		{#each Array(20) as _, i}
			<div
				class="animate-confetti absolute h-3 w-3 rounded-full"
				style="
					left: {Math.random() * 100}%;
					background: {['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#10b981'][
					Math.floor(Math.random() * 5)
				]};
					animation-delay: {Math.random() * 0.5}s;
					animation-duration: {2 + Math.random() * 2}s;
				"
			></div>
		{/each}
	</div>
{/if}

<style>
	@keyframes confetti {
		0% {
			transform: translateY(-100vh) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translateY(100vh) rotate(720deg);
			opacity: 0;
		}
	}

	.animate-confetti {
		animation: confetti linear forwards;
	}
</style>
