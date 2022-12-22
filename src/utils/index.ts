import { maxBossCount, bossInfo, classInfo } from '../stores';
import type { CharBoss, BossType, BossReport, Price, CharType, BossDC, BossReportDC, SortReport } from '../types';

export const searchBossIndex = (arr: BossType[], name: keyof typeof bossInfo) => {
	const nameArr = arr.map((boss) => boss.name);
	return nameArr.indexOf(name);
};

export const getBossReport = (data: CharBoss[]) => {
	const obj: BossReport = {};

	data.forEach((char) => {
		char.boss.forEach((boss) => {
			const row: CharType = { name: char.name, class: char.class, dc: boss.dc };
			boss.dc.forEach((item) => {
				const [dc, headcount, required] = item
				const charDC: BossReportDC = [char.name, char.class, headcount, required]
				if (!obj[boss.name]) {
					obj[boss.name] = { chars: [row], dc: { [dc]: [charDC] } };
				} else {
					const bossDCObj = obj[boss.name]!.dc;
					const isExistDC = dc in obj[boss.name]!.dc;
					if (isExistDC) {
						bossDCObj[dc]!.push(charDC);
					} else {
						bossDCObj[dc] = [charDC];
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

export const sortByDC = (arr: BossType['dc']) => {
	const difficulties = ['EASY', 'NORMAL', 'HARD', 'CHAOS', 'EXTREME'];
	return arr.slice().sort((a, b) => difficulties.indexOf(b[0]) - difficulties.indexOf(a[0]));
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
	const arr: SortReport = [];
	const bossSortByPrice = sortByPrice(bossInfo);
	let count = 0;
	const requiredArr = []
	const optionalArr = []
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
	sortArr: SortReport
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
