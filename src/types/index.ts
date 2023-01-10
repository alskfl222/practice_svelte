import type { classInfo } from '$stores';
import type { bossInfo } from '$stores/boss';

export type CharNameType = string;
export type ClassNameType = keyof typeof classInfo;
export type BossNameType = keyof typeof bossInfo;
export type PriceType = number;
export type HeadcountType = 1 | 2 | 3 | 4 | 5 | 6;
export type RequiredType = boolean;
export type BossCountType = number;

export type BossDCType = {
	EASY?: PriceType;
	NORMAL?: PriceType;
	HARD?: PriceType;
	CHAOS?: PriceType;
	EXTREME?: PriceType;
};

export type ClassType = {
	[key in ClassNameType]?: {
		group: string;
	};
};

export type BossType = {
	name: BossNameType;
	image: string;
	dc: [keyof BossDCType, PriceType, RequiredType][];
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

export type SelectBossType = {
  bossName: keyof typeof bossInfo | '';
  bossDC: keyof BossDCType | '';
  headcount: HeadcountType;
  required: boolean;
}

export type BossReportDCType = [CharNameType, ClassNameType, HeadcountType, RequiredType];

export type BossReportType = {
	[key in BossNameType]: {
		chars: CharType[];
		dc: { [dc in keyof BossDCType]: BossReportDCType[] };
	};
};

export type SortReportItemType = [BossNameType, keyof BossDCType, PriceType, BossReportDCType[], BossCountType];
export type SortReportType = SortReportItemType[];
