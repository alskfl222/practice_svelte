import { writable } from 'svelte/store';
import type { SelectBossType } from '../types';

export const initSelectBoss: SelectBossType = {
	bossName: '',
	bossDC: '',
	headcount: 1,
	required: false
};

export const selectBoss = writable<SelectBossType>(initSelectBoss);