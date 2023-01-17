<script lang="ts">
	export let value: boolean;
</script>

<label class="relative">
	<input type="checkbox" bind:checked={value} class="sr-only peer" />
	<div
		class="w-7 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 
          after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:w-3 after:h-3 
          after:border after:border-gray-300  after:rounded-full after:bg-white after:transition-all
          peer-checked:bg-neutral-400 peer-checked:after:translate-x-full peer-checked:after:border-white"
	/>
</label>
