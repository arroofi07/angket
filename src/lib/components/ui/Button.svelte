<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		type?: 'button' | 'submit';
		class?: string;
		onclick?: () => void;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		class: className = '',
		onclick,
		children
	}: Props & { children?: any } = $props();

	const baseStyles =
		'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

	const variantStyles = {
		primary:
			'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 shadow-lg hover:shadow-xl',
		secondary:
			'bg-gray-800 text-white hover:bg-gray-700 focus:ring-gray-500',
		outline:
			'border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 focus:ring-indigo-500',
		ghost:
			'text-gray-300 hover:bg-gray-800 focus:ring-gray-500'
	};

	const sizeStyles = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg'
	};
</script>

<button
	{type}
	{disabled}
	class="{baseStyles} {variantStyles[variant]} {sizeStyles[size]} {className}"
	{onclick}
>
	{@render children?.()}
</button>
