<script lang="ts">
  import { IconArrowRight } from '@tabler/icons-svelte';
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

  type Shared = { children: Snippet; variant?: 'primary' | 'section' | 'secondary'; arrow?: boolean; disabled?: boolean; context?: string; class?: string };
  type Props = Shared & (
    | ({ href: string } & Omit<HTMLAnchorAttributes, keyof Shared>)
    | ({ href?: never } & Omit<HTMLButtonAttributes, keyof Shared>)
  );
  let { children, variant = 'primary', arrow = false, disabled = false, context, class: className = '', href, ...rest }: Props = $props();
</script>

{#snippet label()}
  <span>{@render children()}{#if context}<span class="store-sr-only"> — {context}</span>{/if}</span>
  {#if arrow && !disabled}<IconArrowRight size={16} stroke={1.5} aria-hidden="true" focusable="false" />{/if}
{/snippet}

{#if href !== undefined}
  {#if disabled}
    <span class="store-action {variant} {className}" aria-disabled="true">{@render label()}</span>
  {:else}
    <a class="store-action {variant} {className}" {href} {...rest as HTMLAnchorAttributes}>{@render label()}</a>
  {/if}
{:else}
  <button class="store-action {variant} {className}" type="button" {disabled} {...rest as HTMLButtonAttributes}>{@render label()}</button>
{/if}

<style>
  .store-action { display: inline-flex; align-items: center; justify-content: center; gap: calc(var(--gap) / 2); min-width: 0; max-width: 100%; padding: 0; border: 0; color: var(--text); background: transparent; font: 500 var(--fs-body)/20px var(--font); text-align: center; text-decoration: none; text-underline-offset: 3px; text-decoration-thickness: 1px; cursor: pointer; transition: color var(--t-hover) var(--ease-out), text-decoration-color var(--t-hover) var(--ease-out), box-shadow var(--t-press) var(--ease-out); }
  .store-action > span { min-width: 0; overflow-wrap: anywhere; }
  .store-action :global(svg) { flex-shrink: 0; }
  .primary { min-height: var(--control-height); padding: 5px 12px; border: 1px solid transparent; border-radius: var(--radius-control); background: var(--primary); color: var(--primary-ink); }
  .secondary { text-decoration: underline; }
  .store-action:focus-visible { text-decoration: underline; }
  .store-action:active:not(:disabled):not([aria-disabled='true']) { text-decoration: underline; text-decoration-thickness: 2px; }
  .primary:active:not(:disabled) { box-shadow: inset 0 0 0 1px var(--primary), inset 0 0 0 3px var(--primary), inset 0 0 0 4px var(--primary-ink); } /* taste-skill-ignore: T03 explicitly requires this pressed inset stroke. */
  .store-action:disabled, .store-action[aria-disabled='true'] { color: var(--muted); text-decoration: none; cursor: default; }
  .primary:disabled, .primary[aria-disabled='true'] { background: var(--raised); border-color: var(--control); cursor: not-allowed; }
  @media (hover: hover) {
    .store-action:hover:not(:disabled):not([aria-disabled='true']) { text-decoration: underline; }
    .secondary:hover:not(:disabled):not([aria-disabled='true']) { text-decoration-thickness: 2px; }
  }
  @media (max-width: 767px), (pointer: coarse) {
    .store-action:not(.inline) { min-height: var(--store-touch-target); }
    .primary { min-width: var(--store-touch-target); }
  }
  @media (prefers-reduced-motion: reduce) { .store-action { transition: none; } }
</style>
