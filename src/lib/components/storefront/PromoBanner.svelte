<script lang="ts">
  import Action from './Action.svelte';

  let { collectionHref = '#baru' }: { collectionHref?: string } = $props();
</script>

<section id="promo" class="store-section promo" aria-labelledby="promo-title">
  <div class="promo-plate">
    <figure class="promo-media">
      <img
        src="/images/Sunlit%20Beauty%20Still%20Life%20with%20Blossoms.png"
        alt="Model dengan riasan natural di samping lipstik rose nude, kuas rias keemasan, dan bunga melati di atas marmer dengan pencahayaan hangat."
        width="1254"
        height="1254"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <div class="promo-content">
      <p class="promo-kicker">Koleksi Unggulan</p>
      <h2 id="promo-title">Tampil natural,<br />cantik setiap hari.</h2>
      <p class="promo-description">
        Pilihan formula lembut dan warna esensial untuk riasan harian yang selalu terasa ringan seperti kulitmu sendiri.
      </p>
      <div class="promo-highlights" aria-label="Keunggulan formula">
        <span class="highlight-chip">Formula Ringan</span>
        <span class="highlight-chip">Pigmentasi Halus</span>
        <span class="highlight-chip">Nyaman Seharian</span>
      </div>
      <div class="promo-action">
        <Action href={collectionHref} arrow>Jelajahi Koleksi</Action>
      </div>
    </div>
  </div>
</section>

<style>
  .promo {
    margin-block: var(--gap);
    border-radius: var(--radius-card);
    background-color: #F3EEE8;
    overflow: hidden;
    scroll-margin-top: var(--pad);
  }

  .promo-plate {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .promo-media {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    margin: 0;
    background-color: #EAE3DB;
  }

  .promo-media img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 25%;
  }

  .promo-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem 1.25rem 2.25rem;
    background-color: #F3EEE8;
    min-width: 0;
  }

  .promo-kicker {
    display: inline-block;
    color: #874E3C;
    font-size: var(--fs-small);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  h2 {
    color: #302823;
    font-family: 'Playfair Display', 'Didot', 'Bodoni MT', 'Cinzel', 'Georgia', serif;
    font-size: clamp(1.875rem, 2.4vw, 2.5rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    margin-bottom: 0.875rem;
    text-wrap: balance;
  }

  .promo-description {
    max-width: 42ch;
    color: #50372B;
    font-size: clamp(0.9375rem, 1vw, 1.0625rem);
    line-height: 1.6;
    text-wrap: pretty;
  }

  .promo-highlights {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-top: 1.25rem;
  }

  .highlight-chip {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 999px;
    background-color: rgba(135, 78, 60, 0.1);
    color: #874E3C;
    font-size: 0.8125rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }

  .promo-action {
    margin-top: 1.75rem;
  }

  @media (min-width: 900px) {
    .promo-plate {
      display: grid;
      grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
      align-items: stretch;
      min-height: 480px;
    }

    .promo-media {
      height: 100%;
      aspect-ratio: auto;
    }

    .promo-media img {
      object-position: center 30%;
    }

    .promo-content {
      padding: clamp(2.5rem, 4vw, 4rem);
    }
  }

  @media (min-width: 1200px) {
    .promo-plate {
      min-height: 520px;
    }

    .promo-content {
      padding: clamp(3rem, 4.5vw, 4.5rem);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .promo-media img {
      transition: none;
    }
  }
</style>
