<script lang="ts">
	import { store, charIndex } from '../../stores';

	function changeChar(idx: number) {
		$charIndex = idx;
	}
	function deleteChar(idx: number) {
		$store = [...$store.slice(0, idx), ...$store.slice(idx + 1)];
		$charIndex === undefined;
	}
</script>

<div class="grid grid-cols-3 gap-4">
	{#each $store as char, idx}
		<div
			class={idx === $charIndex
				? 'bg-gradient-to-r from-cyan-500 to-blue-500 rounded'
				: 'border rounded border-cyan-500'}
			on:click={() => changeChar(idx)}
		>
			<div class="p-4 flex justify-between">
				<div class="flex gap-2">
					<span>{char.name || '이름 없음'}</span>
					<span>{char.class || '직업 없음'}</span>
				</div>
				<button on:click={() => deleteChar(idx)}>삭제</button>
			</div>
		</div>
	{/each}
</div>
