<script lang="ts">
  import DataTable from '../src/lib/components/DataTable.svelte';
  const rows = [
    { id: 'INV-1001', customer: 'Ada Lovelace', status: 'Paid' },
    { id: 'INV-1002', customer: 'Alan Turing', status: 'Pending' },
    { id: 'INV-1003', customer: 'Grace Hopper', status: 'Overdue' },
  ];
  const columns = [
    { key: 'id', header: 'Invoice' },
    { key: 'customer', header: 'Customer' },
    { key: 'status', header: 'Status' },
  ];
</script>

<DataTable {columns} {rows} pageSize={3} />
