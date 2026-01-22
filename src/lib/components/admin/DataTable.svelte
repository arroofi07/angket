<script lang="ts">
	import type { SurveyResponse } from '$lib/types/survey';

	interface Props {
		responses: SurveyResponse[];
		onDelete?: (id: string) => void;
	}

	let { responses, onDelete }: Props = $props();

	function formatDate(date: Date) {
		return new Intl.DateTimeFormat('id-ID', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	function getEmail(response: SurveyResponse): string {
		const email = response.answers['email'];
		if (!email || email === '') return '-';
		return email as string;
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
						<th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Email</th>
						<th class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Waktu</th>
						{#if onDelete}
							<th class="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Aksi</th>
						{/if}
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
							<td class="px-4 py-3 text-sm">
								{#if getEmail(response) !== '-'}
									<a
										href="mailto:{getEmail(response)}"
										class="text-indigo-400 hover:text-indigo-300 hover:underline"
									>
										{getEmail(response)}
									</a>
								{:else}
									<span class="text-gray-500">-</span>
								{/if}
							</td>
							<td class="px-4 py-3 text-sm text-gray-400">
								{formatDate(response.createdAt)}
							</td>
							{#if onDelete}
								<td class="px-4 py-3 text-right text-sm">
									<button
										class="text-red-400 hover:text-red-300"
										onclick={() => onDelete(response.id)}
										title="Hapus"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											class="h-5 w-5"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</button>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
