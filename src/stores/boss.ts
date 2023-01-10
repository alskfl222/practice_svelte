import { writable } from 'svelte/store';
import type { BossDCType, SelectBossType } from '../types';

export const maxBossCount = 180;

export const selectBoss = writable<SelectBossType>({
	bossName: '',
	bossDC: '',
	headcount: 1,
	required: false
});

export const bossInfo: {
	[key in string]: {
		image: string;
		dc: BossDCType;
	};
} = {
	a: {
		image: '/images/boss/a.jpeg',
		dc: {
			EASY: 100,
			NORMAL: 200,
			HARD: 300
		}
	},
	b: {
		image: '/images/boss/b.jpeg',
		dc: {
			NORMAL: 250,
			CHAOS: 400
		}
	},
	c: {
		image: '/images/boss/c.jpeg',
		dc: {
			NORMAL: 320,
			HARD: 450
		}
	},
	d: {
		image: '/images/boss/a.jpeg',
		dc: {
			EASY: 110,
			NORMAL: 220,
			HARD: 330
		}
	},
	e: {
		image: '/images/boss/b.jpeg',
		dc: {
			NORMAL: 270,
			CHAOS: 440
		}
	},
	f: {
		image: '/images/boss/c.jpeg',
		dc: {
			NORMAL: 360,
			HARD: 490
		}
	}
};