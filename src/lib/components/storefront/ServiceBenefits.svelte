<script lang="ts">
  import { IconShoppingBag, IconCreditCard, IconHeadset } from '@tabler/icons-svelte';
  const benefits = [
    { icon: IconShoppingBag, title: 'Pilihan Kosmetik', description: 'Temukan produk sesuai kebutuhanmu.' },
    { icon: IconCreditCard, title: 'Pembayaran Aman', description: 'Pilihan pembayaran yang praktis.' },
    { icon: IconHeadset, title: 'Butuh Bantuan?', description: 'Kami siap membantu belanjamu.' }
  ];
</script>

<section id="layanan" class="store-section services" aria-label="Layanan belanja">
  <ul>
    {#each benefits as benefit}
      <li><benefit.icon size={32} stroke={1.5} aria-hidden="true" focusable="false" /><div><h2>{benefit.title}</h2><p>{benefit.description}</p></div></li>
    {/each}
  </ul>
</section>

<style>
  .services { border-top: 1px solid var(--rule); padding-top: var(--pad); scroll-margin-top: var(--pad); } /* taste-skill-ignore: T20 explicitly requires the A1 service divider. */
  ul { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); padding: 0; list-style: none; }
  li { display: flex; align-items: center; min-width: 0; gap: var(--gap); padding-inline: var(--pad); }
  li:first-child { padding-inline-start: 0; }
  li:last-child { padding-inline-end: 0; }
  li + li { border-inline-start: 1px solid var(--border); } /* taste-skill-ignore: the subtle item separators are explicit T20 requirements. */
  li :global(svg) { flex-shrink: 0; color: var(--text); }
  h2 { color: var(--text); font: 600 var(--fs-body)/20px var(--font); }
  p { margin-top: calc(var(--gap) / 4); color: var(--muted); font-size: var(--fs-body); overflow-wrap: anywhere; }
  @media (max-width: 767px) { ul { grid-template-columns: minmax(0, 1fr); gap: var(--pad); } li { padding-inline: 0; } li + li { border-inline-start: 0; } }
</style>
