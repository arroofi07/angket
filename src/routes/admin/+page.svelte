<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Card } from '$lib/components';
	import StatCard from '$lib/components/admin/StatCard.svelte';
	import Chart from '$lib/components/admin/Chart.svelte';
	import DataTable from '$lib/components/admin/DataTable.svelte';
	import { getAllResponses, getSurveyStats, deleteResponse } from '$lib/firebase/firestore';
	import type { SurveyResponse, SurveyStats } from '$lib/types/survey';

	let isAuthenticated = $state(false);
	let password = $state('');
	let isLoading = $state(true);
	let error = $state('');

	let responses = $state<SurveyResponse[]>([]);
	let stats = $state<SurveyStats | null>(null);

	// Simple password protection (replace with your password)
	const ADMIN_PASSWORD = 'admin123';

	async function handleLogin() {
		if (password === ADMIN_PASSWORD) {
			isAuthenticated = true;
			error = '';
			await loadData();
		} else {
			error = 'Password salah!';
		}
	}

	async function loadData() {
		isLoading = true;
		try {
			responses = await getAllResponses();
			stats = await getSurveyStats();
		} catch (err) {
			console.error('Error loading data:', err);
			error = 'Gagal memuat data. Pastikan Firebase sudah dikonfigurasi.';
		} finally {
			isLoading = false;
		}
	}

	async function handleDelete(id: string) {
		if (!confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

		try {
			await deleteResponse(id);
			await loadData();
		} catch (err) {
			console.error('Error deleting response:', err);
			alert('Gagal menghapus data');
		}
	}

	function exportToCSV() {
		if (responses.length === 0) {
			alert('Tidak ada data untuk di-export');
			return;
		}

		// Get all unique question IDs
		const allQuestionIds = new Set<string>();
		responses.forEach((r) => {
			Object.keys(r.answers).forEach((id) => allQuestionIds.add(id));
		});

		// Create CSV header
		const headers = ['ID', 'Tipe', 'Waktu', ...Array.from(allQuestionIds)];

		// Create CSV rows
		const rows = responses.map((r) => {
			const row = [
				r.id,
				r.respondentType,
				r.createdAt.toISOString(),
				...Array.from(allQuestionIds).map((id) => {
					const answer = r.answers[id];
					if (Array.isArray(answer)) {
						return answer.join('; ');
					}
					return answer || '';
				})
			];
			return row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',');
		});

		const csv = [headers.join(','), ...rows].join('\n');

		// Download
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `survey-responses-${new Date().toISOString().split('T')[0]}.csv`;
		link.click();
		URL.revokeObjectURL(url);
	}

	onMount(() => {
		// Check if already authenticated in session
		const savedAuth = sessionStorage.getItem('admin_auth');
		if (savedAuth === 'true') {
			isAuthenticated = true;
			loadData();
		} else {
			isLoading = false;
		}
	});

	$effect(() => {
		if (isAuthenticated) {
			sessionStorage.setItem('admin_auth', 'true');
		}
	});
</script>

<svelte:head>
	<title>Admin Dashboard | Survei Pra-Penelitian</title>
</svelte:head>

{#if !isAuthenticated}
	<!-- Login Form -->
	<div class="flex min-h-screen items-center justify-center px-4">
		<Card variant="glass" padding="lg" class="w-full max-w-md">
			<div class="mb-8 text-center">
				<div
					class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20"
				>
					<svg
						class="h-8 w-8 text-indigo-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
						/>
					</svg>
				</div>
				<h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
				<p class="mt-2 text-gray-400">Masukkan password untuk melihat statistik</p>
			</div>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					handleLogin();
				}}
			>
				<div class="mb-4">
					<input
						type="password"
						bind:value={password}
						placeholder="Password"
						class="w-full rounded-xl border-2 border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-200 placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
					/>
				</div>

				{#if error}
					<p class="mb-4 text-sm text-red-400">{error}</p>
				{/if}

				<Button type="submit" class="w-full">Masuk</Button>
			</form>

			<div class="mt-6 text-center">
				<a href="/" class="text-sm text-gray-400 hover:text-indigo-400"> ← Kembali ke Beranda </a>
			</div>
		</Card>
	</div>
{:else}
	<!-- Dashboard -->
	<div class="min-h-screen px-4 py-8">
		<div class="mx-auto max-w-7xl">
			<!-- Header -->
			<div class="mb-8 flex flex-wrap items-center justify-between gap-4">
				<div>
					<h1 class="text-2xl font-bold text-white md:text-3xl">Dashboard Admin</h1>
					<p class="text-gray-400">Statistik hasil survei pra-penelitian</p>
				</div>
				<div class="flex gap-3">
					<Button variant="outline" onclick={loadData}>
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
							/>
						</svg>
						Refresh
					</Button>
					<Button onclick={exportToCSV}>
						<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						Export CSV
					</Button>
				</div>
			</div>

			{#if isLoading}
				<div class="flex items-center justify-center py-20">
					<div
						class="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"
					></div>
					<span class="ml-3 text-gray-400">Memuat data...</span>
				</div>
			{:else if error}
				<Card variant="glass" class="py-12 text-center">
					<p class="text-red-400">{error}</p>
					<Button variant="outline" class="mt-4" onclick={loadData}>Coba Lagi</Button>
				</Card>
			{:else if stats}
				<!-- Stats Cards -->
				<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
					<StatCard
						title="Total Responden"
						value={stats.totalResponses}
						subtitle="Semua responden"
						icon="📊"
						color="indigo"
					/>
					<StatCard
						title="Mahasiswa"
						value={stats.mahasiswaCount}
						subtitle="{stats.totalResponses > 0
							? Math.round((stats.mahasiswaCount / stats.totalResponses) * 100)
							: 0}% dari total"
						icon="🎓"
						color="purple"
					/>
					<StatCard
						title="Dosen"
						value={stats.dosenCount}
						subtitle="{stats.totalResponses > 0
							? Math.round((stats.dosenCount / stats.totalResponses) * 100)
							: 0}% dari total"
						icon="📚"
						color="emerald"
					/>
				</div>

				<!-- Charts Grid -->
				<div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
					<Chart
						title="Kesulitan Mencari di PDF (Mahasiswa)"
						data={stats.pdfDifficultyStats}
						type="bar"
					/>
					<Chart title="Penggunaan AI (Mahasiswa)" data={stats.aiUsageStats} type="bar" />
					<Chart title="Pengalaman Halusinasi AI" data={stats.hallucinationStats} type="pie" />
					<Chart
						title="Kebutuhan Asisten Kampus (Mahasiswa)"
						data={stats.mahasiswaNeedStats}
						type="pie"
					/>
					<Chart title="Dukungan Dosen" data={stats.dosenSupportStats} type="pie" />
					<Chart title="Distribusi Program Studi" data={stats.prodiDistribution} type="bar" />
				</div>

				<!-- Recent Responses Table -->
				<DataTable {responses} onDelete={handleDelete} />
			{/if}
		</div>
	</div>
{/if}
