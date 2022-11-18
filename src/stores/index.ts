import { writable } from 'svelte/store';
import type { BossDC, CharBoss } from '../types';

export const charIndex = writable<number | undefined>(undefined);
export const store = writable<CharBoss[]>([]);

export const bossInfo: {
	[key in string]: {
		image: string;
		dc: BossDC;
	};
} = {
	a: {
		image: './src/images/boss/a.jpeg',
		dc: {
			easy: 100,
			normal: 200,
			hard: 300
		}
	},
	b: {
		image: './src/images/boss/b.jpeg',
		dc: {
			normal: 250,
			chaos: 400
		}
	},
	c: {
		image: './src/images/boss/c.jpeg',
		dc: {
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
