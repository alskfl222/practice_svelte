import { writable, derived } from 'svelte/store';
import { getBossReport, getTotalBossCount, getBossPrice } from '../utils';
import type { CharBossType, ClassType } from '../types';

export const charIdx = writable<number | undefined>(undefined);
export const counterIdx = writable<number | undefined>(undefined);
export const store = writable<CharBossType[]>([]);
export const Report = derived(store, getBossReport);
export const Count = derived(Report, getTotalBossCount);
export const Price = derived(Report, getBossPrice);

export const classInfo: {
	[key in string]: {
		group: ClassType;
	};
} = {
	'아크메이지(불,독)': {
		group: '마법사'
	},
	마법사2: {
		group: '마법사'
	},
	마법사3: {
		group: '마법사'
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
