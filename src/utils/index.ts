import type { BossInfo } from '../stores';
import type { CharBoss, BossType, CharType, BossDifficulty } from '../types';

export const searchBossIndex = (arr: BossType[], name: keyof typeof BossInfo) => {
	const nameArr = arr.map((boss) => boss.name);
	return nameArr.indexOf(name);
};

export const newBossArr = (
	arr: BossType[],
	index: number,
	name: keyof typeof BossInfo,
	difficulty: BossDifficulty
) => {
	let res = arr.slice();
	if (index === -1) {
		res.push({ name, difficulty: [difficulty] });
	} else {
		if (res[index].difficulty.includes(difficulty)) {
			res[index].difficulty = res[index].difficulty.filter((str) => str !== difficulty);
			if (res[index].difficulty.length === 0) {
				res = [...res.slice(0, index), ...res.slice(index + 1)];
			}
		} else {
			res[index].difficulty.push(difficulty);
		}
	}
	return res;
};

export const getTotalBossInfo = (data: CharBoss[]) => {
	const obj: {
		[key in keyof typeof BossInfo]?: CharType[];
	} = {};
	data.forEach((char) => {
		char.boss.forEach((boss) => {
			const row: CharType = { difficulty: boss.difficulty };
			row.name = char.name || '';
			row.class = char.class || '';
			if (Array.isArray(obj[boss.name])) {
				obj[boss.name]?.push(row);
			} else {
				obj[boss.name] = [row];
			}
		});
	});
	return obj;
};

export const getTotalBossCount = (totalBossInfo: {
	[key in keyof typeof BossInfo]?: CharType[];
}) => {
	let count = 0;

	Object.keys(totalBossInfo).forEach((boss) => {
		type BossKey = keyof typeof BossInfo;
		totalBossInfo[boss as BossKey]!.map((char) => {
			count += char.difficulty.length;
		});
	});

	return count;
};
