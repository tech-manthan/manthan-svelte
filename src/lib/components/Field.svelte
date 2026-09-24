<script lang="ts">
  import type { Snippet } from 'svelte';
  import { field } from '@manthan/base';
  import { fieldContext } from '../context';

  interface Props {
    label?: string;
    description?: string;
    /** Error message; also marks the control aria-invalid. */
    error?: string;
    required?: boolean;
    disabled?: boolean;
    id?: string;
    class?: string;
    children: Snippet;
  }
  let { label, description, error, required, disabled, id, class: className, children }: Props = $props();
  const auto = $props.id();
  const controlId = $derived(id ?? `field-${auto}`);
  const s = $derived(field({ required, disabled }));
  fieldContext.set({
    get id() {
      return controlId;
    },
    get describedBy() {
      return [description && `${controlId}-description`, error && `${controlId}-error`].filter(Boolean).join(' ') || undefined;
    },
    get invalid() {
      return !!error;
    },
    get required() {
      return required;
    },
    get disabled() {
      return disabled;
    },
  });
</script>

<div class={s.root(className)}>
  {#if label}<label for={controlId} class={s.label()}>{label}</label>{/if}
  {@render children()}
  {#if description}<p id="{controlId}-description" class={s.description()}>{description}</p>{/if}
  {#if error}<p id="{controlId}-error" class={s.error()}>{error}</p>{/if}
</div>
