import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ postcss: true }),

	kit: {
		adapter: adapter(),
		alias: {
			$stores: 'src/stores',
			$types: 'src/types',
			$utils: 'src/utils'
		}
	}
};

export default config;
