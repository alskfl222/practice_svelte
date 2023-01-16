import { writable } from 'svelte/store';
import dayjs from 'dayjs';
import type { MapleDayType } from '$types';

const today = dayjs().day();
export const mapleDay = today < 4 ? today + 3 : today - 4;
export const mapleDayObj = writable<{ [key in MapleDayType]: string[] }>({
	일: [],
	월: [],
	화: [],
	수: [],
  목: [],
	금: [],
	토: [],
	x: [],
});
