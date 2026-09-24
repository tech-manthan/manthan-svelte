<script lang="ts">
  import { X } from '@manthan/icons';
  import { button, closeButton, spinner, toast as defaultToaster, toastRecipe, type ToastRecord, type ToastStore } from '@manthan/base';
  import { toastIcons } from '@manthan/base/dom';
  import Icon from './Icon.svelte';

  interface Props {
    toaster?: ToastStore;
    placement?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
    label?: string;
    class?: string;
  }
  let { toaster = defaultToaster, placement = 'bottom-right', label = 'Notifications', class: className }: Props = $props();
  let toasts = $state.raw<readonly ToastRecord[]>([]);
  $effect(() => {
    toasts = toaster.getSnapshot();
    return toaster.subscribe(() => (toasts = toaster.getSnapshot()));
  });
</script>

<section
  aria-label={label}
  aria-live="polite"
  class={toastRecipe({ placement }).region(className)}
  onpointerenter={toaster.pause}
  onpointerleave={toaster.resume}
>
  {#each toasts as t (t.id)}
    {@const s = toastRecipe({ placement, tone: t.tone })}
    {@const icon = t.tone ? toastIcons[t.tone] : undefined}
    <div role={t.tone === 'danger' ? 'alert' : 'status'} data-state={t.state} class={s.root()}>
      {#if t.loading}
        <span class={spinner({ size: 'sm', class: 'mt-0.5 text-accent-11' })} aria-hidden="true"></span>
      {:else if t.icon !== false && icon}
        <Icon {icon} class={s.icon()} />
      {/if}
      <div class={s.content()}>
        {#if t.title}<div class={s.title()}>{t.title}</div>{/if}
        {#if t.description}<div class={s.description()}>{t.description}</div>{/if}
        {#if t.action}
          <div class={s.actions()}>
            <button
              type="button"
              class={button({ size: 'xs', variant: 'soft' })}
              onclick={() => {
                t.action!.onClick();
                toaster.dismiss(t.id);
              }}>{t.action.label}</button
            >
          </div>
        {/if}
      </div>
      <button type="button" aria-label="Dismiss notification" class={closeButton({ class: s.close() })} onclick={() => toaster.dismiss(t.id)}>
        <Icon icon={X} />
      </button>
    </div>
  {/each}
</section>
