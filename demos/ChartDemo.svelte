<script lang="ts">
  import Chart from '../src/lib/components/Chart.svelte';
  const data = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => ({ month, revenue: 30 + i * 3 }));
  const series = [{ key: 'revenue', label: 'Revenue' }];
</script>

<Chart type="area" {data} x="month" {series} height={200} />
