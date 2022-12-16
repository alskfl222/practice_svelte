<script lang="ts">
	import { store, charIndex } from '../../stores';

	let charContainer: HTMLDivElement;

	function selectChar(e: MouseEvent, idx: number) {
		const el = e.target as HTMLDivElement;
		if (charContainer.contains(el) && idx !== -1) {
			$charIndex = idx;
		} else {
			$charIndex = undefined;
		}
	}
	function deleteChar(idx: number) {
		$store = [...$store.slice(0, idx), ...$store.slice(idx + 1)];
		$charIndex = undefined;
	}
</script>

<div class="flex flex-col" bind:this={charContainer} on:click={(e) => selectChar(e, -1)}>
	<div class="p-4 font-bold">
		{#if $charIndex === undefined}
			<div>
				{$store.length} 캐릭터
			</div>
		{:else}
			<div>{$store[$charIndex].name} {$store[$charIndex].class}</div>{/if}
	</div>
	<div class="p-2 flex gap-4">
		{#each $store as char, idx}
			<div
				class={idx === $charIndex
					? 'w-[180px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded'
					: 'w-[180px] border rounded border-cyan-500'}
			>
				<div class="p-4 flex justify-between" on:click|stopPropagation={(e) => selectChar(e, idx)}>
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
