<script lang="ts">
  import {
    Alert, Button, Checkbox, createToaster, Dialog, Field, Input, Pagination, Radio, RadioGroup, Slider, Tabs, TabsContent, TabsList,
    TabsTrigger, Toaster,
  } from '../src/lib/index';

  let { store = createToaster() } = $props();
  let email = $state('');
  let agree = $state(false);
  let plan = $state('a');
  let volume = $state(20);
  let tab = $state('one');
  let page = $state(5);
  let open = $state(false);
</script>

<Button variant="soft" tone="danger" loading>Delete</Button>
<Field label="Email" error="Required" required><Input type="email" bind:value={email} /></Field>
<Checkbox label="Accept" bind:checked={agree} />
<RadioGroup bind:value={plan}><Radio value="a" label="A" /><Radio value="b" label="B" /></RadioGroup>
<Slider aria-label="Volume" max={200} bind:value={volume} />
<Tabs bind:value={tab}>
  <TabsList><TabsTrigger value="one">One</TabsTrigger><TabsTrigger value="two">Two</TabsTrigger></TabsList>
  <TabsContent value="one">First</TabsContent>
  <TabsContent value="two">Second</TabsContent>
</Tabs>
<Pagination total={10} bind:page />
<Dialog bind:open title="Edit">
  {#snippet trigger(show)}<button onclick={show}>Open dialog</button>{/snippet}
  Body
</Dialog>
<Alert tone="warning" title="Careful">Details</Alert>
<Toaster toaster={store} />
<output data-testid="state">{JSON.stringify({ email, agree, plan, volume, tab, page, open })}</output>
