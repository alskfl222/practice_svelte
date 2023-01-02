import type { bossInfo, classInfo } from '../stores';

export type CharNameType = string;
export type ClassNameType = keyof typeof classInfo;
export type BossNameType = keyof typeof bossInfo;
export type PriceType = number;
export type HeadcountType = number;
export type RequiredType = boolean;
export type BossCountType = number;

export type BossDCType = {
	EASY?: PriceType;
	NORMAL?: PriceType;
	HARD?: PriceType;
	CHAOS?: PriceType;
	EXTREME?: PriceType;
};

export type SelectBossType = {
  bossName: keyof typeof bossInfo | '';
  bossDC: keyof BossDCType | '';
  headcount: number;
  required: boolean;
}

export type BossType = {
	name: BossNameType;
	image: string;
	dc: [keyof BossDCType, PriceType, RequiredType][];
};

export type BossReportDCType = [CharNameType, ClassNameType, HeadcountType, RequiredType];

export type BossReportType = {
	[key in BossNameType]: {
		chars: CharType[];
		dc: { [dc in keyof BossDCType]: BossReportDCType[] };
	};
};

export type SortReportItemType = [BossNameType, keyof BossDCType, PriceType, BossReportDCType[], BossCountType];
export type SortReportType = SortReportItemType[];

export type ClassType = {
	[key in ClassNameType]?: {
		group: string;
	};
};

export type CharType = {
	name: CharNameType;
	class: ClassNameType;
	dc: [keyof BossDCType, BossCountType, RequiredType][];
};

export interface CharBossType {
	name: CharNameType;
	class: ClassNameType;
	boss: BossType[];
}
