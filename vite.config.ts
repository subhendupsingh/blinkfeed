import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		allowedHosts: ['23da-2401-4900-8838-78a9-eda6-d776-4e23-8768.ngrok-free.app', '127.0.0.1', 'localhost']
	}
});
