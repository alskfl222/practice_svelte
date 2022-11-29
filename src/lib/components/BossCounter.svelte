<script lang="ts">
	import type { CharBoss, CharType, BossDC } from 'src/types';
	import { store, bossInfo } from '../../stores';

	const getBossCount = (dcArr: (keyof BossDC)[]) => {
		const obj: {
			[key in keyof BossDC]: number;
		} = {};
		dcArr.forEach((dc) => {
			if (obj[dc]) {
				obj[dc]! += 1;
			} else {
				obj[dc] = 1;
			}
		});
		return obj;
	};

	const addCharBossCount = (
		prev: {
			[key in keyof BossDC]: number;
		},
		curr: {
			[key in keyof BossDC]: number;
		}
	) => {
		const res = Object.assign({}, prev);
		Object.keys(curr).forEach((key) => {
			if (key in res) {
				res[key as keyof BossDC]! += 1;
			} else {
				res[key as keyof BossDC] = 1;
			}
		});
		return res;
	};

	const getTotalBossInfo = (data: CharBoss[]) => {
		const obj: {
			[key in keyof typeof bossInfo]: {
				count: { [dc in keyof BossDC | string]: number };
				chars: CharType[];
			};
		} = {};
		data.forEach((char) => {
			char.boss.forEach((boss) => {
				const row: CharType = { dc: boss.dc };
				row.name = char.name || '';
				row.class = char.class || '';
				if (obj[boss.name]) {
					obj[boss.name]!.chars.push(row);
					obj[boss.name]!.count = addCharBossCount(obj[boss.name]!.count, getBossCount(row.dc));
				} else {
					obj[boss.name] = { count: getBossCount(row.dc), chars: [row] };
				}
			});
		});
		return obj;
	};

	$: totalBossInfo = getTotalBossInfo($store);
	$: console.log(totalBossInfo);
</script>

<section class="grid grid-cols-3 gap-4">
	{#each Object.keys(totalBossInfo) as boss}
		<div>
			<div
				class="aspect-[4/1] rounded bg-auto bg-center bg-no-repeat"
				style={`background-image: url(${bossInfo[boss].image})`}
			>
			</div>
			{#each Object.keys(totalBossInfo[boss].count) as dc}
				<span>{dc}</span><span>{totalBossInfo[boss].count[dc]}</span>
			{/each}
		</div>
	{/each}
</section>
