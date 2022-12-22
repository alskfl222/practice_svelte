<script lang="ts">
	import { store, charIndex } from '../../stores';

	let charContainer: HTMLElement;
	let charScroll: HTMLElement;

	function selectChar(e: MouseEvent) {
		const el = e.target as HTMLElement;
		if (el.getAttribute('data-index')) {
			const idx = parseInt(el.getAttribute('data-index')!);
			$charIndex = idx;
			return;
		}
		$charIndex = undefined;
	}
	function deleteChar(idx: number) {
		$store = [...$store.slice(0, idx), ...$store.slice(idx + 1)];
		$charIndex = undefined;
		charScroll.style.left = '0px';
	}

	function dragEl(node: HTMLElement) {
		let moving = false;
		let x = 0;
		const minX = 0;

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
	}

	$: maxX = $store.length * (270 + 16) - (904 - 32 * 2);
</script>

<div
	class="pb-8 flex flex-col overflow-hidden"
	bind:this={charContainer}
	on:click|stopPropagation={(e) => selectChar(e)}
>
	<div class="w-[830px] p-2 flex gap-4" bind:this={charScroll} use:dragEl>
		{#each $store as char, idx}
			<div
				class={idx === $charIndex
					? 'w-[270px] flex-none border rounded border-white bg-gradient-to-r from-cyan-500 to-blue-500 '
					: 'w-[270px] flex-none border rounded border-cyan-500'}
			>
				<div class="p-4 flex justify-between" data-index={idx}>
					<div
						class={idx === $charIndex
							? 'flex gap-2 text-lg font-bold text-slate-100'
							: 'flex gap-2 text-lg font-bold text-slate-700'}
						data-index={idx}
					>
						<span data-index={idx}>{char.name}</span>
						<span data-index={idx}>{char.class}</span>
					</div>
					<button
						class={idx === $charIndex ? 'text-slate-100' : 'text-slate-700'}
						on:click|stopPropagation={() => deleteChar(idx)}>삭제</button
					>
				</div>
			</div>
		{/each}
	</div>
</div>
