<script lang="ts">
	interface Props {
		title: string;
		data: Record<string, number>;
		type?: 'bar' | 'pie';
		color?: string;
	}

	let { title, data, type = 'bar', color = '#6366f1' }: Props = $props();

	const entries = $derived(Object.entries(data));
	const total = $derived(entries.reduce((sum, [_, val]) => sum + val, 0));
	const maxValue = $derived(Math.max(...entries.map(([_, val]) => val), 0));

	// Color palette for pie chart
	const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#ef4444'];
</script>

<div class="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6">
	<h3 class="mb-4 font-semibold text-white">{title}</h3>

	{#if entries.length === 0}
		<p class="text-sm text-gray-500">Belum ada data</p>
	{:else if type === 'bar'}
		<div class="space-y-3">
			{#each entries as [label, value], i}
				<div>
					<div class="mb-1 flex justify-between text-sm">
						<span class="truncate text-gray-400">{label}</span>
						<span class="font-medium text-white"
							>{value} ({total > 0 ? Math.round((value / total) * 100) : 0}%)</span
						>
					</div>
					<div class="h-3 overflow-hidden rounded-full bg-gray-700">
						<div
							class="h-full rounded-full transition-all duration-500"
							style="width: {maxValue > 0 ? (value / maxValue) * 100 : 0}%; background: {colors[
								i % colors.length
							]}"
						></div>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<!-- Pie Chart (simplified CSS-based) -->
		<div class="flex items-center gap-6">
			<div class="relative h-32 w-32">
				<svg viewBox="0 0 100 100" class="h-full w-full -rotate-90">
					{#each entries as [label, value], i}
						{@const percentage = total > 0 ? (value / total) * 100 : 0}
						{@const prevPercentages = entries
							.slice(0, i)
							.reduce((sum, [_, v]) => sum + (total > 0 ? (v / total) * 100 : 0), 0)}
						<circle
							cx="50"
							cy="50"
							r="40"
							fill="none"
							stroke={colors[i % colors.length]}
							stroke-width="20"
							stroke-dasharray="{percentage * 2.51327} {251.327 - percentage * 2.51327}"
							stroke-dashoffset={-prevPercentages * 2.51327}
							class="transition-all duration-500"
						/>
					{/each}
				</svg>
				<div class="absolute inset-0 flex items-center justify-center">
					<span class="text-2xl font-bold text-white">{total}</span>
				</div>
			</div>
			<div class="flex-1 space-y-2">
				{#each entries as [label, value], i}
					<div class="flex items-center gap-2">
						<div class="h-3 w-3 rounded-full" style="background: {colors[i % colors.length]}"></div>
						<span class="truncate text-sm text-gray-400">{label}</span>
						<span class="ml-auto text-sm text-white">{value}</span>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
