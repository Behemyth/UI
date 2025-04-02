import { createResolver } from '@nuxt/kit';

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
	// Reference the parent directory's module
	modules: ['../src/module'],
	devtools: {
		enabled: true,
	},

	css: ['~/assets/css/main.css'],

	future: {
		compatibilityVersion: 4,
	},
	compatibilityDate: '2024-11-12',

	// The stylesheet does not exist in this workspace, so we have to reference the parent's stubbed distribution
	vite: {
		resolve: {
			alias: {
				'@deermice/ui': resolve('../dist/runtime/index.css'),
			},
		},
	},
});
