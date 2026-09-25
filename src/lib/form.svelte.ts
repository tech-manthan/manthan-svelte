import { createForm, type FormOptions, type FormState, type FormValues } from '@manthan/base';

/**
 * Form state + validation (Manthan's `createForm` store with runes).
 *
 *   const form = useForm({ initialValues, rules, onSubmit });
 *   <form onsubmit={form.handleSubmit}>
 *     <Field label="Email" error={form.errors.email}><Input {...form.register('email')} /></Field>
 */
export function useForm<V extends FormValues>(options: FormOptions<V>) {
  const store = createForm<V>(options);
  let state = $state.raw<FormState<V>>(store.getSnapshot());
  $effect(() => store.subscribe(() => (state = store.getSnapshot())));
  const keys = () => Object.keys({ ...state.values, ...options.rules }) as (keyof V)[];

  return {
    store,
    get values() {
      return state.values;
    },
    /** Errors that should be shown now (field visited or form submitted). */
    get errors() {
      void state;
      return Object.fromEntries(keys().map((k) => [k, store.visibleError(k)])) as { [K in keyof V]?: string };
    },
    get submitting() {
      return state.submitting;
    },
    get dirty() {
      return state.dirty;
    },
    setValue: store.setValue,
    reset: store.reset,
    validate: store.validate,
    handleSubmit: (event?: Event) => void store.submit(event),
    /** Props for Input, Textarea and Select. */
    register<K extends keyof V>(name: K) {
      void state;
      return {
        name: String(name),
        value: (state.values[name] ?? '') as string,
        oninput: (e: Event) => store.setValue(name, (e.currentTarget as HTMLInputElement).value as V[K]),
        onchange: (e: Event) => store.setValue(name, (e.currentTarget as HTMLInputElement).value as V[K]),
        onblur: () => store.blur(name),
        'aria-invalid': store.visibleError(name) ? true : undefined,
      };
    },
    /** Props for Checkbox and Switch. */
    registerCheckbox<K extends keyof V>(name: K) {
      void state;
      return {
        name: String(name),
        checked: !!state.values[name],
        onchange: (e: Event) => {
          store.setValue(name, (e.currentTarget as HTMLInputElement).checked as V[K]);
          store.blur(name);
        },
        'aria-invalid': store.visibleError(name) ? true : undefined,
      };
    },
  };
}
