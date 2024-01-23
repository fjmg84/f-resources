<script>
	import '../app.css';
	import AuthGoogle from '../components/auth-google.svelte';
</script>

<header class="flex justify-between p-5 lg:p-10 flex-wrap gap-5">
	<h1 class="text-5xl font-extrabold flex items-end md:items-start flex-wrap">
		Welcome to <span
			class="underline text-5xl ml-2 mr-2 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent"
		>
			RESOURCES
		</span>
		<span class="text-sm font-thin">(fjmg)</span>
	</h1>

	<div class="flex flex-col md:flex-nowrap gap-3 items-center justify-center">
		<a href="https://github.com/fjmg84/f-resources" class="flex items-center gap-2">
			<span class="text-nowrap font-semibold text-sm">Source code:</span>
			<div
				class="bg-zinc-800 p-2 rounded-full transition-all duration-300 ease-linear hover:bg-zinc-500"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"
					><path
						d="M20.38 8.53c.16-.4.68-1.99-.17-4.14c0 0-1.31-.39-4.3 1.61c-1.25-.33-2.58-.38-3.91-.38c-1.32 0-2.66.05-3.91.38c-2.99-2.03-4.3-1.61-4.3-1.61c-.85 2.15-.33 3.74-.16 4.14C2.61 9.62 2 11 2 12.72c0 6.44 4.16 7.89 10 7.89c5.79 0 10-1.45 10-7.89c0-1.72-.61-3.1-1.62-4.19M12 19.38c-4.12 0-7.47-.19-7.47-4.19c0-.95.47-1.85 1.27-2.58c1.34-1.23 3.63-.58 6.2-.58c2.59 0 4.85-.65 6.2.58c.8.73 1.3 1.62 1.3 2.58c0 3.99-3.37 4.19-7.5 4.19m-3.14-6.26c-.82 0-1.5 1-1.5 2.22c0 1.23.68 2.24 1.5 2.24c.83 0 1.5-1 1.5-2.24c0-1.23-.67-2.22-1.5-2.22m6.28 0c-.83 0-1.5.99-1.5 2.22c0 1.24.67 2.24 1.5 2.24c.82 0 1.5-1 1.5-2.24c0-1.23-.64-2.22-1.5-2.22z"
						fill="currentColor"
					/></svg
				>
			</div>
		</a>

		<AuthGoogle />
	</div>
</header>

<main class="flex flex-col justify-center p-5 lg:p-10 gap-10">
	<slot />
</main>

<footer class="flex items-center justify-center m-10">
	<a href="https://portafolio-fjmg84.vercel.app/" class="font-light text-sm text-zinc-400"
		>developed and designed by: <span class="font-bold">fjmg84</span></a
	>
</footer>
