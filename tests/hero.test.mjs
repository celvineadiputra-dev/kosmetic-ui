import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

let server;
let Hero;
let render;

before(async () => {
	server = await createServer({
		appType: 'custom',
		logLevel: 'silent',
		server: { middlewareMode: true, watch: null, ws: false }
	});
	({ render } = await server.ssrLoadModule('svelte/server'));
	Hero = (await server.ssrLoadModule('/src/lib/components/storefront/Hero.svelte')).default;
}, { timeout: 30_000 });

after(async () => {
	await server?.close();
}, { timeout: 30_000 });

test('renders an accessible editorial shopping hero', () => {
	const { body } = render(Hero, { props: { shopHref: '#koleksi' } });

	assert.match(body, /<h1[^>]*>Riasan simpel,[\s\S]*cantik setiap hari\.<\/h1>/);
	assert.match(
		body,
		/Temukan pilihan makeup dengan warna natural untuk tampilan yang selalu terasa seperti dirimu\./
	);
	assert.match(body, /href="#koleksi"[^>]*>[\s\S]*Belanja Koleksi/);
	assert.match(body, /BPOM Resmi/);
	assert.match(body, /Produk Original/);
	assert.match(body, /Gratis Ongkir/);
	assert.match(
		body,
		/<img[^>]*src="\/images\/natural-beauty-editorial-hero\.png"[^>]*alt="[^"]+"[^>]*width="1536"[^>]*height="1024"/
	);
});
