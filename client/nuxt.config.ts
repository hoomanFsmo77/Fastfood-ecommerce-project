
export default defineNuxtConfig({
    postcss:{
        plugins: {
            'postcss-import': {},
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build:{
        transpile:[]
    },
    css:[
        '~/assets/App.css',
        '~/assets/Tailwind.config/Tailwind.base.css',
        '~/assets/Tailwind.config/Tailwind.component.css',
        '~/assets/Tailwind.config/Tailwind.utilities.css',
    ],
    app:{
        rootId:'v-app',
        rootTag:'main',
        head:{
            title:'Wengdo - Fast Food',
            meta: [
                { name: 'viewport', content: 'width=device-width ,initial-scale=1.0' },
                { name: 'description', content: 'welcome to My project' },
                { name: 'keyword', content: 'HTML,CSS,Js developer' },
                { "http-equiv": 'X-UA-Compatible', content: 'ie=edge' },
            ],
            bodyAttrs:{},
            link:[
                {rel:'icon',href:'https://public-assets.envato-static.com/icons/themeforest.net/apple-touch-icon-precomposed.png'}
            ]
        }
    },
    srcDir: './src',
    modules: [
        '@pinia/nuxt','@nuxt/image-edge','@nuxtjs/tailwindcss'
    ],
})