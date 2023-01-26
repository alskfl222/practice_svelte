import { fulfilled } from '$stores';
import { selectedItems } from '$stores/calendar';
import { showModal, modalType } from '$stores/modal';
import type { ItemType, CharItemType } from '$types';

function isCheckedChar(fulfilled: ItemType[], selected: ItemType[], charItemsArr: ItemType[]) {
	return (
		fulfilled.filter((item) => item.char.name === charItemsArr[0].char.name).length ===
		selected.filter((item) => item.char.name === charItemsArr[0].char.name).length
	);
}

function dragStart(e: DragEvent, items: ItemType[]) {
	e.dataTransfer?.setData('text/plain', JSON.stringify(items));
}

function openModal() {
	showModal.set(true);
	modalType.set('ItemSelect');
}

function resetSelected() {
	selectedItems.set([]);
	openModal();
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
	return charArr
		.map((char) => fulfilled.filter((item) => item.char.name === char.name))
		.filter((arr) => arr.length > 0);
}

export {
	isCheckedChar,
	dragStart,
	openModal,
	resetSelected,
	handleCharCheckbox,
	getCounterIdx,
	isCheckedItem,
	handleItemCheckbox,
	getCharsData
};
