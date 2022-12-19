import { bossInfo } from '../stores';
import type { CharBoss, BossType, BossReport, CharType, BossDC } from '../types';

export const searchBossIndex = (arr: BossType[], name: keyof typeof bossInfo) => {
	const nameArr = arr.map((boss) => boss.name);
	return nameArr.indexOf(name);
};

export const getBossReport = (data: CharBoss[]) => {
	const obj: {
		[key in keyof typeof bossInfo]: {
			chars: CharType[];
			dc: { [dc in keyof BossDC | string]: [string, string][] };
		};
	} = {};

	data.forEach((char) => {
		char.boss.forEach((boss) => {
			const row: CharType = { name: char.name || '', class: char.class || '', dc: boss.dc };
			boss.dc.forEach((dc) => {
				if (!obj[boss.name]) {
					obj[boss.name] = { chars: [row], dc: { [dc]: [[char.name || '', char.class || '']] } };
				} else {
					const bossDCObj = obj[boss.name]!.dc
					const isExistDC = dc in obj[boss.name]!.dc;
					if (isExistDC) {
						bossDCObj[dc].push([char.name || '', char.class || '']);
					} else {
						bossDCObj[dc] = [[char.name || '', char.class || '']];
					}
				}
			});
		});
	});
	return obj;
};

export function getCharBossCount(bossArr: BossType[]) {
	let count = 0;
	bossArr.forEach((boss) => {
		count += boss.dc.length;
	});
	return count;
}

export function getTotalBossCount(data: BossReport) {
	let count = 0;
	Object.values(data).forEach((boss) => {
		Object.keys(boss.dc).forEach((dc) => {
			count += boss.dc[dc as keyof BossDC]!.length;
		});
	});

	return count;
}

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
	return bossArr.slice().sort((a, b) => bossNames.indexOf(b.name) - bossNames.indexOf(a.name));
};

export const sortByDC = (arr: (keyof BossDC)[]) => {
	const difficulties = ['easy', 'normal', 'hard', 'chaos', 'extreme'];
	return arr.slice().sort((a, b) => difficulties.indexOf(a) - difficulties.indexOf(b));
};

export const sortByPrice = (data: typeof bossInfo) => {
	const arr: [string, string, number][] = [];
	Object.entries(data).forEach((boss) => {
		Object.entries(boss[1].dc).forEach((entry) => {
			arr.push([boss[0], ...entry]);
		});
	});
	arr.sort((a, b) => b[2] - a[2]);
	return arr;
};

export const reportSortByPrice = (report: BossReport) => {
	if (Object.keys(report).length === 0) return [];
	const arr: [string, string, number, number][] = [];
	const bossSortByPrice = sortByPrice(bossInfo);
	bossSortByPrice.forEach((item) => {
		const [boss, dc] = item;
		if (report[boss]) {
			const aBoss = report[boss];
			if (aBoss.dc[dc as keyof BossDC]) {
				const count = aBoss.dc[dc as keyof BossDC]!.length;
				arr.push([...item, count]);
			}
		}
	});
	return arr;
};
