<template>
  <div class="calculator">
    <form
      class="form"
      @submit.prevent="saveData"
    >
      <fieldset class="form__field">
        <label for="price">Стоимость недвижимости</label>
        <currency-input
          id="price"
          v-model.number="price"
          class="form__input"
          name="price"
        />
      </fieldset>
      <fieldset class="form__field">
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
      <fieldset class="form__field">
        <label for="term">Срок кредита</label>
        <currency-input
          id="term"
          v-model.number="term"
          class="form__input"
          name="term"
        />
      </fieldset>
      <fieldset class="form__field">
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
  </div>
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

<style scoped>
  .visually-hidden {
    position: absolute;

    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;

    white-space: nowrap;

    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
  }

  .calculator {
    display: flex;
  }

  .form {
    width: 350px;
    margin: 0;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
  }

  .form__field {
    border: none;
    margin: 0;
    padding: 0;
    margin-bottom: 15px;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  .form__field label {
    padding-top: 15px;
    margin-bottom: 5px;
  }

  .form__field--buttons {
    flex-direction: row;
    justify-content: space-between;
  }

  .button {
    width: 140px;
    box-sizing: border-box;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 35px;
    padding-right: 35px;

    border: 1px solid rgb(173, 168, 168);
    border-radius: 5px;

    background-color: rgba(228, 224, 224, 0.4);

    color: rgb(131, 127, 127);

    cursor: pointer;
  }

  .button--save {
    background-color: rgb(97, 179, 97);
    color: white;
    border: none;
  }

  .form__input {
    width: 100%;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 10px;
    border: 1px solid rgb(173, 168, 168);
    border-radius: 5px;
    box-sizing: border-box;

    cursor: pointer;
    transition: 0.2s;

    font-size: 19px;
    line-height: 18px;
    color: black;
  }

  .form__input:hover,
  .form__input:focus,
  .form__input:active {
    border-color: rgb(32, 31, 31);
  }

  .form__list {
    list-style: none;
    margin: 15px 0 0 0;
    padding: 0;

    display: flex;
    justify-content: space-between;
  }

  .radio-list label {
    cursor: pointer;

    width: 35px;
    height: 20px;
    padding: 5px;
    border-radius: 5px;

    background-color: rgb(226, 217, 217);
  }

  .radio-list__input:checked + label {
    background-color: rgb(88, 149, 235);
    color: white;
  }

  .result {
    background-color: rgb(226, 220, 220);

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    height: 250px;
    width: 600px;
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 42px;

    border-radius: 5px;
  }

  .result-item__wrapper {
    width: 45%;
  }

  .result__item-title {
    font-size: 16px;
    margin: 0;
    margin-bottom: 10px;
  }

  .result__item {
    font-size: 24px;
    margin: 0;
  }
</style>

