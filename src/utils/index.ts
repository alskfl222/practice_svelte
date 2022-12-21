import { maxBossCount, bossInfo, classInfo } from '../stores';
import type { CharBoss, BossType, BossReport, Price, CharType, BossDC } from '../types';

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
					const bossDCObj = obj[boss.name]!.dc;
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

export const sortByBoss = (bossArr: BossType[]) => {
	const bossNames = Object.keys(bossInfo);
	return bossArr.slice().sort((a, b) => bossNames.indexOf(b.name) - bossNames.indexOf(a.name));
};

export const sortByDC = (arr: (keyof BossDC)[]) => {
	const difficulties = ['EASY', 'NORMAL', 'HARD', 'CHAOS', 'EXTREME'];
	return arr.slice().sort((a, b) => difficulties.indexOf(b) - difficulties.indexOf(a));
};

export const sortByPrice = (data: typeof bossInfo) => {
	const arr: [string, keyof BossDC, Price][] = [];
	Object.entries(data).forEach((boss) => {
		Object.entries(boss[1].dc).forEach((entry) => {
			arr.push([boss[0], entry[0] as keyof BossDC, entry[1]]);
		});
	});
	arr.sort((a, b) => b[2] - a[2]);
	return arr;
};

export const reportSortByPrice = (report: BossReport) => {
	if (Object.keys(report).length === 0) return [];
	const arr: [string, string, Price, [string, keyof typeof classInfo][], number][] = [];
	const bossSortByPrice = sortByPrice(bossInfo);
	let count = 0;
	bossSortByPrice.forEach((item) => {
		const [boss, dc] = item;
		if (report[boss]) {
			const aBoss = report[boss];
			if (aBoss.dc[dc as keyof BossDC]) {
				count += aBoss.dc[dc as keyof BossDC]!.length;
				arr.push([...item, aBoss.dc[dc as keyof BossDC]!, count]);
			}
		}
	});

	return arr;
};

export const getTotalBossPrice = (
	sortArr: [string, string, Price, [string, keyof typeof classInfo][], number][]
) => {
	let price = 0;

	sortArr.forEach((item) => {
		if (item[4] <= 180) {
			price += item[2] * item[3].length;
		} else {
			const rest = maxBossCount + item[3].length - item[4];
			if (rest < 0) return;
			price += item[2] * rest;
		}
	});

	return price;
};

export const getBossPrice = (report: BossReport) => {
	const sortArr = reportSortByPrice(report);
	const bossPrice = getTotalBossPrice(sortArr);
	return bossPrice;
};
