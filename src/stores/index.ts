import type { CharItemType, ItemType, ClassType, SpeciesType } from '$types';
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
		species: SpeciesType;
		group: ClassType;
	};
} = {
	히어로: {
		species: '모험가',
		group: '전사'
	},
	팔라딘: {
		species: '모험가',
		group: '전사'
	},
	다크나이트: {
		species: '모험가',
		group: '전사'
	},
	'아크메이지(불,독)': {
		species: '모험가',
		group: '마법사'
	},
	'아크메이지(썬,콜)': {
		species: '모험가',
		group: '마법사'
	},
	비숍: {
		species: '모험가',
		group: '마법사'
	},
	보우마스터: {
		species: '모험가',
		group: '궁수'
	},
	신궁: {
		species: '모험가',
		group: '궁수'
	},
	패스파인더: {
		species: '모험가',
		group: '궁수'
	},
	나이트로드: {
		species: '모험가',
		group: '도적'
	},
	듀얼블레이드: {
		species: '모험가',
		group: '도적'
	},
	바이퍼: {
		species: '모험가',
		group: '해적'
	},
	캡틴: {
		species: '모험가',
		group: '해적'
	},
	캐논슈터: {
		species: '모험가',
		group: '해적'
	},
};
