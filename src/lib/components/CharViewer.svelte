<script lang="ts">
	import { classInfo } from '$stores';
	import { data, char, charArr } from '$stores/item';

	let value: string = '';

	function deselectChar() {
		value = '';
	}
	function deleteChar() {
		$data = $data.filter((item) => item.char.name !== $char.name);
		deselectChar();
	}

	$: if (value) {
		const charInfo = value.split('-');
		$char.name = charInfo[0];
		$char.class = charInfo[1];
		$char.group = classInfo[charInfo[1]].group;
	} else {
		($char.name = ''), ($char.class = ''), ($char.group = '');
	}
</script>

<div class="py-4 flex flex-col gap-4">
	{#if !$char.name}
		<p class="self-center text-lg">캐릭터를 선택해주세요</p>
	{:else}
		<div class="flex flex-col sm:flex-row justify-between items-center gap-2">
			<p class="flex flex-col gap-2 xs:flex-row xs:gap-4 items-center">
				<span class="text-lg font-bold sm:text-2xl">{$char.name}</span>
				<span class="sm:text-xl">{$char.class}</span>
			</p>
			<div>
				<button class="p-2 border rounded-xl  hover:bg-slate-300" on:click={deselectChar}
					>해제</button
				>
				<button class="p-2 border rounded-xl  hover:bg-slate-300" on:click={deleteChar}>삭제</button
				>
			</div>
		</div>
	{/if}
	<select
		bind:value
		class="self-center w-[100%] max-w-[240px] p-4 border rounded-lg border-slate-700"
		required
	>
		<option value="" disabled selected hidden>캐릭터 - 직업</option>
		{#each $charArr as char}
			<option value={`${char.name}-${char.class}`}>{char.name} - {char.class}</option>
		{/each}
	</select>
</div>
