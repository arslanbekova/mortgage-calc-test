<template>
  <main class="page-main">
    <form
      class="form"
      @submit.prevent="saveData"
    >
      <fieldset class="form__field form__field--price">
        <label for="price">Стоимость недвижимости</label>
        <currency-input
          id="price"
          v-model.number="price"
          class="form__input"
          name="price"
        />
      </fieldset>
      <fieldset class="form__field form__field--initial-payment">
        <label for="initial_payment">Первоначальный взнос</label>
        <currency-input
          id="initial_payment"
          v-model.number="initialPayment"
          class="form__input"
          name="initial_payment"
        />
        <ul class="form__list radio-list">
          <li class="form__option">
            <input
              id="10"
              v-model="percent"
              class="radio-list__input visually-hidden"
              type="radio"
              :value="10"
              name="initial-payment-group"
            >
            <label for="10">10%</label>
          </li>
          <li class="form__option">
            <input
              id="15"
              v-model="percent"
              class="radio-list__input visually-hidden"
              type="radio"
              :value="15"
              name="initial-payment-group"
            >
            <label for="15">15%</label>
          </li>
          <li class="form__option">
            <input
              id="20"
              v-model="percent"
              class="radio-list__input visually-hidden"
              type="radio"
              :value="20"
              name="initial-payment-group"
            >
            <label for="20">20%</label>
          </li>
          <li class="form__option">
            <input
              id="25"
              v-model="percent"
              class="radio-list__input visually-hidden"
              type="radio"
              :value="25"
              name="initial-payment-group"
            >
            <label for="25">25%</label>
          </li>
          <li class="form__option">
            <input
              id="30"
              v-model="percent"
              class="radio-list__input visually-hidden"
              type="radio"
              :value="30"
              name="initial-payment-group"
            >
            <label for="30">30%</label>
          </li>
        </ul>
      </fieldset>
      <fieldset class="form__field form__field--term">
        <label for="term">Срок кредита</label>
        <currency-input
          id="term"
          v-model.number="term"
          class="form__input"
          name="term"
        />
      </fieldset>
      <fieldset class="form__field form__field--rate">
        <label for="rate">Процентная ставка</label>
        <currency-input
          id="rate"
          v-model.number="rate"
          class="form__input"
          name="rate"
        />
      </fieldset>
      <fieldset class="form__field form__field--buttons">
        <button
          class="button button--save"
          type="submit"
          @click="saveData"
        >
          Сохранить
        </button>
        <button
          class="button"
          type="reset"
          @click="resetForm"
        >
          Очистить
        </button>
      </fieldset>
    </form>
    <section class="result">
      <div class="result__item-wrapper">
        <h2 class="result__item-title">
          Ежемесячный платеж
        </h2>
        <p class="result__item">
          {{ monthlyPayment ? monthlyPayment : '0' | toRUB }} <span>&#8381;</span>
        </p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">
          Необходимый доход
        </h2>
        <p class="result__item">
          {{ requaredIncome ? requaredIncome : '0' | toRUB }} <span>&#8381;</span>
        </p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">
          Переплата
        </h2>
        <p class="result__item">
          {{ overPayment ? overPayment : '0' | toRUB }} <span>&#8381;</span>
        </p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">
          Тело кредита
        </h2>
        <p class="result__item">
          {{ creditAmount ? creditAmount : '0' | toRUB }} <span>&#8381;</span>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      price: 0,
      initialPayment: 0,
      term: 0,
      rate: 0,
      percent: 0,
      MONTHS_COUNT: 12,
    };
  },

  computed: {
    creditAmount: {
      get() {
        return this.price - this.initialPayment;
      },
      set(newValue) {
        this.price = newValue;
        this.initialPayment = newValue;
      }
    },

    monthlyPayment() {
      let monthlyTerm = this.term * this.MONTHS_COUNT;
      return Math.round(this.creditAmount * (this.rate / 1200 + (this.rate / 1200) / ((1 + this.rate / 1200) * monthlyTerm - 1)));
    },

    requaredIncome() {
      return Math.round(5 * this.monthlyPayment / 3);
    },

    overPayment() {
      if (this.monthlyPayment) {
        return (this.monthlyPayment * (this.term * this.MONTHS_COUNT)) - this.price + this.initialPayment;
      }
      return 0;
    }
  },

  watch: {
    initialPayment: {
      handler(val) {
        if (this.percent) {
          this.price = val / (this.percent / 100);
        }
      }
    },

    price: {
      handler() {
        if (this.percent) {
          this.initialPayment = this.price * (this.percent / 100);
        }
      }
    },

    percent: {
      handler: `setAnchor`,
    },
  },

  mounted() {
    if (localStorage.price) {
      this.price = Number(localStorage.price);
    }

    if (localStorage.initialPayment) {
      this.initialPayment = Number(localStorage.initialPayment);
    }

    if (localStorage.term) {
      this.term = Number(localStorage.term);
    }

    if (localStorage.rate) {
      this.rate = Number(localStorage.rate);
    }
  },

  methods: {
    resetForm() {
      this.creditAmount = 0;
      localStorage.clear();
    },

    saveData() {
      localStorage.price = this.price;
      localStorage.initialPayment = this.initialPayment;
      localStorage.term = this.term;
      localStorage.rate = this.rate;
    },

    setAnchor() {
      this.initialPayment = this.price * (this.percent / 100);
    },
  },

  filters: {
    toRUB(value) {
      if (!value) {
        return ``;
      }
      return value.toLocaleString();
    }
  }
};
</script>
