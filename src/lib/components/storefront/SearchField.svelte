<script lang="ts">
  import { IconSearch } from '@tabler/icons-svelte';

  let { action = '/', value = '' }: { action?: string; value?: string } = $props();
  const id = $props.id();
</script>

<form class="store-search" role="search" aria-label="Pencarian produk" method="get" {action}>
  <label class="store-sr-only" for={id}>Cari produk kosmetik</label>
  <IconSearch size={20} stroke={1.5} aria-hidden="true" focusable="false" />
  <input id={id} type="search" name="q" {value} placeholder="Cari produk kosmetik" />
</form>

<style>
  .store-search { position: relative; width: 100%; min-width: 0; margin: 0; }
  .store-search :global(svg) { position: absolute; inset-inline-start: 12px; top: 50%; transform: translateY(-50%); color: var(--faint); pointer-events: none; }
  input { display: block; width: 100%; min-width: 0; min-height: 38px; padding: 8px 12px 8px 40px; border: 1px solid var(--control); border-radius: var(--radius-control); background: var(--surface); color: var(--text); font: var(--fs-body)/20px var(--font); box-shadow: none; } /* taste-skill-ignore: removes the forms plugin focus shadow; no elevation is added. */
  input::placeholder { color: var(--faint); opacity: 1; }
  input:focus { border-color: var(--accent); outline: 2px solid var(--accent); outline-offset: 2px; box-shadow: none; } /* taste-skill-ignore: removes the forms plugin focus shadow; no elevation is added. */
  input:not(:placeholder-shown) { color: var(--text); }
  @media (max-width: 767px), (pointer: coarse) { input { min-height: var(--store-touch-target); font-size: var(--fs-section); } }
</style>
