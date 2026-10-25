<script lang="ts">
  import NewsletterForm from './NewsletterForm.svelte';

  let { privacyHref, subscribe }: { privacyHref: string; subscribe?: (email: string) => Promise<void> } = $props();
</script>

<section id="newsletter" class="store-section newsletter-card" aria-labelledby="newsletter-title">
  <div class="newsletter-body">
    <div class="newsletter-copy">
      <p class="newsletter-kicker">Warta Eksklusif</p>
      <h2 id="newsletter-title">Inspirasi riasan natural<br />di inbox-mu.</h2>
      <p class="newsletter-description">
        Dapatkan kurasi tren kecantikan, panduan pemilihan warna natural, serta penawaran eksklusif anggota pertama kali.
      </p>
    </div>
    <div class="newsletter-action">
      <NewsletterForm {privacyHref} {subscribe} />
    </div>
  </div>
</section>

<style>
  .newsletter-card {
    margin-block: var(--gap);
    border-radius: var(--radius-card);
    background-color: #F3EEE8;
    overflow: hidden;
    scroll-margin-top: var(--pad);
  }

  .newsletter-body {
    display: flex;
    flex-direction: column;
    padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3.5vw, 3rem);
    gap: 1.5rem;
  }

  .newsletter-copy {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 52ch;
  }

  .newsletter-kicker {
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
    font-size: clamp(1.75rem, 2.2vw, 2.25rem);
    font-weight: 700;
    line-height: 1.22;
    letter-spacing: -0.02em;
    margin-bottom: 0.875rem;
    text-wrap: balance;
  }

  .newsletter-description {
    color: #50372B;
    font-size: clamp(0.9375rem, 1vw, 1.0625rem);
    line-height: 1.6;
    text-wrap: pretty;
  }

  .newsletter-action {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 374.98px) {
    .newsletter-card {
      background-color: transparent;
      border-radius: 0;
    }

    .newsletter-body {
      padding: 0;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 900px) {
    .newsletter-body {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
      align-items: center;
      gap: clamp(2rem, 4vw, 4rem);
    }
  }
</style>
