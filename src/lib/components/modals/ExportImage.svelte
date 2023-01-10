<script lang="ts">
	import html2canvas from 'html2canvas';
	import Button from '../common/Button.svelte';
	import { store, Report } from '$stores';
	import { getCharBossCount, getTotalBossCount } from '$utils';
	import Hbar from '$lib/components/common/Hbar.svelte';

	let container: HTMLElement;
	let target: HTMLAnchorElement;

	function getImgX(idx: number) {
		return -45 * idx;
	}

	async function exportImg() {
		if (container && target) {
			const canvas = await html2canvas(container);
			target.href = canvas.toDataURL('image/png');
			target.download = '테스트.png';
			target.click();
		}
	}

	$: activeChars = $store.filter((char) => char.boss.length > 0);
</script>

<div class="max-h-[80vh] p-12 flex flex-col gap-8 rounded-2xl bg-white overflow-scroll">
	{#if activeChars.length > 0}
		<div class="max-w-[640px] p-8 flex flex-col gap-9" bind:this={container}>
			<div class="flex gap-6 text-2xl font-bold">
				<span>{activeChars.length} 캐릭터</span><span>{getTotalBossCount($Report)} 보스</span>
			</div>
			<Hbar />
			{#each $store as char}
				{#if char.boss.length > 0}
					<div>
						<div class="pb-4 flex justify-between items-center">
							<div class="flex items-center gap-4">
								<span class="text-xl font-bold">{char.name}</span>
								<span class="text-lg font-bold">{char.class}</span>
							</div>
							<span>X {getCharBossCount(char.boss)}</span>
						</div>
						<div class="relative flex bg-gradient-to-r from-transparent to-white">
							{#each char.boss as boss, idx}
								<div
									class="relative w-[150px] h-[150px] py-4 flex flex-col justify-end items-center
											 border-2 border-white rounded-full object-cover"
									style={`left: ${getImgX(idx)}px; background-image: url("${
										boss.image
									}"); background-position: center; background-size: cover;`}
								>
									{#each boss.dc as dc}
										<span class="font-bold text-slate-100 drop-shadow">{dc[0]}</span>
									{/each}
								</div>
							{/each}
						</div>
					</div>
				{/if}
			{/each}
		</div>
		<Hbar />
		<Button on:click={exportImg}><i slot="text" class="fa-solid fa-cloud-arrow-down" /></Button>
		<a id="target" class="hidden" bind:this={target}>파일 다운로드</a>
	{:else}
		<div class="p-4 flex flex-col items-center gap-4 text-2xl">
			<p><strong>캐릭터</strong>와 <strong>보스</strong>를</p>
			<p><strong>먼저 추가</strong>해주세요</p>
		</div>
	{/if}
</div>
