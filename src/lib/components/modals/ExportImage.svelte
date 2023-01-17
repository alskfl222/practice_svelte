<script lang="ts">
	import html2canvas from 'html2canvas';
	import Button from '$lib/components/common/Button.svelte';
	import Hbar from '$lib/components/common/Hbar.svelte';
	import type { ItemType } from '$types';
	import { order, fulfilled, charArr } from '$stores';
	import { bossInfo } from '$stores/boss';

	let container: HTMLElement;
	let target: HTMLAnchorElement;

	function getOrderedArr(items: ItemType[], order: string[]) {
		const bossNames = Object.keys(bossInfo);
		const difficulties = ['EASY', 'NORMAL', 'HARD', 'CHAOS', 'EXTREME'];
		const arr: ItemType[][][] = [];
		order.forEach((char) => {
			const row: ItemType[][] = [];
			const charItems = items.filter((item) => item.char.name === char);
			bossNames.forEach((boss) => {
				const bossItems = charItems.filter((item) => item.boss?.name === boss);
				if (bossItems.length > 0) {
					bossItems.sort(
						(a, b) => difficulties.indexOf(b.boss!.dc) - difficulties.indexOf(a.boss!.dc)
					);
					row.push(bossItems);
				}
			});
			arr.push(row);
		});
		return arr;
	}

	function getImgX(idx: number) {
		return -45 * idx;
	}
	function getOpacity(idx: number) {
		return `opacity-${100 - 10 * idx}`;
	}

	async function exportImg() {
		if (container && target) {
			const canvas = await html2canvas(container);
			target.href = canvas.toDataURL('image/png');
			target.download = '테스트.png';
			target.click();
		}
	}

	$: orderedArr = getOrderedArr($fulfilled, $order);
</script>

<div class="h-[80vh] p-12 flex flex-col gap-8 rounded-2xl bg-white overflow-scroll">
	{#if $charArr.length > 0}
		<div class="w-[640px] p-8 pb-12 flex flex-col gap-9" bind:this={container}>
			<div class="flex gap-6 text-2xl font-bold">
				<span>{$charArr.length} 캐릭터</span><span>{$fulfilled.length} 보스</span>
			</div>
			<Hbar />
			{#each orderedArr as charItems}
				<div class="pb-4 flex justify-between items-center">
					<div class="flex items-center gap-4">
						<span class="text-xl font-bold">{charItems[0][0].char.name}</span>
						<span class="text-lg font-bold">{charItems[0][0].char.class}</span>
					</div>
					<span>X {charItems.flat(2).length}</span>
				</div>
				<div class="relative w-full flex overflow-hidden">
					{#each charItems as bossItems, idx}
						<div
							class={`relative flex-none w-[150px] h-[150px] py-4 flex flex-col justify-end items-center
							 border-2 border-white rounded-full ${getOpacity(idx)}`}
							style={`left: ${getImgX(idx)}px; background-image: url("${
								bossItems[0].boss ? bossInfo[bossItems[0].boss.name].image : ''
							}"); background-position: center; background-size: cover;`}
						>
							{#each bossItems as item}<span class="font-bold text-neutral-100 drop-shadow-lg"
									>{item.boss?.dc}</span
								>{/each}
						</div>
					{/each}
				</div>
			{/each}
			<span class="self-center mt-4 text-xl">by <strong>alskfl222</strong></span>
		</div>
		<div class="w-[640px] p-8 flex flex-col gap-8">
			<Hbar />
			<Button on:click={exportImg}><i slot="text" class="fa-solid fa-cloud-arrow-down" /></Button>
			<a id="target" class="hidden" bind:this={target}>파일 다운로드</a>
		</div>
	{:else}
		<div class="p-4 flex flex-col items-center gap-4 text-2xl">
			<p><strong>캐릭터</strong>와 <strong>보스</strong>를</p>
			<p><strong>먼저 추가</strong>해주세요</p>
		</div>
	{/if}
</div>
