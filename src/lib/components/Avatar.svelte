<script lang="ts">
  import type { Snippet } from 'svelte';
  import { avatar, type Tone } from '@manthan/base';
  import { initials } from '../context';

  interface Props {
    src?: string;
    alt?: string;
    /** Shown when there is no image; defaults to the initials of `alt`. */
    fallback?: string | Snippet;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'circle' | 'square';
    tone?: Tone;
    class?: string;
  }
  let { src, alt = '', fallback, size, shape, tone, class: className }: Props = $props();
  let failedSrc = $state<string>();
  const s = $derived(avatar({ size, shape, tone }));
</script>

<span class={s.root(className)}>
  {#if src && failedSrc !== src}
    <img {src} {alt} class={s.image()} onerror={() => (failedSrc = src)} />
  {:else}
    <span class={s.fallback()} role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      {#if typeof fallback === 'function'}{@render fallback()}{:else}{fallback ?? initials(alt)}{/if}
    </span>
  {/if}
</span>
