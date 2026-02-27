<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';

	interface Props {
		currentStep: number;
		totalSteps: number;
		canGoNext: boolean;
		isSubmitting?: boolean;
		onPrev: () => void;
		onNext: () => void;
		onSubmit: () => void;
	}

	let {
		currentStep,
		totalSteps,
		canGoNext,
		isSubmitting = false,
		onPrev,
		onNext,
		onSubmit
	}: Props = $props();

	const isFirstStep = $derived(currentStep === 0);
	const isLastStep = $derived(currentStep === totalSteps - 1);
</script>

<div class="flex items-center justify-between border-t border-gray-700/50 pt-6">
	<div>
		{#if !isFirstStep}
			<Button variant="ghost" onclick={onPrev} disabled={isSubmitting}>
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 19l-7-7 7-7"
					/>
				</svg>
				Kembali
			</Button>
		{/if}
	</div>

	<div>
		{#if isLastStep}
			<Button onclick={onSubmit} disabled={true}>Survei Ditutup</Button>
		{:else}
			<Button onclick={onNext} disabled={!canGoNext}>
				Selanjutnya
				<svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</Button>
		{/if}
	</div>
</div>
