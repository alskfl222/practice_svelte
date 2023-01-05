<script lang="ts">
	export let type: keyof typeof titleStyle = 'l';
	const titleStyle = {
		l: 'px-4 pt-8 pb-4 text-2xl font-bold text-slate-700 whitespace-nowrap',
		s: 'px-4 pt-8 pb-4 text-xl font-bold text-slate-700 whitespace-nowrap'
	};
</script>

<h1 class={titleStyle[type]}><slot /></h1>
