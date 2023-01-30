import { data, order, fulfilled } from '$stores';
import { bossInfo } from '$stores/boss';
import { selectedItems, transferData } from '$stores/calendar';
import { showModal, modalType } from '$stores/modal';
import type { ItemType, CharItemType, MapleDayType } from '$types';

function isCheckedChar(fulfilled: ItemType[], selected: ItemType[], charItemsArr: ItemType[]) {
	return (
		fulfilled.filter((item) => item.char.name === charItemsArr[0].char.name).length ===
		selected.filter((item) => item.char.name === charItemsArr[0].char.name).length
	);
}

function isExist(data: ItemType[], item: ItemType, day: MapleDayType) {
	const char = item.char.name;
	const boss = item.boss?.name;
	const dc = item.boss?.dc;
	return (
		data.filter(
			(item) =>
				char === item.char.name &&
				boss === item.boss?.name &&
				dc === item.boss?.dc &&
				day === item.boss?.day
		).length > 0
	);
}

function dragStart(e: DragEvent, items: ItemType[]) {
	e.dataTransfer?.setData('text/plain', JSON.stringify(items));
}

function dragDrop(e: DragEvent, day: MapleDayType) {
	data.update((d) => {
		const dragData = e.dataTransfer?.getData('text/plain') as string;
		const items = JSON.parse(dragData) as ItemType[];

		if (items && items.length > 0) {
			items.forEach((item) => {
				const char = item.char.name;
				const boss = item.boss?.name;
				const dc = item.boss?.dc;

				if (!isExist(d, item, day)) {
					const newItem = { ...item };
					newItem.boss!.day = day;
					d.push(newItem);
					d = d.filter(
						(item) =>
							!(
								char === item.char.name &&
								boss === item.boss?.name &&
								dc === item.boss?.dc &&
								day !== item.boss?.day
							)
					);
					order.subscribe((o) => {
						d.sort((a, b) => o.indexOf(a.char.name) - o.indexOf(b.char.name));
					});
				}
			});
			localStorage.setItem('prev', JSON.stringify(d));
		}
		return d;
	});
	selectedItems.set([]);
}

function touchStart(e: TouchEvent, items: ItemType[]) {
	e.preventDefault();
	transferData.set(JSON.stringify(items));

	const el = e.target as HTMLElement;
	const shadow = document.createElement('div');
	const left = e.changedTouches[0].pageX;
	const top = e.changedTouches[0].pageY;

	shadow.setAttribute('id', 'float');
	shadow.innerHTML = el.outerHTML;
	shadow.style.position = 'absolute';
	shadow.style.zIndex = 'auto';
	shadow.style.minWidth = '150px';
	shadow.style.left = left + 'px';
	shadow.style.top = top + 'px';
	shadow.style.opacity = '0.7';

	document.querySelector('div#main')!.appendChild(shadow);
}

function touchMove(e: TouchEvent) {
	const mainEl = document.querySelector('div#main') as HTMLDivElement;
	const shadow = document.querySelector('div#float') as HTMLElement;
	const left = e.changedTouches[0].pageX;
	const top = e.changedTouches[0].pageY;
	shadow.style.position = 'absolute';
	shadow.style.left = left + 'px';
	shadow.style.top = top + 'px';

	if (
		e.changedTouches[0].pageY - window.scrollY > window.innerHeight - 16 &&
		e.changedTouches[0].pageY < mainEl.scrollHeight
	)
		window.scrollTo(0, window.scrollY + 16);
	if (
		e.changedTouches[0].pageY - window.scrollY < 16 &&
		window.scrollY >= 0
	)
		window.scrollTo(0, window.scrollY - 16);
}

function getTouchEndZone(e: TouchEvent): MapleDayType {
	const left = e.changedTouches[0].pageX;
	const top = e.changedTouches[0].pageY;
	const arr = document.querySelectorAll('div#day');
	for (let i = 0; i < arr.length; i++) {
		const rect = arr[i].getBoundingClientRect();
		const day = arr[i].getAttribute('data-value');
		if (
			!(
				rect.right < left ||
				rect.left > left ||
				window.scrollY + rect.bottom < top ||
				window.scrollY + rect.top > top
			) &&
			day
		)
			return day as MapleDayType;
	}
	return 'x';
}

function touchEnd(e: TouchEvent) {
	const mainEl = document.querySelector('div#main') as HTMLDivElement;
	const shadow = document.querySelector('div#float') as HTMLElement;
	mainEl.removeChild(shadow);
	const day = getTouchEndZone(e);
	data.update((d) => {
		transferData.subscribe((t) => {
			const items = JSON.parse(t) as ItemType[];

			if (items && items.length > 0) {
				items.forEach((item) => {
					const char = item.char.name;
					const boss = item.boss?.name;
					const dc = item.boss?.dc;

					if (!isExist(d, item, day)) {
						const newItem = { ...item };
						newItem.boss!.day = day;
						d.push(newItem);
						d = d.filter(
							(item) =>
								!(
									char === item.char.name &&
									boss === item.boss?.name &&
									dc === item.boss?.dc &&
									day !== item.boss?.day
								)
						);
						order.subscribe((o) => {
							d.sort((a, b) => o.indexOf(a.char.name) - o.indexOf(b.char.name));
						});
					}
				});
				localStorage.setItem('prev', JSON.stringify(d));
			}
		});
		return d;
	});
	selectedItems.set([]);
}

function openModal() {
	showModal.set(true);
	modalType.set('ItemSelect');
}

function resetSelected() {
	selectedItems.set([]);
}

function handleCharCheckbox(checked: boolean, charName: string) {
	fulfilled.subscribe((f) => {
		selectedItems.update((s) => {
			const charItems = f.filter((item) => item.char.name === charName);
			s = s.filter((item) => item.char.name !== charName);
			if (!checked) {
				s = [...s, ...charItems];
			}
			return s;
		});
	});
}

function getCounterIdx(counterIdx: number | undefined, idx: number) {
	if (counterIdx === undefined || counterIdx !== idx) return idx;
	else return undefined;
}

function isCheckedItem(selectedItems: ItemType[], item: ItemType) {
	return (
		selectedItems.filter(
			(exist) =>
				exist.char.name === item.char.name &&
				exist.boss?.name === item.boss?.name &&
				exist.boss?.dc === item.boss?.dc
		).length > 0
	);
}

function handleItemCheckbox(item: ItemType) {
	selectedItems.update((s) => {
		if (!isCheckedItem(s, item)) {
			s = [...s, item];
		} else {
			s = s.filter(
				(exist) =>
					!(
						exist.char.name === item.char.name &&
						exist.boss?.name === item.boss?.name &&
						exist.boss?.dc === item.boss?.dc
					)
			);
		}
		return s;
	});
}

function getCharsData(fulfilled: ItemType[], charArr: CharItemType[]) {
	const bossNameArr = Object.keys(bossInfo);
	return charArr
		.map((char) => fulfilled.filter((item) => item.char.name === char.name))
		.filter((arr) => arr.length > 0)
		.map((arr) =>
			arr.sort((a, b) => bossNameArr.indexOf(a.boss!.name) - bossNameArr.indexOf(b.boss!.name))
		);
}

export {
	isCheckedChar,
	isExist,
	dragStart,
	dragDrop,
	touchStart,
	touchMove,
	touchEnd,
	openModal,
	resetSelected,
	handleCharCheckbox,
	getCounterIdx,
	isCheckedItem,
	handleItemCheckbox,
	getCharsData
};
