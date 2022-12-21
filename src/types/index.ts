import type { bossInfo, classInfo } from '../stores';

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
	dc: (keyof BossDC)[];
};

export type BossReport = {
	[key in keyof typeof bossInfo]: {
		chars: CharType[];
		dc: { [dc in keyof BossDC]: [string, keyof typeof classInfo][] }
	};
};

export type Price = number;

export type ClassType = {
	A1?: {
		group: string;
	},
	A2?: {
		group: string;
	},
	A3?: {
		group: string;
	},
	B1?: {
		group: string;
	},
	B2?: {
		group: string;
	},
	B3?: {
		group: string;
	},
	C1?: {
		group: string;
	},
	C2?: {
		group: string;
	},
	C3?: {
		group: string;
	},
	D1?: {
		group: string;
	},
	D2?: {
		group: string;
	},
	D3?: {
		group: string;
	}
}

export type CharType = {
	name?: string;
	class?: string;
	dc: (keyof BossDC)[];
};

export interface CharBoss {
	name: string;
	class: string;
	boss: BossType[];
}
