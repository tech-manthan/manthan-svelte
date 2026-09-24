<script lang="ts">
  import type { Snippet } from 'svelte';
  import { radio, type Tone } from '@manthan/base';
  import { radioGroupContext } from '../context';

  interface Props {
    value: string;
    label?: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
    disabled?: boolean;
    class?: string;
    children?: Snippet;
  }
  let { value, label, description, size, tone, disabled, class: className, children }: Props = $props();
  const group = radioGroupContext.get();
  const s = $derived(radio({ size: size ?? group?.size, tone: tone ?? group?.tone }));
</script>

<label class={s.label(className)}>
  <span class={s.root()}>
    <input
      type="radio"
      {value}
      name={group?.name}
      checked={group ? group.value === value : undefined}
      disabled={disabled ?? group?.disabled}
      class={s.input()}
      onchange={() => group?.select(value)}
    />
    <span class={s.control()}><span class={s.dot()}></span></span>
  </span>
  {#if label || description || children}
    <span class={s.text()}>
      {#if children}{@render children()}{:else}{label}{/if}
      {#if description}<span class={s.description()}>{description}</span>{/if}
    </span>
  {/if}
</label>
