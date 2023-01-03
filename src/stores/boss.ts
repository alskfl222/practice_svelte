import { writable } from 'svelte/store';
import type { SelectBossType } from '../types';

export const selectBoss = writable<SelectBossType>({
	bossName: '',
	bossDC: '',
	headcount: 1,
	required: false
});