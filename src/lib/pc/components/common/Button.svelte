<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Popup from './Popup.svelte';
	const dispatch = createEventDispatcher();

	export let disabled: boolean = false;
	export let popup: boolean = false;
	let isPopupOpen: boolean = false;

	function onMouseEnter() {
		isPopupOpen = true;
	}
	function onMouseLeave() {
		isPopupOpen = false;
	}
	function onClick() {
		dispatch('click');
	}

	$: buttonStyle = disabled
		? 'w-full p-2 rounded-xl border border-slate-700 bg-slate-700 text-white'
		: 'w-full p-2 border border-slate-700 rounded-xl bg-white hover:bg-slate-300';
</script>

<div class="relative w-[160px]" on:mouseenter={onMouseEnter} on:mouseleave={onMouseLeave}>
	<button class={buttonStyle} {disabled} on:click={onClick}>
		<slot name="text" />
	</button>
	{#if popup && isPopupOpen}
		<Popup>
			<slot name="popup" />
		</Popup>
	{/if}
</div>
