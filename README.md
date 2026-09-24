# @manthan/svelte

[Manthan UI](https://github.com/tech-manthan/manthan-base) for **Svelte 5**: accessible components in **11 design styles**, styled with **Tailwind CSS v4**. Written with runes and snippets, and every input supports `bind:`.

```bash
npm i @manthan/svelte @manthan/base @manthan/icons tailwindcss
```

```css
/* app.css */
@import 'tailwindcss';
@import '@manthan/svelte/theme.css';
```

```svelte
<script lang="ts">
  import { Button, Dialog, Field, Icon, Input, Toaster, toast } from '@manthan/svelte';
  import { Mail } from '@manthan/icons';
  let email = $state('');
</script>

<Field label="Email" error={email ? undefined : 'Required'}>
  <Input type="email" bind:value={email}>{#snippet start()}<Icon icon={Mail} />{/snippet}</Input>
</Field>

<Dialog title="Delete project?">
  {#snippet trigger(open)}<Button tone="danger" onclick={open}>Delete</Button>{/snippet}
  This cannot be undone.
  {#snippet footer(close)}<Button onclick={close}>Cancel</Button>{/snippet}
</Dialog>

<Button onclick={() => toast.success('Saved')}>Save</Button>
<Toaster />
```

Set the style on `<html data-mn-style="clay" data-mn-theme="system">`: `default`, `glass`, `neu`, `brutal`, `material`, `fluent`, `clay`, `retro`, `neon`, `minimal`, `skeuo`.

## Components

| Group | Components |
| --- | --- |
| Actions | `Button`, `ButtonGroup` |
| Forms | `Field`, `Input` (`start` / `end` snippets), `Textarea`, `Select`, `Checkbox` (`bind:checked`, `bind:indeterminate`), `RadioGroup` + `Radio`, `Switch`, `Slider` |
| Display | `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Badge`, `Avatar`, `AvatarGroup`, `Table` (+ parts), `Kbd`, `Separator`, `Heading`, `Icon` |
| Navigation | `Tabs` (+ `TabsList`, `TabsTrigger`, `TabsContent`), `Accordion` + `AccordionItem`, `Breadcrumb`, `Pagination` (`bind:page`) |
| Overlays | `Dialog` (`bind:open`, `placement` for drawers), `Popover`, `Menu` (+ `MenuItem`, `MenuLabel`, `MenuSeparator`), `Tooltip`, `Toaster` + `toast()` |
| Feedback | `Alert`, `Progress`, `ProgressCircle`, `Spinner`, `Skeleton` |

Recipes and helpers from `@manthan/base` are re-exported. Works in SvelteKit (SSR-safe ids via `$props.id()`).

## Development

```bash
npm run dev        # playground
npm test
npm run typecheck  # svelte-check
npm run build      # svelte-package
```

## License

MIT
