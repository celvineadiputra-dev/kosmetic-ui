<script lang="ts">
  import { IconUser, IconHeart, IconHeartFilled, IconShoppingBag, IconSearch } from '@tabler/icons-svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  type Shared = { icon: 'account' | 'wishlist' | 'bag' | 'search' | 'favorite'; label: string; visibleLabel?: string; outlined?: boolean; disabled?: boolean; class?: string };
  type Props = Shared & (
    | ({ href: string; pressed?: never } & Omit<HTMLAnchorAttributes, keyof Shared | 'aria-label' | 'aria-pressed'>)
    | ({ href?: never; pressed?: boolean } & Omit<HTMLButtonAttributes, keyof Shared | 'aria-label' | 'aria-pressed'>)
  );
  let { icon, label, visibleLabel, outlined = false, disabled = false, pressed = false, class: className = '', href, ...rest }: Props = $props();
  const icons = { account: IconUser, wishlist: IconHeart, bag: IconShoppingBag, search: IconSearch, favorite: IconHeart };
  let Glyph = $derived(icon === 'favorite' && pressed ? IconHeartFilled : icons[icon]);
</script>

{#snippet glyph()}
  <Glyph size={20} stroke={1.5} aria-hidden="true" focusable="false" />
  {#if visibleLabel}<span class="visible-label" aria-hidden="true">{visibleLabel}</span>{/if}
{/snippet}

{#if href !== undefined}
  {#if disabled}
    <span class="store-icon {className}" class:with-label={!!visibleLabel} class:outlined aria-disabled="true"><span class="store-sr-only">{label}</span>{@render glyph()}</span>
  {:else}
    <a class="store-icon {className}" class:with-label={!!visibleLabel} class:outlined {href} aria-label={label} {...rest as HTMLAnchorAttributes}>{@render glyph()}</a>
  {/if}
{:else}
  <button class="store-icon {className}" class:with-label={!!visibleLabel} class:outlined class:selected={icon === 'favorite' && pressed} type="button" {disabled} aria-label={label} aria-pressed={icon === 'favorite' ? pressed : undefined} {...rest as HTMLButtonAttributes}>{@render glyph()}</button>
{/if}

<style>
  .store-icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; min-width: var(--store-touch-target); min-height: var(--store-touch-target); padding: 0; border: 1px solid transparent; border-radius: var(--radius-control); color: var(--text); background: transparent; cursor: pointer; transition: background-color var(--t-hover) var(--ease-out), color var(--t-hover) var(--ease-out); }
  .store-icon :global(svg) { flex-shrink: 0; }
  .with-label { gap: calc(var(--gap) / 2); padding-inline: calc(var(--gap) / 2); flex-shrink: 1; min-width: var(--store-touch-target); }
  .visible-label { min-width: 0; font: var(--fs-small)/16px var(--font); overflow-wrap: anywhere; }
  @media (max-width: 1023px) { .with-label { padding-inline: 0; } .visible-label { display: none; } }
  .outlined { border-color: var(--control); background: var(--surface); }
  .selected { color: var(--accent); }
  .store-icon:active:not(:disabled):not([aria-disabled='true']) { background: var(--active); transition-duration: var(--t-press); }
  .store-icon:disabled, .store-icon[aria-disabled='true'] { color: var(--muted); background: var(--raised); cursor: not-allowed; }
  @media (hover: hover) { .store-icon:hover:not(:disabled):not([aria-disabled='true']) { background: var(--raised); } }
  @media (prefers-reduced-motion: reduce) { .store-icon { transition: none; } }
</style>
