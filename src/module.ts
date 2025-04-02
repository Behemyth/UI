import {
	defineNuxtModule,
	createResolver,
	installModule,
	addComponentsDir,
	addImports,
} from '@nuxt/kit';

// Module options TypeScript interface definition
export interface ModuleOptions {
	prefix?: string;
}

export default defineNuxtModule<ModuleOptions>({
	meta: {
		name: 'deermice-ui',
		configKey: 'deermice-ui',
	},
	// Default configuration options of the Nuxt module
	defaults: {
		prefix: 'D',
	},
	async setup(options, nuxt) {
		const { resolve } = createResolver(import.meta.url);

		nuxt.options.alias['#deermice-ui'] = resolve('./runtime');

		// Modules - Installs tailwind, fonts, icons, etc
		await installModule('@nuxt/ui');

		// Components
		addComponentsDir({
			path: resolve('./runtime/components'),
			pathPrefix: true,
			prefix: options.prefix,
			global: true,
		});

		// Prose Overrides
		addComponentsDir({
			path: resolve('./runtime/prose'),
			pathPrefix: false,
			global: true,
		});

		// Utilities
		if (nuxt.options._installedModules?.some(m => m.meta.name === '@nuxt/content')) {
			addImports([
				{ name: 'mapContentNavigation', from: resolve('./runtime/utils') },
				{ name: 'mapContentBreadcrumbs', from: resolve('./runtime/utils') },
			]);
		}
	},
});
