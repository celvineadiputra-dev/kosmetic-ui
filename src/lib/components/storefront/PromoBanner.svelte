<script lang="ts">
  import Action from './Action.svelte';
  let { collectionHref }: { collectionHref: string } = $props();
</script>

<section id="promo" class="store-section store-split store-promo promo" aria-labelledby="promo-title">
  <figure class="store-media store-promo-media promo-media">
    <img
      src="/images/kosmetik-a1-promo.webp"
      alt="Palet eyeshadow netral, kuas rias, dan lipstik rose nude di atas batu krem dengan bunga putih."
      width="1200"
      height="800"
      loading="lazy"
      decoding="async"
    />
  </figure>
  <div class="store-copy promo-copy">
    <h2 id="promo-title">Tampil natural,<br />setiap hari.</h2>
    <p>Pilihan warna lembut untuk riasan yang terasa seperti dirimu.</p>
    <div class="promo-action"><Action href={collectionHref} arrow>Jelajahi Koleksi</Action></div>
  </div>
</section>

<style>
  .promo { background: var(--raised); border-radius: var(--radius-card); scroll-margin-top: var(--pad); }
  .promo-media, .promo-media img { border-radius: var(--radius-card) var(--radius-card) 0 0; }
  .promo-media img { object-position: center; }
  .promo-copy { display: grid; align-content: center; justify-items: start; gap: calc(var(--gap) / 2); min-width: 0; }
  h2 { color: var(--text); font: 700 var(--fs-kpi)/1.05 var(--font); letter-spacing: -0.02em; }
  p { max-width: 38ch; color: var(--muted); font-size: var(--fs-body); }
  .promo-action { max-width: 100%; margin-top: calc(var(--gap) / 2); }
  @media (min-width: 768px) { .promo-media, .promo-media img { border-radius: var(--radius-card) 0 0 var(--radius-card); } }
</style>
