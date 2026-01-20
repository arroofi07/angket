<script lang="ts">
	interface Props {
		name: string;
		options: string[];
		values: string[];
		onchange: (value: string) => void;
	}

	let { name, options, values = [], onchange }: Props = $props();
</script>

<div class="space-y-3">
	{#each options as option}
		<label
			class="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all duration-200
				{values.includes(option)
				? 'border-2 border-indigo-500 bg-indigo-500/20 shadow-lg shadow-indigo-500/20'
				: 'border-2 border-transparent bg-gray-800/50 hover:border-gray-600 hover:bg-gray-700/50'}"
		>
			<input
				type="checkbox"
				{name}
				value={option}
				checked={values.includes(option)}
				onchange={() => onchange(option)}
				class="h-5 w-5 rounded border-gray-600 bg-gray-700 text-indigo-500 focus:ring-2 focus:ring-indigo-500"
			/>
			<span class="text-gray-200">{option}</span>
		</label>
	{/each}
</div>
