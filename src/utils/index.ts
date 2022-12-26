import { maxBossCount, bossInfo } from '../stores';
import type {
	CharBoss,
	BossType,
	BossReport,
	Price,
	CharType,
	BossDC,
	BossReportDC,
	SortReport
} from '../types';

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
				const [dc, headcount, required] = item;
				const charDC: BossReportDC = [char.name, char.class, headcount, required];
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
			if (aBoss.dc[dc as keyof BossDC]) {
				count += aBoss.dc[dc as keyof BossDC]!.length;
				arr.push([...item, aBoss.dc[dc as keyof BossDC]!, count]);
			}
		}
	});

	return arr;
};

export const getTotalBossPrice = (sortArr: SortReport) => {
	let price = 0;

	sortArr.forEach((item) => {
		if (item[4] <= maxBossCount) {
			item[3].forEach((char) => {
				price += Math.floor(item[2] / char[2]);
			});
		} else {
			const rest = maxBossCount + item[3].length - item[4];
			if (rest <= 0) return;
			const restArr = item[3].slice(rest);
			restArr.forEach((char) => {
				price += Math.floor(item[2] / char[2]);
			});
		}
	});

	return price;
};

export const getBossPrice = (report: BossReport) => {
	const sortArr = reportSortByPrice(report);
	const bossPrice = getTotalBossPrice(sortArr);
	return bossPrice;
};
