<script lang="ts">
  import Button from '../src/lib/components/Button.svelte';
  import Dialog from '../src/lib/components/Dialog.svelte';
  let open = $state(false);
</script>

<Dialog bind:open title="Delete project?" description="This permanently deletes the project.">
  {#snippet trigger(openDialog: () => void)}
    <Button onclick={openDialog}>Open</Button>
  {/snippet}
  Are you sure?
</Dialog>
