<script lang="ts">
	interface Props {
		variant?: 'default' | 'glass' | 'gradient';
		padding?: 'sm' | 'md' | 'lg';
		class?: string;
		onclick?: () => void;
		hoverable?: boolean;
	}

	let {
		variant = 'default',
		padding = 'md',
		class: className = '',
		onclick,
		hoverable = false,
		children
	}: Props & { children?: any } = $props();

	const baseStyles = 'rounded-2xl transition-all duration-300';

	const variantStyles = {
		default: 'bg-gray-800/50 border border-gray-700/50',
		glass: 'bg-white/5 backdrop-blur-lg border border-white/10',
		gradient: 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50'
	};

	const paddingStyles = {
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};

	const hoverStyles = hoverable
		? 'cursor-pointer hover:scale-[1.02] hover:shadow-xl hover:border-indigo-500/50'
		: '';
</script>

<div
	class="{baseStyles} {variantStyles[variant]} {paddingStyles[padding]} {hoverStyles} {className}"
	{onclick}
	role={onclick ? 'button' : undefined}
	tabindex={onclick ? 0 : undefined}
	onkeydown={(e) => {
		if (onclick && (e.key === 'Enter' || e.key === ' ')) {
			e.preventDefault();
			onclick();
		}
	}}
>
	{@render children?.()}
</div>
