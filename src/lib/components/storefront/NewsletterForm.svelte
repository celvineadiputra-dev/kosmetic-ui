<script lang="ts">
  import { onMount } from 'svelte';
  import Action from './Action.svelte';
  let { privacyHref, subscribe }: { privacyHref: string; subscribe?: (email: string) => Promise<void> } = $props();
  const id = $props.id();
  let ready = $state(false);
  onMount(() => { ready = true; });
  let email = $state('');
  let field = $state<HTMLInputElement | null>(null);
  let status = $state<'idle' | 'invalid' | 'submitting' | 'success' | 'failure'>('idle');
  let message = $state('');

  function resetFeedback() {
    if (status !== 'submitting') { status = 'idle'; message = ''; }
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (status === 'submitting' || status === 'success') return;
    if (!email.trim() || !field?.validity.valid) {
      status = 'invalid';
      message = email.trim() ? 'Masukkan alamat email yang valid, misalnya nama@contoh.com.' : 'Masukkan alamat email kamu.';
      field?.focus();
      return;
    }
    if (!subscribe) {
      status = 'failure';
      message = 'Pendaftaran newsletter belum tersedia. Emailmu belum dikirim.';
      return;
    }
    status = 'submitting';
    message = 'Sedang mendaftarkan emailmu…';
    try {
      await subscribe(email.trim());
      status = 'success';
      message = 'Terima kasih! Kamu sudah berlangganan kabar CASANDRA.';
    } catch {
      status = 'failure';
      message = 'Pendaftaran belum berhasil. Coba lagi sebentar, ya.';
    }
  }
</script>

<form class="newsletter-form" novalidate onsubmit={submit} aria-label="Berlangganan newsletter" aria-busy={status === 'submitting'}>
  <div class="form-row">
    <label class="store-sr-only" for={id}>Alamat email kamu</label>
    <input bind:this={field} bind:value={email} id={id} type="email" name="email" autocomplete="email" inputmode="email" required disabled={!ready} placeholder="Alamat email kamu" aria-invalid={status === 'invalid'} aria-describedby={`${id}-privacy ${id}-feedback`} readonly={status === 'submitting'} oninput={resetFeedback} />
    <Action type="submit" disabled={!ready || status === 'submitting' || status === 'success'}>{status === 'submitting' ? 'Mendaftarkan…' : 'Berlangganan'}</Action>
  </div>
  <p id={`${id}-privacy`} class="privacy">Dengan berlangganan, kamu menyetujui <Action href={privacyHref} variant="secondary" class="inline privacy-link">kebijakan privasi.</Action></p>
  <div aria-live="polite" aria-atomic="true"><p id={`${id}-feedback`} class="feedback" class:error={status === 'invalid' || status === 'failure'} class:success={status === 'success'}>{message}</p></div>
  <noscript><p class="privacy">Aktifkan JavaScript untuk menggunakan form ini. Email tidak dikirim dari pratinjau ini.</p></noscript>
</form>

<style>
  .newsletter-form { min-width: 0; width: 100%; }
  .form-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: calc(var(--gap) / 2); }
  input { display: block; width: 100%; min-width: 0; min-height: 42px; border: 1px solid rgba(135, 78, 60, 0.28); border-radius: var(--radius-control); background: #FDFBF7; color: #302823; padding: 10px 14px; font: var(--fs-body)/20px var(--font); box-shadow: none; }
  input::placeholder { color: #8F7668; opacity: 1; }
  input:focus { border-color: #874E3C; outline: 2px solid #874E3C; outline-offset: 2px; box-shadow: none; }
  input[aria-invalid='true'] { border-color: var(--negative); }
  input:read-only { background: var(--raised); }
  .privacy { max-width: 60ch; margin-top: calc(var(--gap) / 2); color: #674536; font-size: var(--fs-small); line-height: 1.5; }
  .privacy :global(.privacy-link) { display: inline; font: inherit; color: #874E3C; text-decoration: underline; }
  .feedback { color: var(--muted-foreground); font-size: var(--fs-body); overflow-wrap: anywhere; }
  .feedback:not(:empty) { margin-top: calc(var(--gap) / 2); }
  .error { color: var(--negative); }
  .success { color: var(--positive); }
  @media (max-width: 767px) { .form-row { grid-template-columns: minmax(0, 1fr); gap: var(--gap); } input { font-size: var(--fs-section); } }
  @media (max-width: 767px), (pointer: coarse) { input, .form-row :global(.store-action) { min-height: var(--store-touch-target); } }
</style>
