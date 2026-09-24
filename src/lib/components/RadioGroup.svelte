<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { radioGroup, type Tone } from '@manthan/base';
  import { radioGroupContext } from '../context';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value?: string;
    name?: string;
    orientation?: 'horizontal' | 'vertical';
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
  }
  let { value = $bindable(), name, orientation, size, tone, disabled, onValueChange, class: className, children, ...rest }: Props = $props();
  const auto = $props.id();
  radioGroupContext.set({
    get name() {
      return name ?? `radio-${auto}`;
    },
    get value() {
      return value;
    },
    select(next) {
      value = next;
      onValueChange?.(next);
    },
    get size() {
      return size;
    },
    get tone() {
      return tone;
    },
    get disabled() {
      return disabled;
    },
  });
</script>

<div role="radiogroup" aria-orientation={orientation} class={radioGroup({ orientation, class: className as string })} {...rest}>
  {@render children?.()}
</div>
