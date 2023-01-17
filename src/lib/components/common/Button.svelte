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
	const baseStyle = 'w-full p-2 border border-neutral-700 dark:border-neutral-400 ';

	$: buttonStyle = disabled
		? baseStyle + 'rounded-xl bg-neutral-700 text-white'
		: baseStyle + 'rounded-xl bg-neutral-200 hover:bg-neutral-300 dark:text-neutral-800';
</script>

<div
	class="relative grow-[1] max-w-[200px]"
	on:mouseenter={onMouseEnter}
	on:mouseleave={onMouseLeave}
>
	<button class={buttonStyle} {disabled} on:click={onClick}>
		<slot name="text" />
	</button>
	{#if popup && isPopupOpen}
		<Popup>
			<slot name="popup" />
		</Popup>
	{/if}
</div>
