<script lang="ts">
  import { ChevronRight } from '@manthan/icons';
  import { breadcrumb } from '@manthan/base';
  import Icon from './Icon.svelte';

  let { items, class: className }: { items: Array<{ label: string; href?: string }>; class?: string } = $props();
  const s = breadcrumb();
</script>

<nav aria-label="Breadcrumb" class={s.root(className)}>
  <ol class={s.list()}>
    {#each items as item, i (i)}
      {@const last = i === items.length - 1}
      <li class={s.item()}>
        {#if last || !item.href}
          <span aria-current={last ? 'page' : undefined} class={last ? s.page() : undefined}>{item.label}</span>
        {:else}
          <a href={item.href} class={s.link()}>{item.label}</a>
        {/if}
        {#if !last}<span role="presentation" aria-hidden="true" class={s.separator()}><Icon icon={ChevronRight} /></span>{/if}
      </li>
    {/each}
  </ol>
</nav>
