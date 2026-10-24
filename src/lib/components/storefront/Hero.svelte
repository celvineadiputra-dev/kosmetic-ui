<script lang="ts">
  import { IconShieldCheck, IconAward, IconTruck } from '@tabler/icons-svelte';
  import Action from './Action.svelte';

  let { shopHref }: { shopHref: string } = $props();
</script>

<section class="store-hero hero store-section" aria-labelledby="hero-title">
  <figure class="hero-media">
    <img
      src="/images/natural-beauty-editorial-hero.png"
      alt="Model dengan riasan natural di samping koleksi cushion, lipstik, foundation, dan blush di atas marmer dengan pencahayaan hangat."
      width="1536"
      height="1024"
      loading="eager"
      fetchpriority="high"
      decoding="async"
    />
  </figure>
  <div class="hero-copy">
    <p class="hero-intro"><span class="intro-dot" aria-hidden="true"></span>Pilihan kosmetik harian</p>
    <h1 id="hero-title">Riasan simpel,<br />cantik setiap hari.</h1>
    <p class="hero-description">
      Temukan pilihan makeup dengan warna natural untuk tampilan yang selalu terasa seperti dirimu.
    </p>
    <div class="hero-action">
      <Action href={shopHref} arrow>Belanja Koleksi</Action>
    </div>
    <div class="hero-benefits" aria-label="Keunggulan layanan">
      <div class="benefit-item">
        <IconShieldCheck size={18} stroke={1.75} aria-hidden="true" focusable="false" />
        <span>BPOM Resmi</span>
      </div>
      <span class="benefit-divider" aria-hidden="true"></span>
      <div class="benefit-item">
        <IconAward size={18} stroke={1.75} aria-hidden="true" focusable="false" />
        <span>Produk Original</span>
      </div>
      <span class="benefit-divider" aria-hidden="true"></span>
      <div class="benefit-item">
        <IconTruck size={18} stroke={1.75} aria-hidden="true" focusable="false" />
        <span>Gratis Ongkir</span>
      </div>
    </div>
  </div>
</section>

<style>
  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-block-start: var(--gap);
    border-radius: var(--radius-card);
    background-color: #F3EEE8;
    overflow: hidden;
  }

  .hero-media {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 11;
    overflow: hidden;
    margin: 0;
  }

  .hero-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 80% center;
  }

  .hero-copy {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1.75rem 1.25rem 2rem;
    background-color: #F3EEE8;
  }

  .hero-intro {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #874E3C;
    font-size: var(--fs-small);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  .intro-dot {
    width: 6px;
    height: 6px;
    border-radius: 999px;
    background-color: #874E3C;
  }

  h1 {
    color: #302823;
    font-family: 'Playfair Display', 'Didot', 'Bodoni MT', 'Cinzel', 'Georgia', serif;
    font-size: clamp(2rem, 2.5vw, 2.625rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 0.875rem;
  }

  .hero-description {
    max-width: 44ch;
    color: #50372B;
    font-size: clamp(0.9375rem, 1.05vw, 1.0625rem);
    line-height: 1.6;
    text-wrap: pretty;
  }

  .hero-action {
    margin-top: 1.5rem;
  }

  .hero-benefits {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px 16px;
    margin-top: 1.75rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(135, 78, 60, 0.2);
    color: #50372B;
    font-size: var(--fs-small);
    font-weight: 500;
  }

  .benefit-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .benefit-item :global(svg) {
    color: #874E3C;
    flex-shrink: 0;
  }

  .benefit-divider {
    display: inline-block;
    width: 1px;
    height: 14px;
    background-color: rgba(135, 78, 60, 0.3);
  }

  @media (max-width: 480px) {
    .benefit-divider {
      display: none;
    }
  }

  @media (min-width: 900px) {
    .hero {
      flex-direction: row;
      align-items: center;
      min-height: 520px;
    }

    .hero-media {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      aspect-ratio: auto;
      pointer-events: none;
    }

    .hero-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right center;
    }

    .hero-copy {
      max-width: 54%;
      padding: clamp(2.5rem, 4.5vw, 4rem);
      background: linear-gradient(
        to right,
        rgba(243, 238, 232, 0.98) 0%,
        rgba(243, 238, 232, 0.94) 75%,
        rgba(243, 238, 232, 0) 100%
      );
    }
  }

  @media (min-width: 1200px) {
    .hero {
      min-height: 560px;
    }

    .hero-copy {
      max-width: 52%;
      padding: clamp(3rem, 5vw, 5rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-media img {
      transition: none;
    }
  }
</style>
