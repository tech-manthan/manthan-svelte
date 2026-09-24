<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import { button, spinner, type Tone } from '@manthan/base';

  interface Props extends HTMLButtonAttributes {
    variant?: 'solid' | 'soft' | 'surface' | 'outline' | 'ghost' | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    tone?: Tone;
    iconOnly?: boolean;
    fullWidth?: boolean;
    /** Shows a spinner, sets aria-busy and disables the button. */
    loading?: boolean;
    ref?: HTMLButtonElement;
  }
  let {
    variant,
    size,
    tone,
    iconOnly,
    fullWidth,
    loading = false,
    disabled,
    type = 'button',
    class: className,
    children,
    ref = $bindable(),
    ...rest
  }: Props = $props();
</script>

<button
  bind:this={ref}
  {type}
  disabled={disabled || loading}
  aria-busy={loading || undefined}
  class={button({ variant, size, tone, iconOnly, fullWidth, class: className as string })}
  {...rest}
>
  {#if loading}<span class={spinner({ size: 'sm' })} aria-hidden="true"></span>{/if}
  {@render children?.()}
</button>
