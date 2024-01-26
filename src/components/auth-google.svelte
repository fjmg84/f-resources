<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<p class="flex flex-col">
	{#if $page.data.session?.user}
		<div class="flex flex-row items-center gap-2 flex-wrap">
			<button
				on:click={() => signOut()}
				class="flex items-center gap-2 text-zinc-800 bg-white py-2 px-5 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-linear"
			>
				<picture class="flex items-center gap-2">
					<p class="text-sm">{$page.data.session.user?.name}</p>
					<img src={$page.data.session.user.image ?? ''} alt="avatar" width="30px" height="30px" />
				</picture>
			</button>
		</div>
	{:else}
		<button
			on:click={() => signIn('google')}
			class="flex items-center gap-2 text-zinc-800 bg-white py-2 px-5 rounded-full hover:bg-zinc-800 hover:text-white transition-all duration-300 ease-linear"
			>Sign in with <img
				src="/google-icon.svg"
				alt="google icons"
				width="30px"
				height="30px"
			/></button
		>
	{/if}
</p>
