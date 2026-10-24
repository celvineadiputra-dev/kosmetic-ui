import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

let server;
let PromoBanner;
let render;

before(async () => {
	server = await createServer({
		appType: 'custom',
		logLevel: 'silent',
		server: { middlewareMode: true, watch: null, ws: false }
	});
	({ render } = await server.ssrLoadModule('svelte/server'));
	PromoBanner = (await server.ssrLoadModule('/src/lib/components/storefront/PromoBanner.svelte')).default;
}, { timeout: 30_000 });

after(async () => {
	await server?.close();
}, { timeout: 30_000 });

test('renders an accessible editorial promo banner', () => {
	const { body } = render(PromoBanner, { props: { collectionHref: '#baru' } });

	assert.match(body, /Koleksi Unggulan/);
	assert.match(body, /<h2[^>]*>Tampil natural,[\s\S]*cantik setiap hari\.<\/h2>/);
	assert.match(
		body,
		/Pilihan formula lembut dan warna esensial untuk riasan harian yang selalu terasa ringan seperti kulitmu sendiri\./
	);
	assert.match(body, /href="#baru"[^>]*>[\s\S]*Jelajahi Koleksi/);
	assert.match(body, /Formula Ringan/);
	assert.match(body, /Pigmentasi Halus/);
	assert.match(body, /Nyaman Seharian/);
	assert.match(
		body,
		/<img[^>]*src="[^"]*Sunlit%20Beauty%20Still%20Life%20with%20Blossoms\.png|[^"]*Sunlit Beauty Still Life with Blossoms\.png"[^>]*alt="[^"]+"/
	);
});
