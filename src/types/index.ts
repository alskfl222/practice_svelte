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

export type SpeciesType =
	| '모험가'
	| '시그너스 기사단'
	| '레지스탕스'
	| '영웅'
	| '노바'
	| '레프'
	| '아니마'
	| '제로'
	| '키네시스';

export type ClassType = '전사' | '마법사' | '궁수' | '도적' | '해적' | '';

export type MapleDayType = '목' | '금' | '토' | '일' | '월' | '화' | '수' | 'x';

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
};

export type ItemType = {
	char: CharItemType;
	boss?: BossItemType;
	day: MapleDayType;
};
