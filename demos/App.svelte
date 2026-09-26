<script lang="ts">
  import { demoProps, demos } from './registry';

  const slug = new URLSearchParams(location.search).get('c') as keyof typeof demos | null;
  const Demo = slug ? demos[slug] : undefined;
</script>

{#if Demo}
  {#if slug === 'button'}
    <Demo {...demoProps[slug]}>Click me</Demo>
  {:else}
    <Demo {...demoProps[slug!]} />
  {/if}
{:else}
  <p>Demo not found for "{slug}".</p>
{/if}
