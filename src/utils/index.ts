import { bossInfo } from '../stores';
import type { CharBoss, BossType, CharType, BossDifficulty } from '../types';

export const searchBossIndex = (arr: BossType[], name: keyof typeof bossInfo) => {
	const nameArr = arr.map((boss) => boss.name);
	return nameArr.indexOf(name);
};

export const newBossArr = (
	arr: BossType[],
	index: number,
	name: keyof typeof bossInfo,
	image: string,
	difficulty: keyof BossDifficulty
) => {
	let res = arr.slice();
	if (index === -1) {
		res.push({ name, image, difficulty: [difficulty] });
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
		[key in keyof typeof bossInfo]?: CharType[];
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
	[key in keyof typeof bossInfo]?: CharType[];
}) => {
	let count = 0;

	Object.values(totalBossInfo).forEach((bossInfo) => {
		bossInfo!.forEach((char) => {
			count += char.difficulty.length;
		});
	});

	return count;
};

export const getTotalBossPrice = (data: CharBoss[]) => {
	let price = 0;

	Object.values(data).forEach((char) => {
		char.boss.forEach(boss => {
			boss.difficulty.forEach(diff => {
				price += bossInfo[boss.name].difficulty[diff]!
			})
		})
	});

	return price;
};