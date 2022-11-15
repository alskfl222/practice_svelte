<script lang="ts">
	import { store, charIndex } from '../../stores';
	function changeChar(index: number) {
		$charIndex = index;
	}
</script>

{#if $store.length > 0}
	<section>
		{#each $store as char, index}
			<div class:selected={index === $charIndex} on:click={() => changeChar(index)}>
				<p>{index}</p>
				<p>{char.name}</p>
				<p>{char.class}</p>
				<div class="flex">
					{#each char.boss as boss}
						<div>{boss.name}</div>
						<img src={boss.image} alt={boss.name} />
						<div>{JSON.stringify(boss.difficulty)}</div>
					{/each}
				</div>
			</div>
		{/each}
	</section>
{/if}

<style lang="scss">
	img {
		width: 80px;
		height: 80px;
		object-fit: cover;
	}

	.selected {
		border: 1px solid black;
	}
</style>
