import type { bossInfo } from '../stores';

export type BossDifficulty = {
	easy?: number,
	normal?: number,
	hard?: number,
	chaos?: number,
	extreme?: number,
}

export type BossType = {
	name: keyof typeof bossInfo;
	image: string;
	difficulty: (keyof BossDifficulty)[];
};

export type CharType = {
	name?: string;
	class?: string;
	difficulty: (keyof BossDifficulty)[];
}

export interface CharBoss {
	name?: string;
	class?: string;
	boss: BossType[];
}
