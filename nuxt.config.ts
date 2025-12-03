import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css', 'animate.css'],
  app: {
    head: {
      link: [{ rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_colors.scss" as *;'
        }
      },
      preprocessorMaxWorkers: true, //? number of CPUs minus 1
    },
    plugins: [
      tailwindcss(),
    ],
    vue: {
      customElement: true,
    },
    vueJsx: {
      mergeProps: true,
    }
  },
  $production: {
    routeRules: {
      '/**': { isr: true },
    },
  },
  $development: {},
  $env: {
    staging: {}
  }
})
