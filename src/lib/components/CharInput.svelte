<script lang="ts">
	import Title from './common/Title.svelte';
	import { store, classInfo } from '../../stores';
	import type { CharBoss } from '../../types';

	let charName: string = '';
	let charClass: keyof typeof classInfo | '' = '';

	function addChar() {
		if (isActive) {
			const newInfo: CharBoss = { name: charName, class: charClass, boss: [] };
			store.update((data) => [...data, newInfo]);
			charName = '';
			charClass = '';
		}
	}

	$: isActive = charName && charClass ? true : false;
	$: buttonStyle = isActive
		? 'w-[90px] p-2 border rounded-full bg-gradient-to-r from-sky-500 to-indigo-500	text-white'
		: 'w-[90px] p-2 border rounded-full bg-slate-500 text-white';
</script>

<div class="p-8 pt-0 flex flex-col justify-between">
	<Title text="캐릭터 추가" type="s" />
	<div class="px-4 py-0 flex justify-between">
		<div class="flex gap-16">
			<input
				bind:value={charName}
				class="w-[300px] p-1 border-b"
				placeholder="캐릭터 이름을 입력해주세요"
			/>
			<select bind:value={charClass} class="w-[120px] p-1 border" required>
				<option value="" disabled selected hidden>직업</option>
				{#each Object.keys(classInfo) as className}
					<option value={className}>{className}</option>
				{/each}
			</select>
		</div>
		<button on:click={addChar} class={buttonStyle}><i class="fa-solid fa-user-plus fa-xl" /></button
		>
	</div>
</div>
