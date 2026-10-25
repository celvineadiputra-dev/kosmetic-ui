<script lang="ts">
  import { IconBrandInstagram, IconBrandFacebook, IconBrandYoutube, IconBrandTiktok } from '@tabler/icons-svelte';
  let { socialLinks = {} }: { infoTitle?: string; socialLinks?: Partial<Record<'instagram' | 'facebook' | 'youtube' | 'tiktok', string>> } = $props();
  const socials = [
    { id: 'instagram', label: 'Instagram', icon: IconBrandInstagram },
    { id: 'facebook', label: 'Facebook', icon: IconBrandFacebook },
    { id: 'youtube', label: 'YouTube', icon: IconBrandYoutube },
    { id: 'tiktok', label: 'TikTok', icon: IconBrandTiktok }
  ] as const;
  const groups = [
    { title: 'Belanja', links: [
      { label: 'Semua Produk', href: '#koleksi' }, { label: 'Wajah', href: '?kategori=wajah#jelajah-kategori' },
      { label: 'Mata', href: '?kategori=mata#jelajah-kategori' }, { label: 'Bibir', href: '?kategori=bibir#jelajah-kategori' },
      { label: 'Brush & Tools', href: '?kategori=tools#jelajah-kategori' }
    ] },
    { title: 'Bantuan', links: [
      { label: 'Hubungi Kami', href: '?info=kontak#informasi-pratinjau' }, { label: 'Cara Belanja', href: '?info=cara-belanja#informasi-pratinjau' },
      { label: 'Pengiriman', href: '?info=pengiriman#informasi-pratinjau' }, { label: 'Pengembalian', href: '?info=pengembalian#informasi-pratinjau' }, { label: 'FAQ', href: '?info=faq#informasi-pratinjau' }
    ] },
    { title: 'Informasi', links: [
      { label: 'Tentang Kami', href: '?info=tentang#informasi-pratinjau' }, { label: 'Kebijakan Privasi', href: '?info=privasi#informasi-pratinjau' }, { label: 'Syarat & Ketentuan', href: '?info=syarat#informasi-pratinjau' }
    ] }
  ];
</script>

<footer class="store-footer">
  <div class="store-container">
    <div class="footer-columns">
      <div class="brand-column">
        <a class="wordmark" href="/" aria-label="CASANDRA COSMETICS, beranda">
          <span class="wordmark-title">CASANDRA</span>
          <span class="wordmark-subtitle">C O S M E T I C S</span>
        </a>
        <p>Kosmetik pilihan untuk riasan sehari-hari.</p>
        <div class="socials" aria-label="Media sosial">
          {#each socials as social}
            {#if socialLinks[social.id]}
              <a class="social-control" href={socialLinks[social.id]} aria-label={social.label}><social.icon size={20} stroke={1.5} aria-hidden="true" focusable="false" /></a>
            {:else}
              <span class="social-control unavailable" aria-disabled="true"><social.icon size={20} stroke={1.5} aria-hidden="true" focusable="false" /><span class="store-sr-only">{social.label}, tautan belum tersedia</span></span>
            {/if}
          {/each}
        </div>
      </div>
      {#each groups as group}
        <nav aria-label={group.title}><h2>{group.title}</h2><ul>{#each group.links as link}<li><a href={link.href}>{link.label}</a></li>{/each}</ul></nav>
      {/each}
    </div>
    <div class="legal"><p>© 2026 CASANDRA. Seluruh hak cipta dilindungi.</p></div>
  </div>
</footer>

<style>
  .store-footer { margin-top: var(--store-section-space); padding-block: var(--pad); background: var(--surface); border-top: 1px solid var(--rule); } /* taste-skill-ignore: T24 requires A1 footer dividers. */
  .footer-columns { display: grid; grid-template-columns: minmax(0, 1.4fr) repeat(3, minmax(0, 1fr)); gap: var(--pad); }
  .wordmark { display: inline-flex; flex-direction: column; align-items: flex-start; justify-content: center; min-height: var(--store-touch-target); text-decoration: none; white-space: nowrap; }
  .wordmark-title { color: var(--text); font: 700 var(--fs-title)/1.1 var(--font); letter-spacing: 0.1em; text-transform: uppercase; }
  .wordmark-subtitle { display: block; color: var(--primary); font-size: 0.5625rem; font-weight: 300; letter-spacing: 0.32em; line-height: 1; margin-top: 3px; text-align: center; width: 100%; text-transform: uppercase; }
  .brand-column p { max-width: 26ch; color: var(--muted-foreground); font-size: var(--fs-body); }
  .socials { display: flex; flex-wrap: wrap; gap: calc(var(--gap) / 2); margin-top: calc(var(--gap) / 2); }
  .social-control { display: inline-flex; align-items: center; justify-content: center; min-width: var(--store-touch-target); min-height: var(--store-touch-target); border-radius: var(--radius-control); color: var(--text); }
  .unavailable { color: var(--muted-foreground); }
  a.social-control:active { background: var(--active); }
  nav { min-width: 0; }
  h2 { margin-block: calc(var(--gap) / 2); font: 600 var(--fs-body)/20px var(--font); color: var(--text); }
  ul { padding: 0; list-style: none; }
  li a { display: inline-flex; align-items: center; min-height: var(--control-height); max-width: 100%; color: var(--muted-foreground); font-size: var(--fs-body); text-decoration: none; overflow-wrap: anywhere; text-underline-offset: 3px; }
  li a:focus-visible, li a:active { text-decoration: underline; }
  .legal { margin-top: var(--pad); padding-top: var(--gap); border-top: 1px solid var(--rule); color: var(--faint); font-size: var(--fs-small); } /* taste-skill-ignore: T24 explicitly requires the lower divider and copyright row. */
  @media (hover: hover) { li a:hover { text-decoration: underline; } a.social-control:hover { background: var(--raised); } }
  @media (max-width: 767px) { .footer-columns { grid-template-columns: repeat(2, minmax(0, 1fr)); } .brand-column { grid-column: 1 / -1; } }
  @media (max-width: 767px), (pointer: coarse) { li a { min-height: var(--store-touch-target); } }
</style>
