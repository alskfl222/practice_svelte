<script lang="ts">
	import { store, charIndex } from '../../stores';

	let charContainer: HTMLDivElement;

	function selectChar(e: MouseEvent) {
		const el = e.target as HTMLDivElement;
		const value = el.getAttribute('data-value')
		if (charContainer.contains(el) && value) {
			$charIndex = parseInt(value, 10);
		} else {
			$charIndex = undefined;
		}
	}
	function deleteChar(idx: number) {
		$store = [...$store.slice(0, idx), ...$store.slice(idx + 1)];
		$charIndex = undefined;
	}
</script>

<div class="flex flex-col" bind:this={charContainer} on:click={(e) => selectChar(e)}>
	<div>{$store.length} 캐릭터</div>
	<div class="grid grid-cols-3 gap-4">
		{#each $store as char, idx}
			<div
				class={idx === $charIndex
					? 'bg-gradient-to-r from-cyan-500 to-blue-500 rounded'
					: 'border rounded border-cyan-500'}
			>
				<div class="p-4 flex justify-between" data-value={idx}>
					<div class="flex gap-2">
						<span>{char.name || '이름 없음'}</span>
						<span>{char.class || '직업 없음'}</span>
					</div>
					<button on:click|stopPropagation={() => deleteChar(idx)}>삭제</button>
				</div>
			</div>
		{/each}
	</div>
</div>
