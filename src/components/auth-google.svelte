<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';
</script>

<p class="flex flex-col">
	{#if $page.data.session?.user}
		<div class="flex flex-row items-center gap-2 flex-wrap">
			<button
				on:click={() => signOut()}
				class="bg-red-400 text-zinc-900 rounded-full placeholder-cyan-200 px-5 py-1"
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
			class="text-sm bg-white text-zinc-900 px-5 py-1 rounded-full flex items-center gap-2"
			>Sign In with <img
				src="/google-icon.svg"
				alt="google icons"
				width="30px"
				height="30px"
			/></button
		>
	{/if}
</p>
