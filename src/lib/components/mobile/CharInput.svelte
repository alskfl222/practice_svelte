<script lang="ts">
	import Title from './common/Title.svelte';
	import Button from './common/Button.svelte';
	import { store, classInfo } from '$stores';
	import type { CharBossType } from '$types';

	let charName: string = '';
	let charClass: keyof typeof classInfo | '' = '';

	function addChar() {
		const newInfo: CharBossType = {
			name: charName,
			class: charClass as keyof typeof classInfo,
			boss: []
		};
		store.update((data) => {
			const newStore = [...data, newInfo];
			localStorage.setItem('prev', JSON.stringify(newStore));
			return newStore;
		});
		charName = '';
		charClass = '';
	}

	$: isValid = () => {
		const byteLength = new TextEncoder().encode(charName).length;
		const isCharNameValid =
			charName.length >= 2 && byteLength >= 4 && charName.length <= 12 && byteLength <= 18;
		const isCharClassValid = charClass !== '';
		return isCharNameValid && isCharClassValid;
	};
</script>

<div class="px-4 pb-8 flex flex-col justify-between">
	<Title type="s">캐릭터 추가</Title>
	<div class="px-4 py-0 flex flex-col justify-between items-center gap-8">
		<div class="relative w-full flex flex-col items-center gap-6">
			<input
				bind:value={charName}
				class="w-[70%] px-4 py-1 border-b border-slate-700"
				placeholder="이름을 입력해주세요"
			/>
			<select
				bind:value={charClass}
				class="w-[70%] px-4 py-1 border rounded-lg border-slate-700"
				required
			>
				<option value="" disabled selected hidden>직업</option>
				{#each Object.keys(classInfo) as className}
					<option value={className}>{className}</option>
				{/each}
			</select>
		</div>
		{#if isValid()}
			<Button on:click={addChar}>
				<span slot="text"><i class="fa-solid fa-user-plus fa-xl" /></span>
			</Button>
		{:else}
			<Button disabled popup>
				<span slot="text"><i class="fa-solid fa-user-plus fa-xl" /></span>
				<div slot="popup">
					<p class="whitespace-nowrap">이름과 직업을</p>
					<p class="whitespace-nowrap">확인해주세요</p>
				</div>
			</Button>
		{/if}
	</div>
</div>
