<script lang="ts">
  import Action from './Action.svelte';
  let { id, title, subtitle, href, linkLabel = 'Lihat Semua' }: {
    id: string; title: string; subtitle?: string; href?: string; linkLabel?: string;
  } = $props();
</script>

<div class="store-section-heading">
  <div class="heading-copy">
    <h2 {id}>{title}</h2>
    {#if subtitle}<p>{subtitle}</p>{/if}
  </div>
  {#if href}<Action {href} variant="section" arrow context={title}>{linkLabel}</Action>{/if}
</div>

<style>
  .store-section-heading { display: flex; align-items: end; justify-content: space-between; flex-wrap: wrap; gap: calc(var(--gap) / 2) var(--gap); margin-bottom: var(--gap); }
  .heading-copy { min-width: 0; }
  h2 { color: var(--text); font: 700 var(--fs-title)/1.2 var(--font); letter-spacing: -0.02em; overflow-wrap: anywhere; }
  p { margin-top: calc(var(--gap) / 4); color: var(--muted-foreground); font-size: var(--fs-body); }
</style>
