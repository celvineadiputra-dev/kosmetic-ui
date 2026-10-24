<script lang="ts">
  let { items, active = 'semua' }: {
    items: readonly { id: string; label: string; href: string }[];
    active?: string;
  } = $props();
</script>

<nav class="store-category-nav" aria-label="Kategori produk">
  <ul class="store-container category-list">
    {#each items as item (item.id)}
      <li>
        <a
          href={item.href}
          class:is-promo={item.id === 'promo'}
          aria-current={active === item.id ? 'page' : undefined}
        >
          {item.label}
          {#if item.id === 'promo'}
            <span class="promo-badge" aria-hidden="true">Promo</span>
          {/if}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .store-category-nav {
    background: var(--surface);
    border-bottom: 1px solid var(--rule);
    position: relative;
  }
  .category-list {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: calc(var(--gap) / 2);
    padding: 0;
    margin: 0 auto;
    list-style: none;
  }
  li {
    min-width: 0;
    flex-shrink: 0;
  }
  a {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: var(--store-touch-target);
    max-width: 100%;
    padding: calc(var(--gap) / 2) calc(var(--gap) * 0.75);
    border-radius: var(--radius-control);
    color: var(--muted-foreground);
    font: 500 var(--fs-body)/20px var(--font);
    letter-spacing: 0.01em;
    text-decoration: none;
    white-space: nowrap;
    overflow-wrap: anywhere;
    transition:
      color var(--t-hover) var(--ease-out),
      background-color var(--t-hover) var(--ease-out),
      transform var(--t-press) var(--ease-out);
  }
  a:active {
    transform: scale(0.97);
  }
  @media (hover: hover) {
    a:hover {
      color: var(--text);
      background: var(--raised);
      text-decoration: none;
    }
  }
  a[aria-current='page'] {
    color: var(--text);
    font-weight: 600;
  }
  a[aria-current='page']::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: calc(var(--gap) * 0.75);
    right: calc(var(--gap) * 0.75);
    height: 2px;
    border-radius: 999px;
    background: var(--store-accent);
  }
  .is-promo {
    color: var(--store-accent);
    font-weight: 600;
  }
  .promo-badge {
    display: inline-flex;
    align-items: center;
    margin-inline-start: 6px;
    padding: 1px 6px;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--store-accent);
    background: color-mix(in srgb, var(--store-accent) 12%, transparent);
    border-radius: 999px;
  }
  @media (max-width: 767px) {
    .category-list {
      justify-content: flex-start;
      flex-wrap: nowrap;
      overflow-x: auto;
      overscroll-behavior-x: contain;
      scroll-snap-type: x proximity;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
      padding-inline: var(--pad);
      -webkit-mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
      mask-image: linear-gradient(to right, transparent 0, black 16px, black calc(100% - 16px), transparent 100%);
    }
    .category-list::-webkit-scrollbar {
      display: none;
    }
    li {
      scroll-snap-align: start;
    }
    a {
      padding-inline: 12px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    a {
      transition: none;
    }
  }
</style>
