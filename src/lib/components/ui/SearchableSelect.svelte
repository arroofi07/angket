<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		name: string;
		options: string[];
		value: string | undefined;
		onchange: (value: string) => void;
		placeholder?: string;
		required?: boolean;
	}

	let {
		name,
		options,
		value,
		onchange,
		placeholder = 'Pilih atau ketik untuk mencari...',
		required = false
	}: Props = $props();

	let isOpen = $state(false);
	let searchText = $state('');
	let highlightedIndex = $state(0);
	let inputRef: HTMLInputElement;
	let containerRef: HTMLDivElement;

	const filteredOptions = $derived(
		searchText === ''
			? options
			: options.filter((opt) => opt.toLowerCase().includes(searchText.toLowerCase()))
	);

	// Get display value for input
	const displayValue = $derived(isOpen ? searchText : value || '');

	function handleSelect(option: string) {
		onchange(option);
		searchText = '';
		isOpen = false;
		inputRef?.blur();
	}

	function handleInputFocus() {
		isOpen = true;
		searchText = '';
		highlightedIndex = value ? options.indexOf(value) : 0;
		if (highlightedIndex < 0) highlightedIndex = 0;
	}

	function handleInputBlur(e: FocusEvent) {
		// Delay to allow click on dropdown item
		setTimeout(() => {
			isOpen = false;
			searchText = '';
		}, 200);
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!isOpen) {
			if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
				isOpen = true;
				e.preventDefault();
			}
			return;
		}

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				highlightedIndex = Math.max(highlightedIndex - 1, 0);
				break;
			case 'Enter':
				e.preventDefault();
				if (filteredOptions[highlightedIndex]) {
					handleSelect(filteredOptions[highlightedIndex]);
				}
				break;
			case 'Escape':
				isOpen = false;
				searchText = '';
				inputRef?.blur();
				break;
			case 'Tab':
				isOpen = false;
				searchText = '';
				break;
		}
	}

	// Reset highlighted index when search changes
	$effect(() => {
		if (searchText) {
			highlightedIndex = 0;
		}
	});

	// Click outside to close
	onMount(() => {
		function handleClickOutside(e: MouseEvent) {
			if (containerRef && !containerRef.contains(e.target as Node)) {
				isOpen = false;
				searchText = '';
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	});
</script>

<div class="relative" bind:this={containerRef}>
	<!-- Selected Value Display / Search Input -->
	<div class="relative">
		<input
			bind:this={inputRef}
			type="text"
			{name}
			{required}
			value={displayValue}
			placeholder={value ? value : placeholder}
			oninput={(e) => {
				searchText = e.currentTarget.value;
				isOpen = true;
			}}
			onfocus={handleInputFocus}
			onblur={handleInputBlur}
			onkeydown={handleKeyDown}
			autocomplete="off"
			class="w-full cursor-pointer rounded-xl border-2 bg-gray-800/50 px-4 py-3 pr-10 text-gray-200
				placeholder-gray-500 transition-all duration-200
				{value && !isOpen
				? 'border-indigo-500 bg-indigo-500/10'
				: 'border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'}"
		/>

		<!-- Clear button (when value selected) -->
		{#if value && !isOpen}
			<button
				type="button"
				tabindex={-1}
				aria-label="Clear selection"
				class="absolute top-1/2 right-10 -translate-y-1/2 text-gray-400 transition-colors hover:text-red-400"
				onclick={(e) => {
					e.stopPropagation();
					onchange('');
				}}
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		{/if}

		<!-- Dropdown Icon -->
		<button
			type="button"
			tabindex={-1}
			aria-label="Toggle dropdown"
			class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-300"
			onclick={() => {
				if (!isOpen) {
					isOpen = true;
					inputRef?.focus();
				} else {
					isOpen = false;
				}
			}}
		>
			<svg
				class="h-5 w-5 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
			</svg>
		</button>
	</div>

	<!-- Dropdown Menu -->
	{#if isOpen}
		<div
			class="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-gray-700 bg-gray-800 shadow-xl"
		>
			{#if filteredOptions.length === 0}
				<div class="px-4 py-3 text-sm text-gray-500">
					Tidak ditemukan hasil untuk "{searchText}"
				</div>
			{:else}
				{#each filteredOptions as option, i}
					<button
						type="button"
						class="w-full px-4 py-3 text-left transition-colors
							{i === highlightedIndex ? 'bg-indigo-500/20 text-indigo-300' : 'text-gray-300 hover:bg-gray-700/50'}
							{option === value ? 'bg-indigo-500/30 font-medium text-indigo-300' : ''}"
						onmousedown={(e) => {
							e.preventDefault();
							handleSelect(option);
						}}
						onmouseenter={() => (highlightedIndex = i)}
					>
						<div class="flex items-center justify-between">
							<span>{option}</span>
							{#if option === value}
								<svg class="h-5 w-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
									<path
										fill-rule="evenodd"
										d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
										clip-rule="evenodd"
									/>
								</svg>
							{/if}
						</div>
					</button>
				{/each}
			{/if}
		</div>
	{/if}
</div>
