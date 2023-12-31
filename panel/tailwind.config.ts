/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
const plugin = require('tailwindcss/plugin')
const colors=require('./colors')


module.exports = {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/composables/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/plugins/**/*.{js,ts}",
    "./src/store/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/App.vue",
    "./src/error.vue",
      "./formkit.schema.ts"
  ],
  theme: {
    screens: {
      'sm': '500px',
      'md':  '768px',
      'lg': '968px',
      'xlg':  '1200px'
    },
    spacing: {
      '0':'0',
      '0.1':'0.1rem',
      '0.2':'0.2rem',
      '0.3':'0.3rem',
      '0.4':'0.4rem',
      '0.5':'0.5rem',
      '0.6':'0.6rem',
      '0.7':'0.7rem',
      '0.8':'0.8rem',
      '0.9':'0.9rem',
      '1':'1rem',
      '1.1':'1.1rem',
      '1.2':'1.2rem',
      '1.3':'1.3rem',
      '1.4':'1.4rem',
      '1.5':'1.5rem',
      '1.6':'1.6rem',
      '1.7':'1.7rem',
      '1.8':'1.8rem',
      '1.9':'1.9rem',
      '2':'2rem',
      '2.25':'2.25rem',
      '2.5':'2.5rem',
      '2.75':'2.5rem',
      '3':'3rem',
      '3.25':'3.25rem',
      '3.5':'3.5rem',
      '3.75':'3.75rem',
      '4':'4rem',
      '4.25':'4.25rem',
      '4.5':'4.5rem',
      '4.75':'4.75rem',
      '5':'5rem',
      '5.25':'5.25rem',
      '5.5':'5.5rem',
      '5.75':'5.75rem',
      '6':'6rem',
      '7':'7rem',
      '8':'8rem',
      '9':'9rem',
      '10':'10rem',
      '11':'11rem',
      '12':'12rem',
      '13':'13rem',
      '14':'14rem',
      '15':'15rem',
      '16':'16rem',
      '17':'17rem',
      '18':'18rem',
      '19':'19rem',
      '20':'20rem',
      '21':'21rem',
      '22':'22rem',
      '23':'23rem',
      '24':'24rem',
    },
    fontSize:{
      '0':'0',
      '0.1':'0.1rem',
      '0.2':'0.2rem',
      '0.3':'0.3rem',
      '0.4':'0.4rem',
      '0.5':'0.5rem',
      '0.6':'0.6rem',
      '0.7':'0.7rem',
      '0.8':'0.8rem',
      '0.9':'0.9rem',
      '1':'1rem',
      '1.1':'1.1rem',
      '1.2':'1.2rem',
      '1.3':'1.3rem',
      '1.4':'1.4rem',
      '1.5':'1.5rem',
      '1.6':'1.6rem',
      '1.7':'1.7rem',
      '1.8':'1.8rem',
      '1.9':'1.9rem',
      '2':'2rem',
      '2.25':'2.25rem',
      '2.5':'2.5rem',
      '2.75':'2.5rem',
      '3':'3rem',
      '3.25':'3.25rem',
      '3.5':'3.5rem',
      '3.75':'3.75rem',
      '4':'4rem',
      '4.25':'4.25rem',
      '4.5':'4.5rem',
      '4.75':'4.75rem',
      '5':'5rem',
      '5.25':'5.25rem',
      '5.5':'5.5rem',
      '5.75':'5.75rem',
      '6':'6rem',
      '7':'7rem',
      '8':'8rem',
      '9':'9rem',
      '10':'10rem',
      '11':'11rem',
      '12':'12rem',
      '13':'13rem',
      '14':'14rem',
      '15':'15rem',
      '16':'16rem',
      '17':'17rem',
      '18':'18rem',
      '19':'19rem',
      '20':'20rem',
      '21':'21rem',
      '22':'22rem',
      '23':'23rem',
      '24':'24rem',
    },
    fontWeight:{
      '100':'100',
      '200':'200',
      '300':'300',
      '400':'400',
      '500':'500',
      '600':'600',
      '700':'700',
      '800':'800',
      '900':'900'
    },
    lineHeight:{
      '1':'1',
      '1.1':'1.1',
      '1.2':'1.2',
      '1.3':'1.3',
      '1.4':'1.4',
      '1.5':'1.5',
      '1.6':'1.6',
      '1.7':'1.7',
      '1.8':'1.8',
      '1.9':'1.9',
      '2':'2',
      '3':'3',
      '4':'4',
    },
    borderRadius:{
      '1':'1px',
      '2':'2px',
      '3':'3px',
      '4':'4px',
      '5':'5px',
      '6':'6px',
      '7':'7px',
      '8':'8px',
      '9':'9px',
      '10':'10px',
      '12':'12px',
      '14':'14px',
      '16':'16px',
      '18':'18px',
      '20':'20px',
      '24':'24px',
      '26':'26px',
      '28':'28px',
      'full':'9999px'
    },
    fontFamily:{
      poppins:['Poppins','sans-serif'],
      openSans:['Open Sans','sans-serif'],
      playFair:['Playfair Display','serif'],
      dance:['Moon Dance', 'cursive'],
      robot:['Roboto', 'sans-serif']
    },
    container:{
      center:true,
    },

    extend:{
      colors:colors,
      animation: {
        'topbar': '10s linear 0s infinite normal none running topbar-movement',
        'navbar': '50s linear 0s infinite normal none running topbar-movement',
      },
      keyframes: {
        'topbar-movement': {
          '0%': { 'background-position-x':'0' },
          '100%': { 'background-position-x':'100%' }
        }
      }
    }
  },
  plugins: [
    plugin(function ({addBase}:any) {
      addBase({
        '*':{
          fontFamily:'theme(fontFamily.poppins)'
        },
        'body':{
          overflowX:'hidden',
          backgroundColor:'theme(colors[primary-dark-1])'
        },
        'body *::selection':{
          backgroundColor:'theme(colors[primary-light-1])',
          color:'theme(colors[primary-light-4])'
        },
        'h1,h2,h3,h4,h5,h6':{
          lineHeight:'1.6',
          fontWeight:'500',
          color:'theme(colors[primary-light-2])'
        },
        'p,span,a':{
          fontSize:'0.9rem',
          fontWeight:'500',
          lineHeight:'1.5',
          color:'theme(colors[primary-light-3])'
        },
        'button':{
          color:'theme(colors[primary-light-4])'
        }
      })
    })
  ],
}