import type { CharItemType, ItemType } from '$types';
import { getCharArr, getFulfilledData } from '$utils';
import { derived, writable } from 'svelte/store';

export const data = writable<ItemType[]>([]);

export const initChar: CharItemType = {
	name: '',
	class: '',
	group: ''
};

export const char = writable<CharItemType>(initChar);

export const charArr = derived(data, getCharArr);
export const fulfilled = derived(data, getFulfilledData);
