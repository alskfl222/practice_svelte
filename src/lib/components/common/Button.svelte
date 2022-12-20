<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let disabled: boolean = false;
	export let text: string = '';

	const onClick = () => {
		dispatch('click');
	};

	$: buttonStyle = disabled
		? 'w-full p-2 rounded-xl bg-slate-500 hover:bg-slate-700 text-white'
		: 'w-full p-2 rounded-xl bg-white hover:bg-slate-300';
</script>

<div class="w-full border">
	<button class={buttonStyle} {disabled} on:click={onClick}>
		{text}
	</button>
</div>
