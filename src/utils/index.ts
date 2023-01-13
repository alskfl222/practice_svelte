import { maxBossCount, bossInfo } from '$stores/boss';
import type {
	CharNameType,
	CharBossType,
	BossType,
	BossReportType,
	PriceType,
	CharType,
	BossDCType,
	BossReportDCType,
	SortReportType,
	HeadcountType,
	ItemType,
	BossNameType,
	BossItemType,
	BossDC
} from '../types';

export const searchBossIndex = (arr: BossType[], name: keyof typeof bossInfo) => {
	const nameArr = arr.map((boss) => boss.name);
	return nameArr.indexOf(name);
};

export const getBossReport = (data: CharBossType[]) => {
	const obj: BossReportType = {};

	data.forEach((char) => {
		char.boss.forEach((boss) => {
			const row: CharType = { name: char.name, class: char.class, dc: boss.dc };
			boss.dc.forEach((item) => {
				const [dc, headcount, required] = item;
				const charDC: BossReportDCType = [
					char.name,
					char.class,
					headcount as HeadcountType,
					required
				];
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

export function getTotalBossCount(data: BossReportType) {
	let count = 0;
	Object.values(data).forEach((boss) => {
		Object.keys(boss.dc).forEach((dc) => {
			count += boss.dc[dc as keyof BossDCType]!.length;
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

export const reportSortByPrice = (report: BossReportType) => {
	if (Object.keys(report).length === 0) return [];
	const arr: SortReportType = [];
	const bossSortByPrice = sortByPrice(bossInfo);

	// const reqReport: BossReport = {};
	// const optReport: BossReport = {};
	// Object.entries(report).forEach((boss) => {
	// 	const bossName = boss[0] as keyof typeof bossInfo;
	// 	Object.entries(boss[1].dc).forEach((dc) => {
	// 		const bossDC = dc[0] as keyof BossDC;
	// 		dc[1].forEach((char) => {
	// 			const [charName, className, headcount, required] = char;
	// 			// const price = bossInfo[bossName].dc[bossDC]!;
	// 			const charsRow = {
	// 				name: charName,
	// 				class: className,
	// 				dc: [[bossDC, headcount, required] as [keyof BossDC, number, boolean]]
	// 			};
	// 			const dcRow: [string, keyof ClassType, number, boolean] = [
	// 				charName,
	// 				className,
	// 				headcount,
	// 				required
	// 			];
	// 			if (required) {
	// 				if (!reqReport[bossName]) {
	// 					reqReport[bossName] = {
	// 						chars: [charsRow],
	// 						dc: { [bossDC]: dcRow }
	// 					};
	// 				} else {
	// 					reqReport[bossName].chars.push(charsRow);
	// 					if (reqReport[bossName].dc[bossDC]) {
	// 						reqReport[bossName].dc[bossDC]!.push(dcRow);
	// 					} else {
	// 						reqReport[bossName].dc[bossDC] = [dcRow];
	// 					}
	// 				}
	// 			} else {
	// 				if (!optReport[bossName]) {
	// 					optReport[bossName] = {
	// 						chars: [charsRow],
	// 						dc: { [bossDC]: dcRow }
	// 					};
	// 				} else {
	// 					optReport[bossName].chars.push(charsRow);
	// 					if (optReport[bossName].dc[bossDC]) {
	// 						optReport[bossName].dc[bossDC]!.push(dcRow);
	// 					} else {
	// 						optReport[bossName].dc[bossDC] = [dcRow];
	// 					}
	// 				}
	// 			}
	// 		});
	// 	});
	// });

	// console.log(reqReport);
	// console.log(optReport);

	let count = 0;
	bossSortByPrice.forEach((item) => {
		const [boss, dc] = item;
		if (report[boss]) {
			const aBoss = report[boss];
			if (aBoss.dc[dc as keyof BossDCType]) {
				count += aBoss.dc[dc as keyof BossDCType]!.length;
				arr.push([...item, aBoss.dc[dc as keyof BossDCType]!, count]);
			}
		}
	});

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

// export const getTotalBossPrice = (sortArr: SortReportType) => {
// 	let price = 0;

// 	sortArr.forEach((item) => {
// 		if (item[4] <= maxBossCount) {
// 			item[3].forEach((char) => {
// 				price += Math.floor(item[2] / char[2]);
// 			});
// 		} else {
// 			const rest = maxBossCount + item[3].length - item[4];
// 			if (rest <= 0) return;
// 			const restArr = item[3].slice(rest);
// 			restArr.forEach((char) => {
// 				price += Math.floor(item[2] / char[2]);
// 			});
// 		}
// 	});

// 	return price;
// };

// export const getBossPrice = (report: BossReportType) => {
// 	const sortArr = reportSortByPrice(report);
// 	const bossPrice = getTotalBossPrice(sortArr);
// 	return bossPrice;
// };

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
