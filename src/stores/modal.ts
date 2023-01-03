import { writable } from 'svelte/store';

export const showModal = writable<boolean>(false);
export const modalType = writable<string | null>(null);
