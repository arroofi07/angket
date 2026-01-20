<script lang="ts">
	import type { Question } from '$lib/types/survey';
	import RadioGroup from '$lib/components/ui/RadioGroup.svelte';
	import CheckboxGroup from '$lib/components/ui/CheckboxGroup.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import SearchableSelect from '$lib/components/ui/SearchableSelect.svelte';

	interface Props {
		question: Question;
		value: string | string[] | undefined;
		onchange: (questionId: string, value: string | string[]) => void;
		ontoggle: (questionId: string, value: string) => void;
		showError?: boolean;
	}

	let { question, value, onchange, ontoggle, showError = false }: Props = $props();

	const hasError = $derived(
		showError && question.required && (!value || (Array.isArray(value) && value.length === 0))
	);
</script>

<div class="mb-6">
	<div class="mb-3">
		<p class="text-lg font-medium text-gray-100">
			{question.text}
			{#if question.required}
				<span class="text-red-400">*</span>
			{/if}
		</p>
		{#if hasError}
			<p class="mt-1 text-sm text-red-400">Pertanyaan ini wajib dijawab</p>
		{/if}
	</div>

	{#if question.type === 'dropdown' && question.options}
		<SearchableSelect
			name={question.id}
			options={question.options}
			value={value as string}
			placeholder={question.placeholder || 'Pilih atau ketik untuk mencari...'}
			required={question.required}
			onchange={(v) => onchange(question.id, v)}
		/>
	{:else if question.type === 'radio' && question.options}
		<RadioGroup
			name={question.id}
			options={question.options}
			value={value as string}
			required={question.required}
			onchange={(v) => onchange(question.id, v)}
		/>
	{:else if question.type === 'checkbox' && question.options}
		<CheckboxGroup
			name={question.id}
			options={question.options}
			values={(value as string[]) || []}
			onchange={(v) => ontoggle(question.id, v)}
		/>
	{:else if question.type === 'text' || question.type === 'email'}
		<Input
			type={question.type}
			name={question.id}
			value={(value as string) || ''}
			placeholder={question.placeholder || ''}
			required={question.required}
			oninput={(v) => onchange(question.id, v)}
		/>
	{:else if question.type === 'textarea'}
		<Textarea
			name={question.id}
			value={(value as string) || ''}
			placeholder={question.placeholder || ''}
			required={question.required}
			oninput={(v) => onchange(question.id, v)}
		/>
	{/if}
</div>
