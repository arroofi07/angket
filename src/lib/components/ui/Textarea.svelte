<script lang="ts">
	interface Props {
		name: string;
		value: string;
		placeholder?: string;
		required?: boolean;
		rows?: number;
		oninput: (value: string) => void;
	}

	let { name, value = '', placeholder = '', required = false, rows = 4, oninput }: Props = $props();
</script>

<textarea
	{name}
	{placeholder}
	{required}
	{rows}
	oninput={(e) => oninput(e.currentTarget.value)}
	class="w-full resize-none rounded-xl border-2 border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-200
		placeholder-gray-500 transition-all duration-200 focus:border-indigo-500
		focus:ring-2 focus:ring-indigo-500/20 focus:outline-none">{value}</textarea
>
