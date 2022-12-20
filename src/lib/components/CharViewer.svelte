<script lang="ts">
	import { onDestroy } from 'svelte';
	import { store, charIndex } from '../../stores';

	let charContainer: HTMLDivElement;
	let charScroll: HTMLElement;

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
		charScroll.style.left = '0px';
	}

	$: dragChar = (node: HTMLElement) => {
		let moving = false;
		let x = 0;
		const minX = 0;
		const maxX = $store.length * (270 + 16) - 904;

		node.style.position = 'relative';
		node.style.left = `${x}px`;
		node.style.userSelect = 'none';

		node.addEventListener('mousedown', () => {
			moving = true;
		});
		window.addEventListener('mousemove', (e) => {
			if (!moving) return;
			e.preventDefault();
			x += e.movementX;
			if (minX < maxX) {
				if (x > minX) x = 0;
				if (x < -maxX) x = -maxX;
				node.style.left = `${x}px`;
			}
		});
		window.addEventListener('mouseup', () => {
			moving = false;
		});

		onDestroy(() => {
			window.addEventListener('mousemove', (e) => {
				if (moving) {
					x += e.movementX;
					if (minX < maxX) {
						if (x > minX) x = 0;
						if (x < -maxX) x = -maxX;
						node.style.left = `${x}px`;
					}
				}
			});
			window.addEventListener('mouseup', () => {
				moving = false;
			});
		});
	};
</script>

<div
	class="w-[904px] flex flex-col overflow-hidden"
	bind:this={charContainer}
	on:click={(e) => selectChar(e, -1)}
>
	<div class="p-4 font-bold">
		{#if $charIndex === undefined}
			<div>
				{$store.length} 캐릭터
			</div>
		{:else}
			<div>{$store[$charIndex].name} {$store[$charIndex].class}</div>{/if}
	</div>
	<div class="p-2 flex gap-4" bind:this={charScroll} use:dragChar>
		{#each $store as char, idx}
			<div
				class={idx === $charIndex
					? 'w-[270px] flex-none bg-gradient-to-r from-cyan-500 to-blue-500 rounded'
					: 'w-[270px] flex-none border rounded border-cyan-500'}
			>
				<div class="p-4 flex justify-between" on:click|stopPropagation={(e) => selectChar(e, idx)}>
					<div class="flex gap-2">
						<span>{char.name}</span>
						<span>{char.class}</span>
					</div>
					<button on:click|stopPropagation={() => deleteChar(idx)}>삭제</button>
				</div>
			</div>
		{/each}
	</div>
</div>
