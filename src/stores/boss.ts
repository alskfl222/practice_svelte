import { writable } from 'svelte/store';
import type { BossDCType, SelectBossType } from '../types';
import type { bossInfo } from "./index";

const initSelectBoss: SelectBossType = {
  bossName: '',
  bossDC: '',
  headcount: 1,
  required: false,
}

