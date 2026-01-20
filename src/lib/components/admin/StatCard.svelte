<script lang="ts">
	interface Props {
		title: string;
		value: number | string;
		subtitle?: string;
		icon?: string;
		color?: 'indigo' | 'emerald' | 'purple' | 'pink' | 'amber';
	}

	let { title, value, subtitle, icon, color = 'indigo' }: Props = $props();

	const colorClasses = {
		indigo: 'from-indigo-500/20 to-indigo-600/20 text-indigo-400',
		emerald: 'from-emerald-500/20 to-emerald-600/20 text-emerald-400',
		purple: 'from-purple-500/20 to-purple-600/20 text-purple-400',
		pink: 'from-pink-500/20 to-pink-600/20 text-pink-400',
		amber: 'from-amber-500/20 to-amber-600/20 text-amber-400'
	};
</script>

<div class="rounded-2xl border border-gray-700/50 bg-gray-800/50 p-6">
	<div class="flex items-start justify-between">
		<div>
			<p class="mb-1 text-sm font-medium text-gray-400">{title}</p>
			<p class="text-3xl font-bold text-white">{value}</p>
			{#if subtitle}
				<p class="mt-1 text-sm text-gray-500">{subtitle}</p>
			{/if}
		</div>
		{#if icon}
			<div
				class="h-12 w-12 rounded-xl bg-gradient-to-br {colorClasses[
					color
				]} flex items-center justify-center"
			>
				<span class="text-2xl">{icon}</span>
			</div>
		{/if}
	</div>
</div>
