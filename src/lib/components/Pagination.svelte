<script lang="ts">
  import { ChevronLeft, ChevronRight, MoreHorizontal } from '@manthan/icons';
  import { getPaginationItems, pagination } from '@manthan/base';
  import Icon from './Icon.svelte';

  interface Props {
    total: number;
    page?: number;
    siblings?: number;
    boundaries?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'ghost' | 'outline';
    getPageLabel?: (page: number) => string;
    onPageChange?: (page: number) => void;
    class?: string;
  }
  let {
    total,
    page = $bindable(1),
    siblings,
    boundaries,
    size,
    variant,
    getPageLabel = (p) => `Page ${p}`,
    onPageChange,
    class: className,
  }: Props = $props();
  const s = $derived(pagination({ size, variant }));
  const items = $derived(getPaginationItems({ page, total, siblings, boundaries }));
  const go = (p: number) => {
    page = p;
    onPageChange?.(p);
  };
</script>

<nav aria-label="Pagination" class={s.root(className)}>
  <ul class={s.list()}>
    <li><button type="button" class={s.item()} disabled={page <= 1} aria-label="Previous page" onclick={() => go(page - 1)}><Icon icon={ChevronLeft} /></button></li>
    {#each items as item (item)}
      {#if typeof item === 'number'}
        <li>
          <button type="button" class={s.item()} aria-current={item === page ? 'page' : undefined} aria-label={getPageLabel(item)} onclick={() => go(item)}>{item}</button>
        </li>
      {:else}
        <li class={s.ellipsis()} aria-hidden="true"><Icon icon={MoreHorizontal} size={16} /></li>
      {/if}
    {/each}
    <li><button type="button" class={s.item()} disabled={page >= total} aria-label="Next page" onclick={() => go(page + 1)}><Icon icon={ChevronRight} /></button></li>
  </ul>
</nav>
