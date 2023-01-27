<script lang="ts">
	import { data, order, char, charArr } from '$stores';
	import type { CharItemType } from '$types';

	function deselectChar() {
		$char = {
			name: '',
			class: '',
			group: ''
		};
	}

	function deleteChar() {
		$data = $data.filter((item) => item.char.name !== $char.name);
		$order = $order.filter((name) => name !== $char.name);
		localStorage.setItem('prev', JSON.stringify($data));
		deselectChar();
	}

	function selectChar(charItem: CharItemType) {
		$char = charItem;
	}

	$: isSelected = (charItem: CharItemType) => {
		return $char.name === charItem.name;
	};
</script>

<div class="py-4 flex flex-col gap-4">
	<div
		class="min-h-[45px] flex flex-col sm:px-8 sm:flex-row justify-center items-center gap-2 sm:gap-6"
	>
		<p class="flex flex-col gap-2 xs:flex-row xs:gap-4 items-center">
			<span class="text-xl font-bold sm:text-3xl dark:text-neutral-200">{$char.name || '선택해주세요'}</span>
			<span class="text-lg sm:text-2xl dark:text-neutral-200">{$char.class || '직업'}</span>
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

	<div class="max-h-[200px] grid grid-cols-2 gap-2 overflow-y-auto">
		{#each $charArr as char}
			<div
				class="w-full h-full px-2 py-4 flex flex-col border border-white gap-2 rounded-xl shadow-lg"
				class:border-red-500={isSelected(char)}
				on:click={() => selectChar(char)}
			>
				<div class="text-lg overflow-hidden whitespace-nowrap text-ellipsis">
					{char.name}
				</div>
				<div class="overflow-hidden whitespace-nowrap text-ellipsis">{char.class}</div>
			</div>
		{/each}
	</div>
</div>
