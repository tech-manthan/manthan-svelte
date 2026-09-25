<script lang="ts" generics="T">
  import type { Snippet } from 'svelte';
  import { ArrowDown, ArrowUp, ArrowUpDown, Search } from '@manthan/icons';
  import {
    ariaSort,
    cellAlign,
    dataTable,
    formatCell,
    getSelectionState,
    getTableView,
    nextSort,
    table,
    toggleAll,
    toggleId,
    type ColumnDef,
    type SortState,
  } from '@manthan/base';
  import Checkbox from './Checkbox.svelte';
  import Icon from './Icon.svelte';
  import Input from './Input.svelte';
  import Pagination from './Pagination.svelte';

  interface Props {
    columns: ColumnDef<T>[];
    rows: T[];
    getRowId?: (row: T, index: number) => string;
    /** 0 shows every row. */
    pageSize?: number;
    searchable?: boolean;
    searchPlaceholder?: string;
    selectable?: boolean;
    selected?: string[];
    sort?: SortState | null;
    caption?: string;
    emptyText?: string;
    striped?: boolean;
    size?: 'sm' | 'md';
    /** Custom cell content: receives the row, the column and the formatted value. */
    cell?: Snippet<[T, ColumnDef<T>, string]>;
    toolbar?: Snippet;
    class?: string;
  }
  let {
    columns,
    rows,
    getRowId = (row, i) => String((row as { id?: unknown }).id ?? i),
    pageSize = 10,
    searchable = true,
    searchPlaceholder = 'Search…',
    selectable = false,
    selected = $bindable([]),
    sort = $bindable(null),
    caption,
    emptyText = 'No results.',
    striped,
    size,
    cell,
    toolbar,
    class: className,
  }: Props = $props();

  let query = $state('');
  let page = $state(1);
  const s = dataTable();
  const t = $derived(table({ striped, size }));
  const ids = $derived(new Map(rows.map((row, i) => [row, getRowId(row, i)])));
  const view = $derived(getTableView(rows, { columns, sort, query, page, pageSize }));
  const visibleIds = $derived(view.rows.map((r) => ids.get(r)!));
  const all = $derived(getSelectionState(visibleIds, selected));
</script>

<div class={s.root(className)}>
  <div class={s.toolbar()}>
    {#if searchable}
      <Input
        type="search"
        size="sm"
        aria-label="Search table"
        placeholder={searchPlaceholder}
        class={s.search()}
        value={query}
        oninput={(e) => {
          query = e.currentTarget.value;
          page = 1;
        }}
      >
        {#snippet start()}<Icon icon={Search} />{/snippet}
      </Input>
    {/if}
    {@render toolbar?.()}
    <div class={s.summary()} aria-live="polite">
      {selectable && selected.length ? `${selected.length} of ${rows.length} selected` : `${view.total} ${view.total === 1 ? 'row' : 'rows'}`}
    </div>
  </div>
  <div class={t.root()}>
    <table class={t.table()}>
      {#if caption}<caption class={t.caption()}>{caption}</caption>{/if}
      <thead class={t.header()}>
        <tr class={t.row()}>
          {#if selectable}
            <th class={t.head(s.selectCell())}>
              <Checkbox
                size="sm"
                aria-label="Select all rows on this page"
                checked={all === 'all'}
                indeterminate={all === 'some'}
                onchange={() => (selected = toggleAll(selected, visibleIds))}
              />
            </th>
          {/if}
          {#each columns as col (col.key)}
            {@const active = sort?.key === col.key}
            <th scope="col" aria-sort={ariaSort(sort, col.key)} style:width={col.width} class={t.head(cellAlign[col.align ?? 'start'])}>
              {#if col.sortable === false}
                {col.header}
              {:else}
                <button type="button" class={s.sortButton()} onclick={() => (sort = nextSort(sort, col.key))}>
                  {col.header}
                  <Icon icon={active ? (sort!.direction === 'asc' ? ArrowUp : ArrowDown) : ArrowUpDown} data-active={active ? '' : undefined} class={s.sortIcon()} />
                </button>
              {/if}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody class={t.body()}>
        {#if view.rows.length === 0}
          <tr><td colspan={columns.length + (selectable ? 1 : 0)} class={s.empty()}>{emptyText}</td></tr>
        {/if}
        {#each view.rows as row (ids.get(row))}
          {@const id = ids.get(row)!}
          <tr aria-selected={selectable ? selected.includes(id) : undefined} class={t.row()}>
            {#if selectable}
              <td class={t.cell(s.selectCell())}>
                <Checkbox size="sm" aria-label="Select row {id}" checked={selected.includes(id)} onchange={() => (selected = toggleId(selected, id))} />
              </td>
            {/if}
            {#each columns as col (col.key)}
              <td class={t.cell(cellAlign[col.align ?? 'start'])}>
                {#if cell}{@render cell(row, col, formatCell(row, col))}{:else}{formatCell(row, col)}{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <div class={s.footer()}>
    <span class="tabular-nums">{view.total ? `${view.start}–${view.end} of ${view.total}` : '0 results'}</span>
    {#if view.pageCount > 1}
      <Pagination size="sm" total={view.pageCount} page={view.page} onPageChange={(p) => (page = p)} />
    {/if}
  </div>
</div>
