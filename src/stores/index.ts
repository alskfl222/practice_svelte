import { writable, derived } from 'svelte/store';
import { getBossReport } from '../utils';
import type { BossDC, ClassType, CharBoss } from '../types';

export const charIndex = writable<number | undefined>(undefined);
export const store = writable<CharBoss[]>([]);
export const bossReport = derived(store, getBossReport)

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
	},
	d: {
		image: './src/images/boss/a.jpeg',
		dc: {
			easy: 110,
			normal: 220,
			hard: 330
		}
	},
	e: {
		image: './src/images/boss/b.jpeg',
		dc: {
			normal: 270,
			chaos: 440
		}
	},
	f: {
		image: './src/images/boss/c.jpeg',
		dc: {
			normal: 360,
			hard: 490
		}
	}
};

export const classInfo: {
	[key in keyof ClassType] : {
		group: string;
	};
} = {
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
