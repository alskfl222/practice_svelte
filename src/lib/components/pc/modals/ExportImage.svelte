<script lang="ts">
	import html2canvas from 'html2canvas';
	import { store } from '$stores';

	let innerHTML;

	function exportImg() {}
</script>

{#if $store.length > 0}
	{#each $store as char}
    <div>{char.name}</div>
  {/each}
{:else}
	<div>추가된 캐릭터가 없습니다</div>
{/if}
