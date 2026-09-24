import { getContext, setContext } from 'svelte';
import type { accordion, card, menu, table, tabs, Tone } from '@manthan/base';

function context<T>(name: string) {
  const key = Symbol(name);
  return {
    set: (value: T) => setContext(key, value),
    get: () => getContext<T | undefined>(key),
  };
}

export interface FieldContext {
  readonly id: string;
  readonly describedBy: string | undefined;
  readonly invalid: boolean;
  readonly required: boolean | undefined;
  readonly disabled: boolean | undefined;
}
export const fieldContext = context<FieldContext>('mn-field');

/** Attributes a control should take from the enclosing <Field>. */
export function fieldAttrs(
  field: FieldContext | undefined,
  own: { id?: string | null; disabled?: boolean | null; required?: boolean | null },
) {
  if (!field) return { id: own.id ?? undefined, disabled: own.disabled ?? undefined, required: own.required ?? undefined };
  return {
    id: own.id ?? field.id,
    disabled: own.disabled ?? field.disabled,
    required: own.required ?? field.required,
    'aria-describedby': field.describedBy,
    'aria-invalid': field.invalid || undefined,
  };
}

export const cardContext = context<{ readonly slots: ReturnType<typeof card> }>('mn-card');
export const tableContext = context<{ readonly slots: ReturnType<typeof table> }>('mn-table');
export const menuContext = context<{ readonly slots: ReturnType<typeof menu> }>('mn-menu');
export const accordionContext = context<{ readonly slots: ReturnType<typeof accordion>; readonly name?: string }>('mn-accordion');

export interface TabsContext {
  readonly value: string | undefined;
  select(value: string): void;
  readonly baseId: string;
  readonly slots: ReturnType<typeof tabs>;
  readonly orientation: 'horizontal' | 'vertical';
  readonly activation: 'automatic' | 'manual';
}
export const tabsContext = context<TabsContext>('mn-tabs');

export interface RadioGroupContext {
  readonly name: string;
  readonly value: string | undefined;
  select(value: string): void;
  readonly size: 'sm' | 'md' | 'lg' | undefined;
  readonly tone: Tone | undefined;
  readonly disabled: boolean | undefined;
}
export const radioGroupContext = context<RadioGroupContext>('mn-radio-group');

export const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
