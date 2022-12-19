import { bossInfo, bossSortByPrice } from '../stores';
import type { CharBoss, BossType, BossReport, CharType, BossDC } from '../types';

export const searchBossIndex = (arr: BossType[], name: keyof typeof bossInfo) => {
	const nameArr = arr.map((boss) => boss.name);
	return nameArr.indexOf(name);
};

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

export const getBossReport = (data: CharBoss[]) => {
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

	const sortObj: {
		[key in keyof typeof bossInfo]: {
			count: { [dc in keyof BossDC | string]: number };
			chars: CharType[];
		};
	} = {};

	for (const boss in bossInfo) {
		if (boss in obj) {
			const sortDC: { [dc in keyof BossDC | string]: number } = {};
			for (const dc of ['easy', 'normal', 'hard', 'chaos', 'extreme']) {
				if (dc in obj[boss].count) {
					sortDC[dc] = obj[boss].count[dc];
				}
			}
			sortObj[boss] = obj[boss];
			sortObj[boss].count = sortDC;
		}
	}
	return sortObj;
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
	Object.values(data).forEach(boss => {
		Object.values(boss.count).forEach(dc => {
			count += dc
		})
	})

	return count
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
	return bossArr.slice().sort((a, b) => bossNames.indexOf(a.name) - bossNames.indexOf(b.name));
};

export const sortByDC = (arr: (keyof BossDC)[]) => {
	const difficulties = ['easy', 'normal', 'hard', 'chaos', 'extreme'];
	return arr.slice().sort((a, b) => difficulties.indexOf(a) - difficulties.indexOf(b));
};

export const sortByPrice = (data: typeof bossInfo) => {
	const arr: [string, string, number][] = []
	Object.entries(data).forEach(boss => {
		Object.entries(boss[1].dc).forEach(entry => {
			arr.push([boss[0], ...entry])
		})
	})
	arr.sort((a, b) => b[2] - a[2])
	return arr
}

export const reportSortByPrice = (report: BossReport) => {
	const arr: [string, string, number, number][] = []
	if (Object.keys(report).length === 0) return [];
	bossSortByPrice.forEach(item => {
		const [boss, dc] = item
		if (report[boss]) {
			const count = report[boss].count[dc]
			if (count) arr.push([...item, count]);
		}
	})
	return arr
}