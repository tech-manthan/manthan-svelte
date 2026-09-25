<script lang="ts">
  import { tick } from 'svelte';
  import { ChevronLeft, ChevronRight } from '@manthan/icons';
  import {
    addMonths,
    calendar,
    clampToEnabled,
    compareISO,
    formatDate,
    formatMonthYear,
    getCalendarKeyTarget,
    getCalendarWeeks,
    getWeekdayNames,
    getWeekStart,
    isDateDisabled,
    startOfMonth,
    todayISO,
    type ISODate,
    type Tone,
  } from '@manthan/base';
  import Icon from './Icon.svelte';

  interface Props {
    value?: ISODate | null;
    onValueChange?: (value: ISODate) => void;
    min?: ISODate;
    max?: ISODate;
    isDateDisabled?: (date: ISODate) => boolean;
    locale?: string;
    /** 0 = Sunday … 6 = Saturday. Defaults to the locale's convention. */
    weekStartsOn?: number;
    size?: 'sm' | 'md' | 'lg';
    tone?: Tone;
    /** Focus the selected (or today's) day on mount. */
    autoFocus?: boolean;
    class?: string;
  }
  let {
    value = $bindable(null),
    onValueChange,
    min,
    max,
    isDateDisabled: isDisabled,
    locale,
    weekStartsOn,
    size,
    tone,
    autoFocus = false,
    class: className,
  }: Props = $props();
  const constraints = $derived({ min, max, isDateDisabled: isDisabled });
  // svelte-ignore state_referenced_locally
  let focused = $state<ISODate>(value ?? clampToEnabled(todayISO(), 1, { min, max, isDateDisabled: isDisabled }) ?? todayISO());
  // svelte-ignore state_referenced_locally
  let month = $state(startOfMonth(focused));
  let grid: HTMLTableElement;
  const weekStart = $derived(weekStartsOn ?? getWeekStart(locale));
  const s = $derived(calendar({ size, tone }));
  const weeks = $derived(getCalendarWeeks(month, { weekStartsOn: weekStart }));
  const weekdays = $derived(getWeekdayNames({ locale, weekStartsOn: weekStart, format: 'narrow' }));
  const prevDisabled = $derived(!!min && compareISO(month, startOfMonth(min)) <= 0);
  const nextDisabled = $derived(!!max && compareISO(addMonths(month, 1), max) > 0);

  const focusDay = async () => {
    await tick();
    grid.querySelector<HTMLElement>(`[data-date="${focused}"]`)?.focus();
  };
  $effect(() => {
    if (autoFocus) focusDay();
  });
  $effect(() => {
    if (value) {
      focused = value;
      month = startOfMonth(value);
    }
  });

  const goMonth = (delta: number) => {
    month = addMonths(month, delta);
    focused = month;
  };
  const onkeydown = (event: KeyboardEvent) => {
    const date = (event.target as HTMLElement).dataset.date;
    if (!date) return;
    const dir = getComputedStyle(event.currentTarget as Element).direction === 'rtl' ? 'rtl' : 'ltr';
    const target = getCalendarKeyTarget(event.key, date, { weekStartsOn: weekStart, shiftKey: event.shiftKey, dir });
    if (!target) return;
    event.preventDefault();
    focused = clampToEnabled(target, compareISO(target, date) >= 0 ? 1 : -1, constraints) ?? date;
    month = startOfMonth(focused);
    focusDay();
  };
  const choose = (date: ISODate) => {
    value = date;
    focused = date;
    onValueChange?.(date);
  };
</script>

<div class={s.root(className)}>
  <div class={s.header()}>
    <button type="button" class={s.nav()} aria-label="Previous month" disabled={prevDisabled} onclick={() => goMonth(-1)}><Icon icon={ChevronLeft} /></button>
    <div class={s.title()} aria-live="polite">{formatMonthYear(month, locale)}</div>
    <button type="button" class={s.nav()} aria-label="Next month" disabled={nextDisabled} onclick={() => goMonth(1)}><Icon icon={ChevronRight} /></button>
  </div>
  <table bind:this={grid} role="grid" aria-label={formatMonthYear(month, locale)} class={s.grid()} {onkeydown}>
    <thead>
      <tr>
        {#each weekdays as w (w.long)}<th scope="col" abbr={w.long} class={s.weekday()}>{w.short}</th>{/each}
      </tr>
    </thead>
    <tbody>
      {#each weeks as week (week[0]!.date)}
        <tr>
          {#each week as day (day.date)}
            <td class={s.cell()} aria-selected={day.date === value || undefined}>
              <button
                type="button"
                data-date={day.date}
                data-outside={day.inMonth ? undefined : ''}
                data-today={day.isToday ? '' : undefined}
                aria-current={day.isToday ? 'date' : undefined}
                data-selected={day.date === value ? '' : undefined}
                aria-label={formatDate(day.date, locale, { dateStyle: 'full' })}
                tabindex={day.date === focused ? 0 : -1}
                disabled={isDateDisabled(day.date, constraints)}
                class={s.day()}
                onclick={() => choose(day.date)}>{day.day}</button
              >
            </td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>
