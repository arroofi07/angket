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
			<Button onclick={onSubmit} disabled={!canGoNext || isSubmitting}>
				{#if isSubmitting}
					<svg class="mr-3 -ml-1 h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
						></path>
					</svg>
					Mengirim...
				{:else}
					Kirim Jawaban
					<svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				{/if}
			</Button>
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
