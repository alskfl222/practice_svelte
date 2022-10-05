import { writable } from 'svelte/store';
import type { CharBoss } from '../types';

export const Store = writable<CharBoss[]>([]);

export const BossInfo = {
	a: {
		easy: 100,
		normal: 200,
		hard: 300
	},
	b: {
		normal: 250,
		chaos: 400
	},
	c: {
		normal: 320,
		hard: 450
	}
};
