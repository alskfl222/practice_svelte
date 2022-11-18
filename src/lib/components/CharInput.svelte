<script lang="ts">
	import { store, classInfo } from '../../stores';
	import type { CharBoss } from '../../types';

	let charName: string = '';
	let charClass: keyof typeof classInfo | '' = '';

	function addChar() {
		const newInfo: CharBoss = { boss: [] };
		newInfo.name = charName;
		newInfo.class = charClass;
		store.update((data) => [...data, newInfo]);
		charName = '';
		charClass = '';
	}
</script>

<section class="flex justify-between">
	<div class="flex gap-10">
		<input bind:value={charName} class="w-[300px] p-1 border-b" placeholder="캐릭터 이름을 입력해주세요" />
		<select bind:value={charClass} class="w-[120px] p-1 border" required>
			<option value='' disabled selected hidden>직업</option>
			{#each Object.keys(classInfo) as className}
				<option value={className}>{className}</option>
			{/each}
		</select>
	</div>
	<button on:click={addChar}>추가</button>
</section>
