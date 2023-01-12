import type { classInfo } from '$stores';
import type { bossInfo } from '$stores/boss';

export type CharNameType = string;
export type ClassNameType = keyof typeof classInfo | '';
export type BossNameType = keyof typeof bossInfo | '';
export type PriceType = number;
export type HeadcountType = 1 | 2 | 3 | 4 | 5 | 6;
export type RequiredType = boolean;
export type BossCountType = number;
export type BossDC = 'EASY' | 'NORMAL' | 'HARD' | 'CHAOS' | 'EXTREME' | '';

export type BossDCType = {
	[key in BossDC]?: PriceType;
};

export type ClassType = '마법사' | 'B' | 'C' | 'D' | 'E' | '';

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
};

export type BossReportDCType = [CharNameType, ClassNameType, HeadcountType, RequiredType];

export type BossReportType = {
	[key in keyof typeof bossInfo]: {
		chars: CharType[];
		dc: { [dc in keyof BossDCType]: BossReportDCType[] };
	};
};

export type SortReportItemType = [
	BossNameType,
	keyof BossDCType,
	PriceType,
	BossReportDCType[],
	BossCountType
];
export type SortReportType = SortReportItemType[];

export type MapleDayType = '목' | '금' | '토' | '일' | '월' | '화' | '수' | undefined;

export type CharItemType = {
	name: CharNameType;
	class: ClassNameType;
	group: ClassType;
};

export type BossItemType = {
	name: BossNameType;
	dc: BossDC;
	headcount: HeadcountType;
	required: RequiredType;
	day: MapleDayType;
};

export type ItemType = {
	char: CharItemType;
	boss?: BossItemType;
};
