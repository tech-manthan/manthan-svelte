<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { IconNode } from '@manthan/icons';
  import { alert, type Tone } from '@manthan/base';
  import { toastIcons } from '@manthan/base/dom';
  import Icon from './Icon.svelte';

  interface Props {
    tone?: Tone;
    variant?: 'soft' | 'surface' | 'outline' | 'solid';
    title?: string;
    /** Custom icon, or `false` to hide it. */
    icon?: IconNode | false;
    class?: string;
    children?: Snippet;
  }
  let { tone = 'info', variant, title, icon, class: className, children }: Props = $props();
  const s = $derived(alert({ tone, variant }));
  const node = $derived(icon === false ? undefined : (icon ?? toastIcons[tone]));
</script>

<div role="alert" class={s.root(className)}>
  {#if node}<Icon icon={node} class={s.icon()} />{/if}
  <div class={s.content()}>
    {#if title}<div class={s.title()}>{title}</div>{/if}
    {#if children}<div class={s.description()}>{@render children()}</div>{/if}
  </div>
</div>
