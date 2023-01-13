import type { CharItemType, ItemType, ClassType } from '$types';
import { getCharArr, getFulfilledData } from '$utils';
import { derived, writable } from 'svelte/store';

export const data = writable<ItemType[]>([]);
export const order = writable<string[]>([]);

export const initChar: CharItemType = {
	name: '',
	class: '',
	group: ''
};

export const char = writable<CharItemType>(initChar);
export const charArr = derived(data, getCharArr);
export const fulfilled = derived(data, getFulfilledData);

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
