<script lang="ts">
  import { File as FileIcon, Upload, X } from '@manthan/icons';
  import { closeButton, fileUpload, formatBytes, validateFiles, type FileRejection } from '@manthan/base';
  import { createDropzone, setInputFiles } from '@manthan/base/dom';
  import { fieldAttrs, fieldContext } from '../context';
  import Icon from './Icon.svelte';

  interface Props {
    files?: File[];
    onValueChange?: (files: File[]) => void;
    onReject?: (rejections: FileRejection<File>[]) => void;
    /** Same syntax as `<input accept>`, e.g. `".pdf,image/*"`. */
    accept?: string;
    multiple?: boolean;
    /** Bytes. */
    maxSize?: number;
    maxFiles?: number;
    /** Posts the files with the surrounding form. */
    name?: string;
    label?: string;
    hint?: string;
    size?: 'sm' | 'md';
    id?: string;
    disabled?: boolean;
    class?: string;
  }
  let {
    files = $bindable([]),
    onValueChange,
    onReject,
    accept,
    multiple = false,
    maxSize,
    maxFiles,
    name,
    label = 'Drop files here, or click to browse',
    hint,
    size,
    id,
    disabled,
    class: className,
  }: Props = $props();
  const field = fieldContext.get();
  const s = $derived(fileUpload({ size }));
  const attrs = $derived(fieldAttrs(field, { id, disabled }));
  let zone: HTMLElement;
  let input: HTMLInputElement;
  let errors = $state<string[]>([]);

  const set = (next: File[]) => {
    files = next;
    onValueChange?.(next);
  };
  const add = (incoming: File[]) => {
    const { accepted, rejected } = validateFiles(incoming, { accept, maxSize, maxFiles: multiple ? maxFiles : 1, existing: multiple ? files.length : 0 });
    errors = rejected.map((r) => r.message);
    if (rejected.length) onReject?.(rejected);
    if (accepted.length) set(multiple ? [...files, ...accepted] : accepted);
  };
  $effect(() => createDropzone({ zone, input, onFiles: (f) => add(f) }));
  $effect(() => setInputFiles(input, files));
</script>

<div class={s.root(className)}>
  <div
    bind:this={zone}
    id={attrs.id}
    aria-label={label}
    aria-describedby={attrs['aria-describedby']}
    aria-disabled={attrs.disabled || undefined}
    aria-invalid={errors.length > 0 || attrs['aria-invalid'] || undefined}
    class={s.dropzone()}
  >
    <span class={s.icon()}><Icon icon={Upload} /></span>
    <p class={s.title()}>{label}</p>
    {#if hint}<p class={s.hint()}>{hint}</p>{/if}
  </div>
  <input bind:this={input} type="file" class="sr-only" tabindex="-1" aria-hidden="true" {name} {accept} {multiple} {disabled} />
  {#if errors.length}
    <div role="alert" class={s.errors()}>{#each errors as e (e)}<p>{e}</p>{/each}</div>
  {/if}
  {#if files.length}
    <ul class={s.list()}>
      {#each files as file, i (`${file.name}-${i}`)}
        <li class={s.item()}>
          <span class={s.itemIcon()}><Icon icon={FileIcon} /></span>
          <div class={s.itemBody()}>
            <span class={s.itemName()}>{file.name}</span>
            <span class={s.itemMeta()}>{formatBytes(file.size)}</span>
          </div>
          <button type="button" aria-label="Remove {file.name}" class={closeButton()} onclick={() => set(files.filter((_, j) => j !== i))}><Icon icon={X} /></button>
        </li>
      {/each}
    </ul>
  {/if}
</div>
