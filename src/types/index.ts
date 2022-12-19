import type { bossInfo, classInfo } from '../stores';

export type BossDC = {
	easy?: number;
	normal?: number;
	hard?: number;
	chaos?: number;
	extreme?: number;
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

export type CharType = {
	name?: string;
	class?: string;
	dc: (keyof BossDC)[];
};

export interface CharBoss {
	name?: string;
	class?: string;
	boss: BossType[];
}
