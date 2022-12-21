import { writable, derived } from 'svelte/store';
import { getBossReport, getTotalBossCount, getBossPrice } from '../utils';
import type { BossDC, ClassType, CharBoss } from '../types';

export const maxBossCount = 180;

export const charIndex = writable<number | undefined>(undefined);
export const counterIndex = writable<number | undefined>(undefined);
export const store = writable<CharBoss[]>([]);
export const Report = derived(store, getBossReport)
export const Count = derived(Report, getTotalBossCount)
export const Price = derived(Report, getBossPrice)

export const bossInfo: {
	[key in string]: {
		image: string;
		dc: BossDC;
	};
} = {
	a: {
		image: './src/images/boss/a.jpeg',
		dc: {
			EASY: 100,
			NORMAL: 200,
			HARD: 300
		}
	},
	b: {
		image: './src/images/boss/b.jpeg',
		dc: {
			NORMAL: 250,
			CHAOS: 400
		}
	},
	c: {
		image: './src/images/boss/c.jpeg',
		dc: {
			NORMAL: 320,
			HARD: 450
		}
	},
	d: {
		image: './src/images/boss/a.jpeg',
		dc: {
			EASY: 110,
			NORMAL: 220,
			HARD: 330
		}
	},
	e: {
		image: './src/images/boss/b.jpeg',
		dc: {
			NORMAL: 270,
			CHAOS: 440
		}
	},
	f: {
		image: './src/images/boss/c.jpeg',
		dc: {
			NORMAL: 360,
			HARD: 490
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
