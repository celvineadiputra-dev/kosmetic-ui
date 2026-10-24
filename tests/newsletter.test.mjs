import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { createServer } from 'vite';

let server;
let NewsletterSection;
let render;

before(async () => {
	server = await createServer({
		appType: 'custom',
		logLevel: 'silent',
		server: { middlewareMode: true, watch: null, ws: false }
	});
	({ render } = await server.ssrLoadModule('svelte/server'));
	NewsletterSection = (await server.ssrLoadModule('/src/lib/components/storefront/NewsletterSection.svelte')).default;
}, { timeout: 30_000 });

after(async () => {
	await server?.close();
}, { timeout: 30_000 });

test('renders an accessible editorial newsletter invitation card', () => {
	const { body } = render(NewsletterSection, { props: { privacyHref: '?info=privasi#informasi-pratinjau' } });

	assert.match(body, /Warta Eksklusif/i);
	assert.match(body, /<h2[^>]*>Inspirasi riasan natural[\s\S]*di inbox-mu\.<\/h2>/);
	assert.match(
		body,
		/Dapatkan kurasi tren kecantikan, panduan pemilihan warna natural, serta penawaran eksklusif anggota pertama kali\./
	);
	assert.match(body, /<input[^>]*type="email"[^>]*placeholder="Alamat email kamu"/);
	assert.match(body, /Berlangganan/);
	assert.match(body, /href="\?info=privasi#informasi-pratinjau"[^>]*>[\s\S]*kebijakan privasi/);
});
