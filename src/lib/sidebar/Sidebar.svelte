<script lang="ts">
  import BossSelector from '$lib/components/BossSelector.svelte';
	import BossCounter from '$lib/components/BossCounter.svelte';
	import { charIndex } from '../../stores';
</script>

<div class="min-w-[240px] border p-4">
	{#if $charIndex !== undefined}
		<BossSelector />
    {:else}
    <BossCounter />
	{/if}
</div>
