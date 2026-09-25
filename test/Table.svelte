<script lang="ts">
  import { DataTable } from '../src/lib/index';
  const rows = Array.from({ length: 12 }, (_, i) => ({ id: String(i + 1), name: `User ${i + 1}`, score: (i * 7) % 10 }));
  let selected = $state<string[]>([]);
</script>

<DataTable
  {rows}
  pageSize={5}
  selectable
  bind:selected
  columns={[
    { key: 'name', header: 'Name' },
    { key: 'score', header: 'Score', align: 'end', searchable: false },
  ]}
>
  {#snippet cell(row, col, value)}{#if col.key === 'score'}<strong>{value}</strong>{:else}{value}{/if}{/snippet}
</DataTable>
<output data-testid="sel">{JSON.stringify(selected)}</output>
