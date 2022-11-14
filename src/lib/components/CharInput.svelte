<script lang="ts">
	import { store, classInfo } from '../../stores';
	import type { CharBoss } from '../../types';

	let charName: string = '';
	let charClass: keyof typeof classInfo | '' = '';

	function addChar() {
		const newInfo: CharBoss = { boss: [] };
		newInfo.name = charName;
		newInfo.class = charClass;
		store.update(data => [...data, newInfo]);
		charName = '';
		charClass = '';
	}
</script>

<section>
	<input bind:value={charName} />
	<select bind:value={charClass}>
		{#each Object.keys(classInfo) as className}
			<option value={className}>{className}</option>
		{/each}
	</select>
	<button on:click={addChar}>추가</button>
</section>

<style lang="scss">
	input {
		border: 1px solid black;
	}
</style>
