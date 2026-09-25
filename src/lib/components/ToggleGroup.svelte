<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { toggleGroup, type Tone } from '@manthan/base';
  import { createRovingFocus } from '@manthan/base/dom';
  import { toggleGroupContext } from '../context';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    type?: 'single' | 'multiple';
    /** `string | null` for single, `string[]` for multiple. */
    value?: string | null | string[];
    onValueChange?: (value: string | null | string[]) => void;
    variant?: 'segmented' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
    orientation?: 'horizontal' | 'vertical';
    disabled?: boolean;
  }
  let {
    type = 'single',
    value = $bindable(null),
    onValueChange,
    variant,
    size,
    tone,
    orientation = 'horizontal',
    disabled,
    class: className,
    children,
    ...rest
  }: Props = $props();
  let el: HTMLDivElement;
  const s = $derived(toggleGroup({ variant, size, tone }));
  const list = $derived(Array.isArray(value) ? value : value ? [value] : []);

  toggleGroupContext.set({
    isPressed: (v) => list.includes(v),
    toggle(v) {
      value = type === 'multiple' ? (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]) : value === v ? null : v;
      onValueChange?.(value);
    },
    get itemClass() {
      return s.item();
    },
    get disabled() {
      return disabled;
    },
  });
  $effect(() => createRovingFocus(el, { selector: 'button', orientation }).destroy);
</script>

<div bind:this={el} role="group" data-orientation={orientation} class={s.root(className as string)} {...rest}>{@render children?.()}</div>
