import { derived, writable } from 'svelte/store';
import { fulfilled, order } from '$stores';
import { bossInfo } from '$stores/boss';
import dayjs from 'dayjs';
import type { ItemType, MapleDayType } from '$types';

const today = dayjs().day();
export const mapleDay = today < 4 ? today + 3 : today - 4;

function getCalendarData(fulfilled: ItemType[]) {
	const bossNames = Object.keys(bossInfo);
	const calendarData: { [key in MapleDayType]: ItemType[] } = {
		일: [],
		월: [],
		화: [],
		수: [],
		목: [],
		금: [],
		토: [],
		x: []
	};

	Object.keys(calendarData).forEach((day) => {
		const dayItems = fulfilled.filter((item) => item.day === day);
		order.subscribe((chars) => {
			const row: ItemType[] = [];
			chars.forEach((char) => {
				const charItems = dayItems.filter((item) => item.char.name === char);
				charItems.sort((a, b) => bossNames.indexOf(b.boss!.name) - bossNames.indexOf(a.boss!.name));
				row.push(...charItems);
			});
			calendarData[day as MapleDayType] = row;
		});
	});
	return calendarData;
}

export const calendarData = derived(fulfilled, getCalendarData);
export const selectedItems = writable<ItemType[]>([]);
