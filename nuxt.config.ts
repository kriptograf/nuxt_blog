// https://nuxt.com/docs/api/configuration/nuxt-config
// -- Помощник defineNuxtConfig доступен глобально без импорта.
export default defineNuxtConfig({
    modules: [
        '@nuxtjs/tailwindcss'
    ],
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        // config: {},
        injectPosition: 0,
        viewer: true
    },
    postcss: {
        plugins: {
        tailwindcss: {},
        autoprefixer: {},
        },
    },
})
