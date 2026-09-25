<script lang="ts" generics="T extends Record<string, unknown> = Record<string, unknown>">
  import { untrack } from 'svelte';
  import { chart } from '@manthan/base';
  import { createChart, type ChartController, type ChartControllerOptions } from '@manthan/base/dom';

  /**
   * Line, area, bar or donut chart drawn by the shared `@manthan/base` controller,
   * so it follows the active design style. `bind:hidden` tracks toggled series.
   */
  interface Props extends Omit<ChartControllerOptions<T>, 'hidden'> {
    hidden?: string[];
    class?: string;
  }
  let { hidden = $bindable([]), class: className, onHiddenChange, onActiveChange, ...options }: Props = $props();
  let el: HTMLDivElement;
  let controller: ChartController<T> | undefined;

  $effect(() => {
    controller = createChart<T>(el, {
      ...untrack(() => ({ ...options, hidden })),
      onHiddenChange: (next) => {
        hidden = next;
        onHiddenChange?.(next);
      },
      onActiveChange: (index) => onActiveChange?.(index),
    });
    return () => {
      controller?.destroy();
      controller = undefined;
    };
  });

  $effect(() => {
    const next = { ...options, hidden };
    untrack(() => controller?.update(next));
  });
</script>

<div bind:this={el} class={chart().root(className)}></div>
