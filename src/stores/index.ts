import { writable } from 'svelte/store';
import type { BossDifficulty, CharBoss } from '../types';

export const charIndex = writable<number>(0);
export const store = writable<CharBoss[]>([]);

export const bossInfo: {
	[key in string]: {
		image: string;
		difficulty: BossDifficulty;
	}
} = {
	a: {
		image: './src/images/boss/pexels-kelvin-valerio-617278.jpeg',
		difficulty: {
			easy: 100,
			normal: 200,
			hard: 300
		}
	},
	b: {
		image: './src/images/boss/pexels-pixabay-45201.jpeg',
		difficulty: {
			normal: 250,
			chaos: 400
		}
	},
	c: {
		image: './src/images/boss/pexels-pixabay-104827.jpeg',
		difficulty: {
			normal: 320,
			hard: 450
		}
	}
};

export const classInfo = {
	A1: {
		group: 'A'
	},
	A2: {
		group: 'A'
	},
	A3: {
		group: 'A'
	},
	B1: {
		group: 'B'
	},
	B2: {
		group: 'B'
	},
	B3: {
		group: 'B'
	},
	C1: {
		group: 'C'
	},
	C2: {
		group: 'C'
	},
	C3: {
		group: 'C'
	},
	D1: {
		group: 'D'
	},
	D2: {
		group: 'D'
	},
	D3: {
		group: 'D'
	}
};
