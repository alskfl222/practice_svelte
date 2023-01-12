import { writable } from 'svelte/store';

export const showModal = writable<boolean>(false);
export const modalType = writable<string | null>(null);
export const messageType = writable<string | null>(null);

export const message = {
  duplicateChar: '캐릭터 이름이 중복입니다'
}