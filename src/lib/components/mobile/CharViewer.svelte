<script lang="ts">
	import { store, charIndex } from '$stores';

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
		let startX = 0;

		node.style.position = 'relative';
		node.style.left = `${x}px`;
		node.style.userSelect = 'none';

		node.addEventListener('touchstart', (e) => {
			moving = true;
			startX = e.touches[0].clientX;
		});
		window.addEventListener('touchmove', (e) => {
			if (!moving) return;
			let moveX = e.touches[0].clientX - startX;
			x += moveX;
			if (minX < maxX) {
				if (x > minX) x = 0;
				if (x < -maxX) x = -maxX;
				node.style.left = `${x}px`;
			}
		});
		window.addEventListener('touchend', () => {
			moving = false;
		});
	}

	$: maxX = 0;
	$: if (charScroll) {
		maxX = $store.length * (160 + 16) - charScroll.offsetWidth;
	}
</script>

<div
	class="pb-8 flex flex-col overflow-hidden"
	bind:this={charContainer}
	on:click|stopPropagation={(e) => selectChar(e)}
>
	<div class="w-full p-2 flex gap-4" bind:this={charScroll} use:dragEl>
		{#each $store as char, idx}
			<div
				class={idx === $charIndex
					? 'w-[20%] min-w-[160px] flex-none border rounded-lg border-white bg-gradient-to-r from-cyan-500 to-blue-500 '
					: 'w-[20%] min-w-[160px] flex-none border rounded-lg border-cyan-500'}
			>
				<div class="px-4 py-3 flex justify-between" data-index={idx}>
					<div
						class={idx === $charIndex
							? 'flex gap-2 font-bold text-slate-100'
							: 'flex gap-2 font-bold text-slate-700'}
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
