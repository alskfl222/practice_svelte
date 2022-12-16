<script lang="ts">
	import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let type: string;
  export let text: string = '';

  const onClick = () => {
    console.log('click')
    return () => {
      dispatch('click', type)
    }
  }
</script>

<button class='' on:click={onClick}>
  {text}
</button>