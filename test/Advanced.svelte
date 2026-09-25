<script lang="ts">
  import { Calendar, Combobox, Command, CommandDialog, DatePicker, ToggleGroup, ToggleGroupItem } from '../src/lib/index';

  let framework = $state<string | null>(null);
  let day = $state<string | null>('2026-09-25');
  let format = $state<string | null | string[]>([]);
  let picked = $state('');
</script>

<Combobox aria-label="Framework" bind:value={framework} options={[{ value: 'react', label: 'React' }, { value: 'svelte', label: 'Svelte' }]} />
<Command options={[{ value: 'open', label: 'Open file' }, { value: 'save', label: 'Save all' }]} onSelect={(v) => (picked = v)} />
<CommandDialog options={[{ value: 'a', label: 'Alpha' }]} />
<Calendar locale="en-US" weekStartsOn={1} bind:value={day} />
<DatePicker value="2026-09-25" locale="en-US" name="due" />
<ToggleGroup type="multiple" bind:value={format} aria-label="Format">
  <ToggleGroupItem value="b">B</ToggleGroupItem>
  <ToggleGroupItem value="i">I</ToggleGroupItem>
</ToggleGroup>
<output data-testid="adv">{JSON.stringify({ framework, day, format, picked })}</output>
