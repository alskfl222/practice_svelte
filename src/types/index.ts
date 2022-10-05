import type { BossInfo } from '../stores';

export enum BossDifficulty {
	'easy',
	'normal',
	'hard',
	'chaos',
	'extreme',
}

export type BossType = {
	name: keyof typeof BossInfo;
	difficulty: BossDifficulty[];
};

export type CharType = {
	name?: string;
	class?: string;
	difficulty: BossDifficulty[];
}

export interface CharBoss {
	name?: string;
	class?: string;
	boss: BossType[];
}
