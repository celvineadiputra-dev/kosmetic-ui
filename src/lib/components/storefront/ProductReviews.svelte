<script lang="ts">
  import { IconStarFilled, IconStar, IconCheck, IconThumbUp, IconMessageDots, IconPencil } from '@tabler/icons-svelte';
  import type { ProductReview, ProductShade } from './products';

  let {
    reviews = [],
    ratingScore = 4.8,
    shades = []
  }: {
    reviews: ProductReview[];
    ratingScore?: number;
    shades?: ProductShade[];
  } = $props();

  let reviewList = $state<ProductReview[]>([]);
  let selectedRatingFilter = $state<number | 'all'>('all');
  let isWritingReview = $state(false);

  // Form state
  let newAuthor = $state('');
  let newRating = $state(5);
  let hoverRating = $state(0);
  let newShade = $state('');
  let newComment = $state('');
  let formError = $state('');
  let submitSuccess = $state(false);

  // Likes tracking
  let userLikedReviews = $state<Record<string, boolean>>({});

  $effect(() => {
    reviewList = [...reviews];
    if (shades.length > 0 && !newShade) {
      newShade = shades[0].name;
    }
  });

  let filteredReviews = $derived(
    selectedRatingFilter === 'all'
      ? reviewList
      : reviewList.filter((r) => r.rating === selectedRatingFilter)
  );

  let ratingCounts = $derived.by(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const r of reviewList) {
      if (counts[r.rating] !== undefined) {
        counts[r.rating]++;
      }
    }
    return counts;
  });

  let currentAverage = $derived.by(() => {
    if (reviewList.length === 0) return ratingScore;
    const total = reviewList.reduce((sum, r) => sum + r.rating, 0);
    return Math.round((total / reviewList.length) * 10) / 10;
  });

  function handleLike(reviewId: string) {
    userLikedReviews[reviewId] = !userLikedReviews[reviewId];
    const review = reviewList.find((r) => r.id === reviewId);
    if (review) {
      review.helpfulCount = (review.helpfulCount ?? 0) + (userLikedReviews[reviewId] ? 1 : -1);
    }
  }

  function handleSubmitReview(e: SubmitEvent) {
    e.preventDefault();
    formError = '';
    if (!newAuthor.trim()) {
      formError = 'Mohon masukkan nama kamu.';
      return;
    }
    if (!newComment.trim() || newComment.trim().length < 5) {
      formError = 'Mohon tulis ulasan minimal 5 karakter.';
      return;
    }

    const created: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      rating: newRating,
      date: 'Baru saja',
      shade: newShade || undefined,
      verified: true,
      comment: newComment.trim(),
      helpfulCount: 0
    };

    reviewList = [created, ...reviewList];
    newAuthor = '';
    newComment = '';
    submitSuccess = true;
    setTimeout(() => {
      submitSuccess = false;
      isWritingReview = false;
    }, 2500);
  }
</script>

<section id="ulasan" class="reviews-section" aria-labelledby="reviews-heading">
  <div class="reviews-header">
    <div>
      <h2 id="reviews-heading">Ulasan & Rating Pembeli</h2>
      <p class="reviews-subtitle">Ditinjau oleh pembeli terverifikasi KOSMETIK.</p>
    </div>
    {#if !isWritingReview}
      <button
        type="button"
        class="write-review-btn"
        onclick={() => (isWritingReview = true)}
        aria-expanded={isWritingReview}
      >
        <IconPencil size={18} stroke={1.5} aria-hidden="true" />
        Tulis Ulasan
      </button>
    {/if}
  </div>

  <!-- Rating Summary Banner -->
  <div class="rating-overview">
    <div class="score-card">
      <div class="big-score">{currentAverage.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</div>
      <div class="star-row" aria-label={`Rating ${currentAverage} dari 5`}>
        {#each Array(5) as _, i}
          <IconStarFilled
            size={20}
            class={i < Math.round(currentAverage) ? 'star-filled' : 'star-dim'}
            aria-hidden="true"
          />
        {/each}
      </div>
      <p class="review-total-count">Berdasarkan {reviewList.length} ulasan</p>
    </div>

    <!-- Rating Distribution Bars -->
    <div class="distribution-bars">
      {#each [5, 4, 3, 2, 1] as star}
        {@const count = ratingCounts[star] || 0}
        {@const percent = reviewList.length > 0 ? Math.round((count / reviewList.length) * 100) : 0}
        <button
          type="button"
          class="bar-row"
          class:active={selectedRatingFilter === star}
          onclick={() => (selectedRatingFilter = selectedRatingFilter === star ? 'all' : star)}
          aria-label={`Filter ${star} bintang, ${count} ulasan`}
        >
          <span class="star-label">{star} <IconStarFilled size={12} aria-hidden="true" /></span>
          <div class="track-bar">
            <div class="fill-bar" style={`width: ${percent}%;`}></div>
          </div>
          <span class="count-label">{count}</span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Interactive Write Review Form -->
  {#if isWritingReview}
    <div class="write-form-container">
      <div class="form-header">
        <h3>Bagikan Pengalamanmu</h3>
        <button
          type="button"
          class="cancel-btn"
          onclick={() => {
            isWritingReview = false;
            formError = '';
          }}
        >
          Batal
        </button>
      </div>

      {#if submitSuccess}
        <div class="success-banner" role="status">
          <IconCheck size={20} aria-hidden="true" />
          <span>Terima kasih! Ulasanmu berhasil dikirimkan.</span>
        </div>
      {:else}
        <form onsubmit={handleSubmitReview} class="review-form">
          <div class="form-group">
            <span class="group-label">Beri Rating</span>
            <div class="star-picker" role="radiogroup" aria-label="Pilih rating bintang">
              {#each [1, 2, 3, 4, 5] as star}
                <button
                  type="button"
                  class="star-button"
                  onmouseenter={() => (hoverRating = star)}
                  onmouseleave={() => (hoverRating = 0)}
                  onclick={() => (newRating = star)}
                  aria-label={`${star} bintang`}
                >
                  {#if (hoverRating || newRating) >= star}
                    <IconStarFilled size={28} class="star-filled" aria-hidden="true" />
                  {:else}
                    <IconStar size={28} class="star-empty" aria-hidden="true" />
                  {/if}
                </button>
              {/each}
              <span class="rating-text-hint">{newRating} dari 5 bintang</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group flex-1">
              <label for="review-author">Nama Kamu</label>
              <input
                id="review-author"
                type="text"
                bind:value={newAuthor}
                placeholder="Contoh: Nadia S."
                required
              />
            </div>
            {#if shades.length > 0}
              <div class="form-group flex-1">
                <label for="review-shade">Varian yang Kamu Beli</label>
                <select id="review-shade" bind:value={newShade}>
                  {#each shades as shade}
                    <option value={shade.name}>{shade.name}</option>
                  {/each}
                </select>
              </div>
            {/if}
          </div>

          <div class="form-group">
            <label for="review-comment">Ulasan Lengkap</label>
            <textarea
              id="review-comment"
              bind:value={newComment}
              placeholder="Ceritakan tekstur, aroma, ketahanan, atau kecocokan produk ini di kulitmu..."
              rows={4}
              required
            ></textarea>
          </div>

          {#if formError}
            <p class="form-error-msg" role="alert">{formError}</p>
          {/if}

          <div class="form-actions">
            <button type="submit" class="submit-review-btn">Kirim Ulasan</button>
          </div>
        </form>
      {/if}
    </div>
  {/if}

  <!-- Review Filter Chips -->
  <div class="filter-row" aria-label="Filter ulasan">
    <button
      type="button"
      class="filter-chip"
      class:selected={selectedRatingFilter === 'all'}
      onclick={() => (selectedRatingFilter = 'all')}
    >
      Semua ({reviewList.length})
    </button>
    {#each [5, 4, 3, 2, 1] as star}
      <button
        type="button"
        class="filter-chip"
        class:selected={selectedRatingFilter === star}
        onclick={() => (selectedRatingFilter = star)}
      >
        {star} Bintang ({ratingCounts[star] || 0})
      </button>
    {/each}
  </div>

  <!-- Review Cards List -->
  {#if filteredReviews.length === 0}
    <div class="empty-reviews">
      <IconMessageDots size={36} stroke={1.5} class="empty-icon" aria-hidden="true" />
      <p>Belum ada ulasan untuk filter {selectedRatingFilter} bintang.</p>
      <button type="button" class="reset-filter-btn" onclick={() => (selectedRatingFilter = 'all')}>
        Lihat Semua Ulasan
      </button>
    </div>
  {:else}
    <div class="review-cards-list">
      {#each filteredReviews as review (review.id)}
        <article class="review-card">
          <header class="review-card-header">
            <div class="author-info">
              <div class="avatar-circle" aria-hidden="true">
                {review.author.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div class="author-name-row">
                  <span class="author-name">{review.author}</span>
                  {#if review.verified}
                    <span class="verified-pill">
                      <IconCheck size={12} stroke={2.5} aria-hidden="true" />
                      Terverifikasi
                    </span>
                  {/if}
                </div>
                <div class="review-meta">
                  <div class="review-stars" aria-label={`Rating ${review.rating} bintang`}>
                    {#each Array(5) as _, i}
                      <IconStarFilled
                        size={14}
                        class={i < review.rating ? 'star-filled' : 'star-dim'}
                        aria-hidden="true"
                      />
                    {/each}
                  </div>
                  <span class="meta-dot">·</span>
                  <time class="review-date">{review.date}</time>
                  {#if review.shade}
                    <span class="meta-dot">·</span>
                    <span class="shade-pill">Varian: {review.shade}</span>
                  {/if}
                </div>
              </div>
            </div>

            <button
              type="button"
              class="helpful-btn"
              class:liked={userLikedReviews[review.id]}
              onclick={() => handleLike(review.id)}
              aria-label={`Tandai ulasan bermanfaat. Sekarang ${review.helpfulCount ?? 0} orang terbantu.`}
            >
              <IconThumbUp size={14} stroke={1.5} aria-hidden="true" />
              <span>Bermanfaat ({review.helpfulCount ?? 0})</span>
            </button>
          </header>

          <p class="review-comment-body">{review.comment}</p>
        </article>
      {/each}
    </div>
  {/if}
</section>

<style>
  .reviews-section {
    margin-top: calc(var(--store-section-space) * 0.85);
    padding-top: var(--pad);
    border-top: 1px solid var(--border);
  }
  .reviews-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    gap: var(--gap);
    margin-bottom: var(--pad);
  }
  h2 {
    font: 700 var(--fs-title)/1.2 var(--font);
    color: var(--text);
    margin: 0;
  }
  .reviews-subtitle {
    font-size: var(--fs-body);
    color: var(--muted);
    margin-top: 4px;
  }
  .write-review-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    min-height: var(--control-height);
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.4 var(--font);
    cursor: pointer;
    transition: background-color var(--t-hover) var(--ease-out), border-color var(--t-hover) var(--ease-out);
  }
  .write-review-btn:hover {
    background: var(--raised);
    border-color: var(--text);
  }

  /* Rating Overview Box */
  .rating-overview {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: var(--pad);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: var(--pad);
    margin-bottom: var(--pad);
  }
  .score-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-right: var(--pad);
    border-right: 1px solid var(--rule);
  }
  .big-score {
    font: 700 48px/1 var(--font);
    color: var(--text);
    letter-spacing: -0.03em;
  }
  .star-row {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }
  :global(.star-filled) {
    color: var(--store-rating-star);
  }
  :global(.star-dim) {
    color: var(--rule);
  }
  :global(.star-empty) {
    color: var(--control);
  }
  .review-total-count {
    font-size: var(--fs-small);
    color: var(--muted);
    margin-top: 6px;
  }

  /* Distribution Bars */
  .distribution-bars {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }
  .bar-row {
    display: grid;
    grid-template-columns: 44px 1fr 32px;
    align-items: center;
    gap: 12px;
    background: none;
    border: none;
    padding: 2px 6px;
    border-radius: var(--radius-control);
    cursor: pointer;
    font: inherit;
    text-align: left;
    transition: background-color var(--t-hover) var(--ease-out);
  }
  .bar-row:hover,
  .bar-row.active {
    background: var(--raised);
  }
  .star-label {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--text);
  }
  .star-label :global(svg) {
    color: var(--store-rating-star);
  }
  .track-bar {
    width: 100%;
    height: 8px;
    background: var(--rule);
    border-radius: 999px;
    overflow: hidden;
  }
  .fill-bar {
    height: 100%;
    background: var(--store-rating-star);
    border-radius: 999px;
    transition: width 300ms var(--ease-out);
  }
  .count-label {
    font-size: var(--fs-small);
    color: var(--muted);
    text-align: right;
  }

  /* Form */
  .write-form-container {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: var(--pad);
    margin-bottom: var(--pad);
  }
  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--gap);
  }
  .form-header h3 {
    font: 600 var(--fs-section)/1.3 var(--font);
    color: var(--text);
    margin: 0;
  }
  .cancel-btn {
    background: none;
    border: none;
    color: var(--muted);
    font-size: var(--fs-small);
    cursor: pointer;
    padding: 4px 8px;
    border-radius: var(--radius-control);
  }
  .cancel-btn:hover {
    color: var(--text);
    background: var(--raised);
  }
  .review-form {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-group label,
  .group-label {
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--text);
  }
  .star-picker {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .star-button {
    background: none;
    border: none;
    padding: 2px;
    cursor: pointer;
    border-radius: var(--radius-control);
    display: inline-flex;
    transition: transform var(--t-press) var(--ease-out);
  }
  .star-button:active {
    transform: scale(0.9);
  }
  .rating-text-hint {
    margin-inline-start: 12px;
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--muted);
  }
  .form-row {
    display: flex;
    gap: var(--gap);
  }
  .flex-1 {
    flex: 1;
  }
  input[type='text'],
  select,
  textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    background: var(--surface);
    color: var(--text);
    font: var(--fs-body)/1.4 var(--font);
    box-sizing: border-box;
    transition: border-color var(--t-hover) var(--ease-out);
  }
  input[type='text']:focus,
  select:focus,
  textarea:focus {
    border-color: var(--accent);
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
  .form-error-msg {
    color: var(--negative);
    font-size: var(--fs-small);
    font-weight: 500;
    margin: 0;
  }
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  .submit-review-btn {
    padding: 10px 24px;
    background: var(--primary);
    color: var(--primary-ink);
    border: none;
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.3 var(--font);
    cursor: pointer;
    transition: opacity var(--t-hover) var(--ease-out);
  }
  .submit-review-btn:hover {
    opacity: 0.9;
  }
  .success-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 14px 18px;
    background: color-mix(in srgb, var(--positive) 12%, transparent);
    color: var(--positive);
    border-radius: var(--radius-control);
    font-weight: 600;
    font-size: var(--fs-body);
  }

  /* Filters */
  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: var(--pad);
  }
  .filter-chip {
    padding: 6px 14px;
    background: var(--surface);
    color: var(--muted);
    border: 1px solid var(--border);
    border-radius: 999px;
    font: 500 var(--fs-small)/1.4 var(--font);
    cursor: pointer;
    transition: all var(--t-hover) var(--ease-out);
  }
  .filter-chip:hover {
    color: var(--text);
    border-color: var(--control);
  }
  .filter-chip.selected {
    background: var(--primary);
    color: var(--primary-ink);
    border-color: var(--primary);
    font-weight: 600;
  }

  /* Review Cards */
  .review-cards-list {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }
  .review-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: var(--card-pad);
  }
  .review-card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--gap);
    margin-bottom: 12px;
  }
  .author-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .avatar-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    background: var(--raised);
    color: var(--text);
    font: 700 var(--fs-body)/1 var(--font);
    flex-shrink: 0;
  }
  .author-name-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .author-name {
    font-weight: 600;
    font-size: var(--fs-body);
    color: var(--text);
  }
  .verified-pill {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 2px 6px;
    background: color-mix(in srgb, var(--positive) 12%, transparent);
    color: var(--positive);
    border-radius: 999px;
    font-size: var(--fs-small);
    font-weight: 600;
  }
  .review-meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    font-size: var(--fs-small);
    color: var(--muted);
  }
  .review-stars {
    display: inline-flex;
    gap: 2px;
  }
  .meta-dot {
    color: var(--control);
  }
  .shade-pill {
    color: var(--muted);
  }
  .helpful-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    background: none;
    border: 1px solid var(--border);
    border-radius: var(--radius-control);
    font-size: var(--fs-small);
    color: var(--muted);
    cursor: pointer;
    transition: all var(--t-hover) var(--ease-out);
  }
  .helpful-btn:hover {
    color: var(--text);
    border-color: var(--control);
    background: var(--raised);
  }
  .helpful-btn.liked {
    color: var(--accent);
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 10%, transparent);
  }
  .review-comment-body {
    font-size: var(--fs-body);
    line-height: 1.6;
    color: var(--text);
    margin: 0;
    text-wrap: pretty;
  }

  /* Empty state */
  .empty-reviews {
    text-align: center;
    padding: calc(var(--pad) * 1.5);
    background: var(--surface);
    border: 1px dashed var(--control);
    border-radius: var(--radius-card);
    color: var(--muted);
  }
  :global(.empty-icon) {
    color: var(--faint);
    margin-bottom: 8px;
  }
  .reset-filter-btn {
    margin-top: 12px;
    padding: 6px 14px;
    background: var(--surface);
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    font-size: var(--fs-small);
    font-weight: 600;
    cursor: pointer;
  }

  @media (max-width: 767px) {
    .rating-overview {
      grid-template-columns: 1fr;
    }
    .score-card {
      border-right: none;
      border-bottom: 1px solid var(--rule);
      padding-right: 0;
      padding-bottom: var(--pad);
    }
    .form-row {
      flex-direction: column;
    }
    .review-card-header {
      flex-direction: column;
    }
  }
</style>
