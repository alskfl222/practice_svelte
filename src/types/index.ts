import type { bossInfo, classInfo } from '../stores';

export type CharName = string;
export type ClassName = keyof typeof classInfo;
export type BossName = keyof typeof bossInfo;
export type Price = number;
export type Headcount = number;
export type Required = boolean;
export type BossCount = number;

export type BossDC = {
	EASY?: Price;
	NORMAL?: Price;
	HARD?: Price;
	CHAOS?: Price;
	EXTREME?: Price;
};

export type BossType = {
	name: BossName;
	image: string;
	dc: [keyof BossDC, Price, Required][];
};

export type BossReportDC = [CharName, ClassName, Headcount, Required];

export type BossReport = {
	[key in BossName]: {
		chars: CharType[];
		dc: { [dc in keyof BossDC]: BossReportDC[] };
	};
};

export type SortReportItem = [BossName, keyof BossDC, Price, BossReportDC[], BossCount];
export type SortReport = SortReportItem[];

export type ClassType = {
	[key in ClassName]?: {
		group: string;
	};
};

export type CharType = {
	name: CharName;
	class: ClassName;
	dc: [keyof BossDC, BossCount, Required][];
};

export interface CharBoss {
	name: CharName;
	class: ClassName;
	boss: BossType[];
}
