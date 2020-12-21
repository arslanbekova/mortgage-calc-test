import Vue from 'vue'
import App from './App.vue'
import VueCurrencyInput from 'vue-currency-input'

Vue.config.productionTip = false

const pluginOptions = {
  globalOptions: {
    locale: 'ru',
    currency: null,
    valueAsInteger: false,
    distractionFree: {
      hideNeglposedDecimalDigits: false,
      hideCurrencySymbol: true,
      hideGroupingSymbol: false
    },
    precision: 0,
    autoDecimalMode: true,
    valueRange: {
      min: 0,
      max: 999000000
    },
    allowNegative: false
   }
}
Vue.use(VueCurrencyInput, pluginOptions)

new Vue({
  render: h => h(App),
}).$mount('#app')

// new Vue({
//   el: '#app',
//   template: '<App/>',
//   components: { App }
// })
