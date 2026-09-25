<script lang="ts">
  import { Button, Checkbox, Field, FileUpload, Input, rules, useForm } from '../src/lib/index';
  let { onSubmit }: { onSubmit: (v: unknown) => void } = $props();
  const form = useForm({
    initialValues: { email: '', terms: false },
    rules: { email: [rules.required('Enter your email.'), rules.email()], terms: rules.required('Accept the terms.') },
    onSubmit: (v) => onSubmit(v),
  });
  let files = $state<File[]>([]);
</script>

<form onsubmit={form.handleSubmit}>
  <Field label="Email" error={form.errors.email}><Input {...form.register('email')} /></Field>
  <Checkbox label="I agree" {...form.registerCheckbox('terms')} />
  {#if form.errors.terms}<p>{form.errors.terms}</p>{/if}
  <Button type="submit">Send</Button>
</form>
<FileUpload multiple accept=".pdf" bind:files />
<output data-testid="files">{files.map((f) => f.name).join(',')}</output>
