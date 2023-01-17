<script>
	import { fly } from 'svelte/transition';
	import Title from '$lib/components/common/Title.svelte';
	import Hbar from '$lib/components/common/Hbar.svelte';
</script>

<svelte:head>
	<title>이 페이지는?</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="w-full min-h-[70vh] flex flex-col bg-white rounded-3xl dark:bg-neutral-600" in:fly>
	<Title><span class='px-12'>이 페이지는?</span></Title>
	<div class="grow px-12 mt-4 pb-8 flex flex-col gap-12 sm:gap-16 dark:text-neutral-200">
		<Hbar />
		<div class="flex flex-col gap-8 text-lg">
			<div class="flex flex-col sm:flex-row sm:gap-2">
				<p>무슨 보스를</p>
				<p>어떻게 돌아야 할지</p>
				<p>도와주는 앱입니다</p>
			</div>
		</div>
		<Hbar />
		<p class="text-sky-900 dark:text-sky-200">SvelteKit, tailwindcss, dayjs, html2canvas</p>
		<div class="w-full h-[80px] flex justify-end gap-12 items-center text-xl">
			<span>by <strong>alskfl222</strong></span>
		</div>
	</div>
</div>
