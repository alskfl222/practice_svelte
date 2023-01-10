import { writable, derived } from 'svelte/store';
import { getBossReport, getTotalBossCount, getBossPrice } from '../utils';
import type { CharBossType } from '../types';

export const charIndex = writable<number | undefined>(undefined);
export const counterIndex = writable<number | undefined>(undefined);
export const store = writable<CharBossType[]>([]);
export const Report = derived(store, getBossReport)
export const Count = derived(Report, getTotalBossCount)
export const Price = derived(Report, getBossPrice)

export const classInfo: {
	[key in string] : {
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
