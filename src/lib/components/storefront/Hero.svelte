<script lang="ts">
  import Action from './Action.svelte';

  let { shopHref }: { shopHref: string } = $props();
</script>

<section class="store-split store-hero hero store-section" aria-labelledby="hero-title">
  <div class="store-copy hero-copy">
    <p class="hero-intro"><span class="intro-dot" aria-hidden="true"></span>Pilihan kosmetik harian</p>
    <h1 id="hero-title">Riasan simpel,<br />cantik setiap hari.</h1>
    <p class="hero-description">Temukan kosmetik pilihan untuk tampilan terbaikmu.</p>
    <div class="hero-action">
      <Action href={shopHref} arrow>Belanja Sekarang</Action>
    </div>
    <div class="hero-highlights" aria-label="Jaminan belanja">
      <span class="highlight-item">BPOM Resmi</span>
      <span class="highlight-dot" aria-hidden="true">·</span>
      <span class="highlight-item">100% Original</span>
      <span class="highlight-dot" aria-hidden="true">·</span>
      <span class="highlight-item">Gratis Ongkir</span>
    </div>
  </div>
  <figure class="store-media store-hero-media hero-media">
    <img
      src="/images/kosmetik-a1-hero.png"
      alt="Lipstik rose nude, cushion beige, foundation, dan blush peach dalam kemasan keemasan di atas batu krem."
      width="1536"
      height="1024"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
  </figure>
</section>

<style>
  .hero {
    margin-block-start: var(--gap);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    background: var(--surface);
    overflow: hidden;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 2px 6px -1px rgba(0, 0, 0, 0.02);
  }
  .hero-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0;
    min-width: 0;
    padding: var(--pad);
  }
  .hero-intro {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--store-accent);
    font-size: var(--fs-small);
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: calc(var(--gap) / 2);
  }
  .intro-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background: var(--store-accent);
  }
  h1 {
    max-width: 18ch;
    color: var(--text);
    font: 700 var(--store-display-size)/1.1 var(--font);
    letter-spacing: -0.03em;
    text-wrap: balance;
    overflow-wrap: normal;
    margin-bottom: 12px;
  }
  .hero-description {
    max-width: 44ch;
    color: var(--muted-foreground);
    font-size: var(--fs-body);
    line-height: 1.6;
    text-wrap: pretty;
  }
  .hero-action {
    max-width: 100%;
    margin-top: calc(var(--gap) * 1.25);
  }
  .hero-highlights {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: calc(var(--gap) * 1.25);
    padding-top: calc(var(--gap) * 0.75);
    border-top: 1px solid var(--rule);
    color: var(--faint);
    font-size: var(--fs-small);
    font-weight: 500;
  }
  .highlight-dot {
    color: var(--control);
  }
  .hero-media {
    position: relative;
    overflow: hidden;
  }
  .hero-media img {
    object-position: center;
    transition: transform 700ms var(--ease-out);
  }
  @media (hover: hover) {
    .hero:hover .hero-media img {
      transform: scale(1.025);
    }
  }
  @media (min-width: 768px) {
    .hero-copy {
      padding: clamp(32px, 5vw, 52px);
    }
  }
  @media (max-width: 767px) {
    h1 {
      letter-spacing: -0.04em;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero-media img {
      transition: none;
    }
  }
</style>
