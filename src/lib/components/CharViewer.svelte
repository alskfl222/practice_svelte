<script lang="ts">
	import { browser } from '$app/env';
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
	$: innerWidth = browser ? window.innerWidth : 280;
	$: charWidth = innerWidth >= 768 ? 270 : 200;
	$: maxX = charScroll ? $store.length * (charWidth + 16) - charScroll.offsetWidth : 0;
</script>

<div
	class="pb-8 flex flex-col overflow-hidden"
	bind:this={charContainer}
	on:click|stopPropagation={(e) => selectChar(e)}
>
	<div class="w-full p-2 flex gap-4" bind:this={charScroll} use:dragEl>
		{#each $store as char, idx}
			<div
				class={`w-[200px] md:w-[270px] p-4 flex-none
					border rounded-lg text-lg font-bold ' + ${
						idx === $charIndex
							? 'border-white bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-100'
							: 'border-cyan-500 text-slate-700'
					}`}
			>
				<div class="w-full flex justify-between" data-index={idx}>
					<span class="w-[50%] overflow-hidden whitespace-nowrap text-ellipsis" data-index={idx}
						>{char.name}</span
					>
					<span data-index={idx}>{char.class}</span>
				</div>
			</div>
		{/each}
	</div>
</div>
