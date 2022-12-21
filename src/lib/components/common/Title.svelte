<script lang="ts">
	export let type: string = 'l';
	let titleStyle: string = 'px-12 py-8 text-3xl font-bold text-slate-700';

	$: {
		if (type === 's') titleStyle = 'px-4 py-6 text-xl font-bold text-slate-700';
	}
</script>

<h1 class={titleStyle}><slot /></h1>
