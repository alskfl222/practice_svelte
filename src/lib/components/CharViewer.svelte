<script lang="ts">
	import { classInfo } from '$stores';
	import { data, order, char, charArr } from '$stores';

	let value: string = '';

	function deselectChar() {
		value = '';
	}
	function deleteChar() {
		$data = $data.filter((item) => item.char.name !== $char.name);
		$order = $order.filter((name) => name !== $char.name);
		localStorage.setItem('prev', JSON.stringify($data));
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
		<p class="self-center h-[45px] text-lg xs:text-xl xs:font-bold sm:text-2xl dark:text-neutral-200">캐릭터를 선택해주세요</p>
	{:else}
		<div
			class="min-h-[45px] flex flex-col sm:px-8 sm:flex-row justify-center items-center gap-2 sm:gap-6"
		>
			<p class="flex flex-col gap-2 xs:flex-row xs:gap-4 items-center">
				<span class="text-xl font-bold sm:text-3xl dark:text-neutral-200">{$char.name}</span>
				<span class="text-lg sm:text-2xl dark:text-neutral-200">{$char.class}</span>
			</p>
			<div>
				<button
					class="p-2 border rounded-xl dark:text-neutral-200 hover:bg-neutral-300 hover:dark:text-neutral-700"
					on:click={deselectChar}>해제</button
				>
				<button
					class="p-2 border rounded-xl dark:text-neutral-200 hover:bg-neutral-300 hover:dark:text-neutral-700"
					on:click={deleteChar}>삭제</button
				>
			</div>
		</div>
	{/if}
	<select
		bind:value
		class="self-center w-[100%] max-w-[240px] p-4 border rounded-lg border-neutral-700 dark:border-neutral-200"
		required
	>
		<option value="" disabled selected hidden>캐릭터 - 직업</option>
		{#each $charArr as char}
			<option value={`${char.name}-${char.class}`}>{char.name} - {char.class}</option>
		{/each}
	</select>
</div>
