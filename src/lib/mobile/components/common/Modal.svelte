<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';

	export let isOpen: boolean = false;
	const dispatch = createEventDispatcher();

	function onClose() {
		dispatch('close');
	}
</script>

{#if isOpen}
	<div
		class="fixed top-0 left-0 z-50 w-screen h-screen
            flex justify-center"
	>
		<div class="z-40 w-[360px] h-[270px] mt-24 bg-white">
			<Button on:click={onClose}>닫기</Button>
		</div>
    <div class="absolute w-full h-full bg-black opacity-30" />
	</div>
{/if}
