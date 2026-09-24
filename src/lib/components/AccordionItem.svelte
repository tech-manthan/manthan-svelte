<script lang="ts">
  import type { Snippet } from 'svelte';
  import { ChevronDown } from '@manthan/icons';
  import { accordion } from '@manthan/base';
  import { accordionContext } from '../context';
  import Icon from './Icon.svelte';

  interface Props {
    title: string | Snippet;
    open?: boolean;
    class?: string;
    children?: Snippet;
  }
  let { title, open = $bindable(false), class: className, children }: Props = $props();
  const ctx = accordionContext.get();
  const s = $derived(ctx?.slots ?? accordion());
</script>

<details name={ctx?.name} bind:open class={s.item(className)}>
  <summary class={s.trigger()}>
    {#if typeof title === 'function'}{@render title()}{:else}{title}{/if}
    <Icon icon={ChevronDown} class={s.icon()} />
  </summary>
  <div class={s.content()}>{@render children?.()}</div>
</details>
