import adapterStatic from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ postcss: true }),

	kit: {
		// adapter: adapterStatic({
		// fallback: 'index.html'
		// }),
		// prerender: { entries: [] },
		adapter: adapterStatic({ strict: false }),
		// adapter: adapter(),
		alias: {
			$stores: 'src/stores',
			$types: 'src/types',
			$utils: 'src/utils'
		}
	}
};

export default config;
