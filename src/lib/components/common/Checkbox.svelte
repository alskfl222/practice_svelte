<script lang="ts">
	export let checked: boolean = false;
	export let indeterminate: boolean = false;
	export let onClick: Function = () => {};
</script>

<input
	type="checkbox"
	class="appearance-none w-6 h-6 border-2 rounded-sm grid place-content-center"
	{checked}
	{indeterminate}
	on:click|stopPropagation={() => onClick()}
/>

<style lang="scss">
	input[type='checkbox']::before {
		content: '';
		width: 1rem;
		height: 1rem;
		transform: scale(0);
		box-shadow: inset 1em 1em rgba(0, 0, 0, 0.2);
	}

	input[type='checkbox']:indeterminate::before {
		transform: scale(0.9, 0.3);
		clip-path: none;
	}

	input[type='checkbox']:checked::before {
		transform: scale(1);
		clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
	}

	:global(*.dark input[type='checkbox']::before) {
		box-shadow: inset 1em 1em rgba(222, 222, 222, 0.8);
	}
</style>