<script lang="ts">
  import { Mail, Settings, Trash, User, LogOut } from '@manthan/icons';
  const trend = [31, 33, 32, 36, 35, 38, 41, 40, 43, 44, 46, 48];
  const finance = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => ({ month, revenue: 30 + i * 3 + (i % 2) * 2, costs: 22 + i }));
  const financeSeries = [{ key: 'revenue', label: 'Revenue' }, { key: 'costs', label: 'Costs' }];
  import {
    Chart,
    Stat,
    Accordion, AccordionItem, Alert, Avatar, Badge, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
    Checkbox, Dialog, designStyles, Field, Heading, Icon, Input, Menu, MenuItem, MenuLabel, MenuSeparator, Pagination, Popover,
    Progress, ProgressCircle, Radio, RadioGroup, Select, Slider, Switch, Tabs, TabsContent, TabsList, TabsTrigger, toast, Toaster, Tooltip,
  } from '../src/lib/index';

  const params = new URLSearchParams(location.search);
  let style = $state(params.get('style') ?? 'default');
  let dark = $state(params.get('theme') === 'dark');
  let volume = $state(40);
  let plan = $state('pro');
  let agree = $state(true);
  let tab = $state('overview');
  let page = $state(4);
  $effect(() => {
    document.documentElement.dataset.mnStyle = style;
    document.documentElement.dataset.mnTheme = dark ? 'dark' : 'light';
  });
</script>

<main class="mx-auto flex max-w-5xl flex-col gap-8 p-6">
  <header class="flex flex-wrap items-center gap-3">
    <Heading level={1} size={3} class="me-auto">@manthan/svelte</Heading>
    <div class="w-44"><Select bind:value={style} aria-label="Style" size="sm" options={designStyles.map((s) => ({ value: s.id, label: s.label }))} /></div>
    <Switch bind:checked={dark} label="Dark" />
  </header>
  <div class="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Runes, snippets and bind: everywhere.</CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <Field label="Email" description="We never share it." required>
          <Input type="email" placeholder="you@example.com">{#snippet start()}<Icon icon={Mail} />{/snippet}</Input>
        </Field>
        <RadioGroup bind:value={plan} orientation="horizontal">
          <Radio value="hobby" label="Hobby" /><Radio value="pro" label="Pro" /><Radio value="team" label="Team" />
        </RadioGroup>
        <Checkbox bind:checked={agree} label="I agree to the terms" />
        <Field label="Volume: {volume}"><Slider bind:value={volume} /></Field>
      </CardContent>
      <CardFooter>
        <Button onclick={() => toast.success({ title: 'Account created', description: `Plan: ${plan}` })}>Sign up</Button>
        <Button variant="ghost" tone="neutral">Cancel</Button>
      </CardFooter>
    </Card>
    <div class="flex flex-col gap-6">
      <Card>
        <div class="flex flex-wrap items-center gap-3">
          <Dialog title="Delete project?" description="This permanently deletes the project.">
            {#snippet trigger(show)}<Button tone="danger" variant="soft" onclick={show}><Icon icon={Trash} /> Delete</Button>{/snippet}
            {#snippet footer(close)}
              <Button variant="surface" tone="neutral" onclick={close}>Cancel</Button>
              <Button tone="danger" onclick={() => { close(); toast.error('Project deleted'); }}>Delete</Button>
            {/snippet}
          </Dialog>
          <Menu>
            {#snippet trigger()}<Button variant="surface" tone="neutral"><Icon icon={User} /> Account</Button>{/snippet}
            <MenuLabel>ada@example.com</MenuLabel>
            <MenuItem shortcut="⇧⌘P">{#snippet icon()}<Icon icon={User} />{/snippet}Profile</MenuItem>
            <MenuItem onSelect={() => toast.info('Settings')}>{#snippet icon()}<Icon icon={Settings} />{/snippet}Settings</MenuItem>
            <MenuSeparator />
            <MenuItem tone="danger">{#snippet icon()}<Icon icon={LogOut} />{/snippet}Log out</MenuItem>
          </Menu>
          <Popover title="Dimensions" description="Anchored with flip & shift.">
            {#snippet trigger()}<Button variant="outline">Popover</Button>{/snippet}
            <Input size="sm" value="100%" aria-label="Width" class="mt-3" />
          </Popover>
          <Tooltip content="Settings"><Button iconOnly variant="ghost" aria-label="Settings"><Icon icon={Settings} /></Button></Tooltip>
        </div>
      </Card>
      <Tabs bind:value={tab} variant="segmented">
        <TabsList><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="analytics">Analytics</TabsTrigger></TabsList>
        <TabsContent value="overview" class="flex items-center gap-4">
          <ProgressCircle value={72} size="lg" tone="success" />
          <div class="flex flex-1 flex-col gap-2"><Progress value={volume} /><Progress indeterminate tone="info" size="sm" /></div>
        </TabsContent>
        <TabsContent value="analytics">Analytics panel</TabsContent>
      </Tabs>
      <Alert tone="success" title="Deployed">Your site is live.</Alert>
      <div class="flex items-center gap-2"><Avatar alt="Grace Hopper" /><Avatar alt="Alan Turing" tone="success" /><Badge>New</Badge></div>
    </div>
  </div>
  <Accordion>
    <AccordionItem title="Is it accessible?" open>Yes: native elements and WAI-ARIA patterns.</AccordionItem>
    <AccordionItem title="Can I theme it?">Eleven styles plus your own tokens.</AccordionItem>
  </Accordion>
  <Pagination bind:page total={12} />
  <Toaster />
  <div class="grid gap-6 md:grid-cols-3">
    <Card><Stat label="Revenue" value="$48.2K" delta="+12.4%" sentiment="positive" caption="vs last month" {trend} /></Card>
    <Card class="md:col-span-2"><Chart type="area" title="Revenue vs costs" data={finance} x="month" series={financeSeries} /></Card>
  </div>
</main>
