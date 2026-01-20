<script lang="ts">
	interface Props {
		type?: 'text' | 'email';
		name: string;
		value: string;
		placeholder?: string;
		required?: boolean;
		oninput: (value: string) => void;
	}

	let {
		type = 'text',
		name,
		value = '',
		placeholder = '',
		required = false,
		oninput
	}: Props = $props();
</script>

<input
	{type}
	{name}
	{value}
	{placeholder}
	{required}
	oninput={(e) => oninput(e.currentTarget.value)}
	class="w-full rounded-xl border-2 border-gray-700 bg-gray-800/50 px-4 py-3 text-gray-200 placeholder-gray-500
		transition-all duration-200 focus:border-indigo-500 focus:ring-2
		focus:ring-indigo-500/20 focus:outline-none"
/>
