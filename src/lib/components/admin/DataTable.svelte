<script lang="ts">
	import type { SurveyResponse } from '$lib/types/survey';

	interface Props {
		responses: SurveyResponse[];
	}

	let { responses }: Props = $props();

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('id-ID', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}
</script>

<div class="overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/50">
	<div class="border-b border-gray-700/50 p-4">
		<h3 class="font-semibold text-white">Responden Terbaru</h3>
	</div>

	{#if responses.length === 0}
		<div class="p-8 text-center text-gray-500">Belum ada responden</div>
	{:else}
		<div class="overflow-x-auto">
			<table class="w-full">
				<thead class="bg-gray-900/50">
					<tr>
						<th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">No</th>
						<th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Tipe</th>
						<th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase"
							>Prodi/Fakultas</th
						>
						<th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Waktu</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-700/50">
					{#each responses.slice(0, 10) as response, i}
						<tr class="transition-colors hover:bg-gray-700/30">
							<td class="px-4 py-3 text-sm text-gray-400">{i + 1}</td>
							<td class="px-4 py-3">
								<span
									class="rounded-full px-2 py-1 text-xs font-medium
									{response.respondentType === 'mahasiswa'
										? 'bg-indigo-500/20 text-indigo-400'
										: 'bg-emerald-500/20 text-emerald-400'}"
								>
									{response.respondentType === 'mahasiswa' ? 'Mahasiswa' : 'Dosen'}
								</span>
							</td>
							<td class="px-4 py-3 text-sm text-gray-300">
								{response.answers['prodi'] || response.answers['fakultas'] || '-'}
							</td>
							<td class="px-4 py-3 text-sm text-gray-400">
								{formatDate(response.createdAt)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
