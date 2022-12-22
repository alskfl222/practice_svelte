import type { bossInfo, classInfo } from '../stores';

export type Name = string;
export type Price = number;
export type Headcount = number;
export type Required = boolean;
export type BossCount = number;

export type BossDC = {
	EASY?: number;
	NORMAL?: number;
	HARD?: number;
	CHAOS?: number;
	EXTREME?: number;
};

export type BossType = {
	name: keyof typeof bossInfo;
	image: string;
	dc: [keyof BossDC, number, Required][];
};

export type BossReportDC = [Name, keyof typeof classInfo, Headcount, Required];

export type BossReport = {
	[key in keyof typeof bossInfo]: {
		chars: CharType[];
		dc: { [dc in keyof BossDC]: BossReportDC[] };
	};
};

export type SortReportItem = [
	keyof typeof bossInfo,
	keyof BossDC,
	Price,
	BossReportDC[],
	BossCount
];
export type SortReport = SortReportItem[];

export type ClassType = {
	[key in keyof typeof classInfo]?: {
		group: string;
	};
};

export type CharType = {
	name: Name;
	class: keyof typeof classInfo;
	dc: [keyof BossDC, BossCount, Required][];
};

export interface CharBoss {
	name: Name;
	class: keyof typeof classInfo;
	boss: BossType[];
}
