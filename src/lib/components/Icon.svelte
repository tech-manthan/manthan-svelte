<script lang="ts">
  import type { SVGAttributes } from 'svelte/elements';
  import type { IconNode } from '@manthan/icons';

  interface Props extends SVGAttributes<SVGSVGElement> {
    icon: IconNode;
    size?: number | string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
    /** Accessible label; unlabelled icons are hidden from assistive tech. */
    title?: string;
  }
  let { icon, size = 24, strokeWidth = 2, absoluteStrokeWidth = false, title, ...rest }: Props = $props();
  const stroke = $derived(absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number.parseFloat(String(size)) : strokeWidth);
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={stroke}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-hidden={title ? undefined : 'true'}
  role={title ? 'img' : undefined}
  {...rest}
>
  {#if title}<title>{title}</title>{/if}
  {#each icon as [tag, attrs], i (i)}
    <svelte:element this={tag} {...attrs} />
  {/each}
</svg>
