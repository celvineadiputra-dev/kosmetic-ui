<script lang="ts">
  import NewsletterForm from './NewsletterForm.svelte';
  let { privacyHref, subscribe }: { privacyHref: string; subscribe?: (email: string) => Promise<void> } = $props();
</script>

<section id="newsletter" class="store-section store-split store-newsletter newsletter" aria-labelledby="newsletter-title">
  <div><h2 id="newsletter-title">Inspirasi cantik di <span>inbox-mu.</span></h2><p>Kabar koleksi terbaru dan penawaran pilihan.</p></div>
  <NewsletterForm {privacyHref} {subscribe} />
</section>

<style>
  .newsletter { align-items: center; padding: var(--pad); border-radius: var(--radius-card); background: var(--raised); scroll-margin-top: var(--pad); }
  h2 { color: var(--text); font: 700 var(--fs-title)/1.2 var(--font); letter-spacing: -0.02em; }
  h2 span { white-space: nowrap; }
  p { margin-top: calc(var(--gap) / 2); color: var(--muted); font-size: var(--fs-body); }
</style>
