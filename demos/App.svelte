<script lang="ts">
  import { demos } from './registry';

  const slug = new URLSearchParams(location.search).get('c') as keyof typeof demos | null;
  const Demo = slug ? demos[slug] : undefined;
</script>

{#if Demo}
  <Demo />
{:else}
  <p>Demo not found for "{slug}".</p>
{/if}
