import { bossInfo } from '../stores';
import type { CharBoss, BossType, CharType, BossDC } from '../types';

export const searchBossIndex = (arr: BossType[], name: keyof typeof bossInfo) => {
	const nameArr = arr.map((boss) => boss.name);
	return nameArr.indexOf(name);
};

export const getTotalBossInfo = (data: CharBoss[]) => {
	const obj: {
		[key in keyof typeof bossInfo]?: CharType[];
	} = {};
	data.forEach((char) => {
		char.boss.forEach((boss) => {
			const row: CharType = { dc: boss.dc };
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
			count += char.dc.length;
		});
	});

	return count;
};

export const getTotalBossPrice = (data: CharBoss[]) => {
	let price = 0;

	Object.values(data).forEach((char) => {
		char.boss.forEach((boss) => {
			boss.dc.forEach((diff) => {
				price += bossInfo[boss.name].dc[diff]!;
			});
		});
	});

	return price;
};

export const sortByBoss = (bossArr: BossType[]) => {
	const bossNames = Object.keys(bossInfo);
	return bossArr.slice().sort((a, b) => bossNames.indexOf(a.name) - bossNames.indexOf(b.name));
};

export const sortByDC = (arr: (keyof BossDC)[]) => {
	const difficulties = ['easy', 'normal', 'hard', 'chaos', 'extreme'];
	return arr.slice().sort((a, b) => difficulties.indexOf(a) - difficulties.indexOf(b));
};
