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
	// $: console.log($char.name);
	// $: console.log($data);
</script>

<div class="py-4 flex flex-col gap-4">
	{#if !$char.name}
		<p>캐릭터를 선택해주세요</p>
	{:else}
		<div class="flex justify-between">
			<p>{$char.name} {$char.class}</p>
			<div>
				<button on:click={deselectChar}>해제</button>
				<button on:click={deleteChar}>삭제</button>
			</div>
		</div>
	{/if}
	<select
		bind:value
		class="w-[100%] max-w-[240px] px-4 py-2 border rounded-lg border-slate-700"
		required
	>
		<option value="" disabled selected hidden>캐릭터 - 직업</option>
		{#each $charArr as char}
			<option value={`${char.name}-${char.class}`}>{char.name} - {char.class}</option>
		{/each}
	</select>
</div>
