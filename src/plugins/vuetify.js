import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';


import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi', // default - only for display purposes
      },
      theme: {
        themes: {
          light: {
            primary: '#1976D2',
            secondary: '#424242',
            accent: '#82B1FF',
          },
          dark: {
            primary: '#2196F3',
            secondary: '#424242',
            accent: '#FF4081',
          },
        },
      },
});
