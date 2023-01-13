import { maxBossCount, bossInfo } from '$stores/boss';
import type {
	CharNameType,
	PriceType,
	BossDCType,
	HeadcountType,
	ItemType,
	BossNameType,
	BossItemType,
	BossDC
} from '../types';

export const sortItemsByBoss = (bossArr: ItemType[][]) => {
	const bossNames = Object.keys(bossInfo);
	return bossArr
		.slice()
		.sort((a, b) => bossNames.indexOf(b[0].boss!.name) - bossNames.indexOf(a[0].boss!.name));
};

export const sortItemsByDC = (arr: ItemType[]) => {
	const difficulties = ['EASY', 'NORMAL', 'HARD', 'CHAOS', 'EXTREME'];
	return arr
		.slice()
		.sort((a, b) => difficulties.indexOf(b.boss!.dc) - difficulties.indexOf(a.boss!.dc));
};

export const sortByPrice = (data: typeof bossInfo) => {
	const arr: [keyof typeof bossInfo, keyof BossDCType, PriceType][] = [];
	Object.entries(data).forEach((boss) => {
		Object.entries(boss[1].dc).forEach((entry) => {
			arr.push([boss[0], entry[0] as keyof BossDCType, entry[1]]);
		});
	});
	arr.sort((a, b) => b[2] - a[2]);
	return arr;
};

export const sortDataByPrice = (data: ItemType[]) => {
	if (data.length === 0) return [];
	const arr: ItemType[][] = [];
	const bossSortByPrice = sortByPrice(bossInfo);

	bossSortByPrice.forEach((item) => {
		const [boss, dc] = item;
		const bossItems = data.filter((item) => item.boss?.name === boss && item.boss?.dc === dc);
		if (bossItems.length > 0) {
			arr.push(bossItems);
		}
	});

	return arr;
};

export const getCharArr = (data: ItemType[]) => {
	const charArr = data.map((item) => item.char);
	const nameArr = charArr.map((char) => char.name);
	return charArr.filter((char, idx) => nameArr.indexOf(char.name) === idx);
};

export const getFulfilledData = (data: ItemType[]) => {
	return data.filter((item) => item.boss);
};

export function getBossArr(data: ItemType[], name: CharNameType) {
	const bossArr: ItemType[][] = [];
	Object.keys(bossInfo).forEach((boss) => {
		let items = data.filter((item) => item.char.name === name && item.boss?.name === boss);
		items = sortItemsByDC(items);
		if (items.length > 0) bossArr.push(items);
	});
	return bossArr;
}

export function getCharBossPrice(name: BossNameType, dc: BossDC, headcount: HeadcountType) {
	if (bossInfo[name] && bossInfo[name].dc[dc]) {
		return Math.floor(bossInfo[name].dc[dc]! / headcount);
	}
	return 0;
}

export function getBossPrice(items: ItemType[]) {
	let price = 0;
	items.forEach((item) => {
		const boss = item.boss as BossItemType;
		price += getCharBossPrice(boss.name, boss.dc, boss.headcount);
	});
	return price;
}

export function getTotalBossPrice(items: ItemType[]) {
	let price = 0;
	const sorted = sortDataByPrice(items).flat();
	for (let i = 0; i < maxBossCount; i++) {
		if (sorted[i] && sorted[i].boss) {
			const name = sorted[i].boss!.name as keyof typeof bossInfo
			const dc = sorted[i].boss!.dc as BossDC
			price += bossInfo[name].dc[dc]!
		}
	}
	return price
}
