<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
	<title>Survei Pra-Penelitian | Asisten Kampus AI</title>
	<meta
		name="description"
		content="Survei untuk pengembangan sistem Asisten Kampus berbasis AI untuk mahasiswa Universitas Bung Hatta"
	/>
</svelte:head>

<!-- Background decorations -->
<div class="bg-decoration bg-decoration-1"></div>
<div class="bg-decoration bg-decoration-2"></div>

<div class="min-h-screen">
	{@render children()}
</div>
