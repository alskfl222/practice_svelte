import { writable } from 'svelte/store';
import type { BossDCType, BossItemType } from '../types';

export const maxBossCount = 2;

export const initBoss: BossItemType = {
	name: '',
	dc: '',
	day: 'x',
	headcount: 1,
	required: false,
};

export const boss = writable<BossItemType>(initBoss);
export const bosses = writable<BossItemType[]>([])


export const bossInfo: {
	[key in string]: {
		image: string;
		dc: BossDCType;
	};
} = {
	시그너스: {
		image: '/images/boss/a.jpeg',
		dc: {
			EASY: 100,
			NORMAL: 200,
		}
	},
	힐라: {
		image: '/images/boss/b.jpeg',
		dc: {
			HARD: 400
		}
	},
	핑크빈: {
		image: '/images/boss/c.jpeg',
		dc: {
			CHAOS: 400
		}
	},
	자쿰: {
		image: '/images/boss/a.jpeg',
		dc: {
			CHAOS: 500
		}
	},
	피에르: {
		image: '/images/boss/a.jpeg',
		dc: {
			CHAOS: 500
		}
	},
	반반: {
		image: '/images/boss/a.jpeg',
		dc: {
			CHAOS: 500
		}
	},
	'블러디 퀸': {
		image: '/images/boss/a.jpeg',
		dc: {
			CHAOS: 500
		}
	},
	벨룸: {
		image: '/images/boss/a.jpeg',
		dc: {
			CHAOS: 500
		}
	},
	매그너스: {
		image: '/images/boss/a.jpeg',
		dc: {
			CHAOS: 500
		}
	},
	파풀라투스: {
		image: '/images/boss/a.jpeg',
		dc: {
			CHAOS: 500
		}
	},
	스우: {
		image: '/images/boss/a.jpeg',
		dc: {
			NORMAL: 600,
			HARD: 5000
		}
	},
	데미안: {
		image: '/images/boss/a.jpeg',
		dc: {
			NORMAL: 600,
			HARD: 5000
		}
	},
	루시드: {
		image: '/images/boss/a.jpeg',
		dc: {
			EASY: 400,
			NORMAL: 600,
			HARD: 5000
		}
	},
	윌: {
		image: '/images/boss/a.jpeg',
		dc: {
			EASY: 400,
			NORMAL: 600,
			HARD: 5000
		}
	},
	'가디언 엔젤 슬라임': {
		image: '/images/boss/a.jpeg',
		dc: {
			NORMAL: 600,
			CHAOS: 5000
		}
	},
	더스크: {
		image: '/images/boss/a.jpeg',
		dc: {
			NORMAL: 600,
			CHAOS: 5000
		}
	},
	듄켈: {
		image: '/images/boss/a.jpeg',
		dc: {
			NORMAL: 600,
			HARD: 5000
		}
	},
	'진 힐라': {
		image: '/images/boss/a.jpeg',
		dc: {
			NORMAL: 600,
			HARD: 5000
		}
	},
	'검은 마법사': {
		image: '/images/boss/b.jpeg',
		dc: {
			HARD: 1000000000,
			EXTREME: 3000000000
		}
	},
	'선택받은 세렌': {
		image: '/images/boss/c.jpeg',
		dc: {
			NORMAL: 100000000,
			HARD: 250000000
		}
	},
	'감시자 칼로스': {
		image: '/images/boss/c.jpeg',
		dc: {
			NORMAL: 100000000,
			HARD: 250000000
		}
	}
};
