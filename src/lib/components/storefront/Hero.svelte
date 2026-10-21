<script lang="ts">
  import Action from './Action.svelte';

  let { shopHref }: { shopHref: string } = $props();
</script>

<section class="store-split store-hero hero store-section" aria-labelledby="hero-title">
  <div class="store-copy hero-copy">
    <p class="hero-intro">Pilihan kosmetik harian</p>
    <h1 id="hero-title">Riasan simpel,<br />cantik setiap hari.</h1>
    <p class="hero-description">Temukan kosmetik pilihan untuk tampilan terbaikmu.</p>
    <div class="hero-action"><Action href={shopHref} arrow>Belanja Sekarang</Action></div>
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
  .hero { margin-block-start: var(--gap); border-radius: var(--radius-card); background: var(--surface); }
  .hero-copy { display: grid; align-content: center; justify-items: start; gap: calc(var(--gap) / 2); min-width: 0; }
  .hero-intro { color: var(--muted); font-size: var(--fs-small); font-weight: 500; } /* taste-skill-ignore: the introductory label is explicitly required by A1/T08. */
  h1 { max-width: 18ch; color: var(--text); font: 700 var(--store-display-size)/1.05 var(--font); letter-spacing: -0.05em; overflow-wrap: normal; }
  .hero-description { max-width: 48ch; color: var(--muted); font-size: var(--fs-body); }
  .hero-action { max-width: 100%; margin-top: calc(var(--gap) / 2); }
  .hero-media { border-radius: 0 0 var(--radius-card) var(--radius-card); }
  .hero-media img { border-radius: inherit; object-position: center; }
  @media (min-width: 768px) { .hero-media { border-radius: 0 var(--radius-card) var(--radius-card) 0; } }
</style>
