<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let disabled: boolean = false;

	const onClick = () => {
		dispatch('click');
	};

	$: buttonStyle = disabled
		? 'w-full p-2 rounded-xl bg-slate-500 text-white'
		: 'w-full p-2 border border-black rounded-xl bg-white hover:bg-slate-300';
</script>

<div class="w-[160px]">
	<button class={buttonStyle} {disabled} on:click={onClick}>
		<slot />
	</button>
</div>
