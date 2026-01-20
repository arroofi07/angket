<script lang="ts">
	interface Props {
		currentStep: number;
		totalSteps: number;
		stepTitles?: string[];
	}

	let { currentStep, totalSteps, stepTitles = [] }: Props = $props();

	const progress = $derived(((currentStep + 1) / totalSteps) * 100);
</script>

<div class="w-full">
	<!-- Step Indicators Only (removed redundant progress bar) -->
	<div class="flex items-center justify-between">
		{#each Array(totalSteps) as _, i}
			<div class="flex flex-col items-center gap-2">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
						{i < currentStep
						? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
						: i === currentStep
							? 'bg-indigo-500 text-white ring-4 ring-indigo-500/30'
							: 'bg-gray-700 text-gray-400'}"
				>
					{#if i < currentStep}
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					{:else}
						{i + 1}
					{/if}
				</div>
				{#if stepTitles[i]}
					<span
						class="max-w-[80px] truncate text-center text-xs
							{i <= currentStep ? 'text-indigo-400' : 'text-gray-500'}"
					>
						{stepTitles[i]}
					</span>
				{/if}
			</div>
			{#if i < totalSteps - 1}
				<div
					class="mx-2 h-1 flex-1 rounded-full transition-all duration-300
						{i < currentStep ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-700'}"
				></div>
			{/if}
		{/each}
	</div>

	<!-- Progress percentage text -->
	<div class="mt-4 text-center text-xs text-gray-500">
		{Math.round(progress)}% selesai
	</div>
</div>
