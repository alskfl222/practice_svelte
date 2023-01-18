<script lang="ts">
	export let type: keyof typeof titleStyle = 'l';
	const titleStyle = {
		l: 'py-8 flex justify-between text-2xl font-bold text-neutral-700 dark:text-neutral-200 whitespace-nowrap',
		s: 'py-6 flex justify-between text-xl font-bold text-neutral-700 dark:text-neutral-200 whitespace-nowrap'
	};
</script>

<h1 class={titleStyle[type]}><slot /></h1>
