<script>
	import { fly } from 'svelte/transition';
	import Title from '$lib/components/pc/common/Title.svelte';
	import Hbar from '$lib/components/pc/common/Hbar.svelte';
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="w-full max-w-[1200px] min-h-[70vh] flex flex-col bg-white rounded-3xl" in:fly>
	<Title>보스 관리 <i class="fa-solid fa-circle-question" /></Title>
	<Hbar />
	<div class="grow px-12 py-8 flex flex-col justify-between">
		<div class="flex flex-col gap-9 text-lg">
			<div>
				<p>무슨 보스를</p>
				<p>어떻게 돌아야 할지</p>
				<p>도와주는 앱입니다</p>
			</div>
			<Hbar />
			<p class="text-sky-900">SvelteKit, tailwindcss</p>
		</div>
		<div class="w-full h-[80px] flex justify-end gap-12 items-center text-xl">
			<span>by <strong>alskfl222</strong></span>
			<div class="flex gap-6">
				<span class="text-3xl"
					><a href="https://github.com/alskfl222/practice_svelte/"
						><i class="fa-brands fa-github" /></a
					></span
				>
				<span class="text-3xl"
					><a href="mailto: alskfl222@kakao.com"><i class="fa-solid fa-envelope" /></a></span
				>
			</div>
		</div>
	</div>
</div>
