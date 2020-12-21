<template>
<div class="calculator">
  <form class="form">
    <fieldset class="form__field">
      <label for="price">Стоимость недвижимости</label>
      <currency-input class="form__input" id="price" name="price" v-model.number="price"/>
    </fieldset>
    <fieldset class="form__field">
      <label for="initial_payment">Первоначальный взнос</label>
      <currency-input class="form__input" id="initial_payment" name="initial_payment" v-model.number="initialPayment"/>
      <ul class="form__list checkbox-list">
        <li class="form__option">
          <input class="checkbox-list__input visually-hidden" type="checkbox" id="10">
          <label for="10">10%</label>
        </li>
        <li class="form__option">
          <input class="checkbox-list__input visually-hidden" type="checkbox" id="15">
          <label for="15">15%</label>
        </li>
        <li class="form__option">
          <input class="checkbox-list__input visually-hidden" type="checkbox" id="20">
          <label for="20">20%</label>
        </li>
        <li class="form__option">
          <input class="checkbox-list__input visually-hidden" type="checkbox" id="25">
          <label for="25">25%</label>
        </li>
        <li class="form__option">
          <input class="checkbox-list__input visually-hidden" type="checkbox" id="30">
          <label for="30">30%</label>
        </li>
      </ul>
    </fieldset>
    <fieldset class="form__field">
      <label for="term">Срок кредита</label>
      <input class="form__input" id="term" name="term" v-model.number="term">
    </fieldset>
    <fieldset class="form__field">
      <label for="rate">Процентная ставка</label>
      <input class="form__input" id="rate" name="rate" v-model.number="rate">
    </fieldset>
    <fieldset class="form__field form__field--buttons">
      <button class="button button--save" type="submit">Сохранить</button>
      <button class="button" type="reset">Очистить</button>
  </fieldset>
  </form>
  <section class="result">
      <div class="result__item-wrapper">
        <h2 class="result__item-title">Ежемесячный платеж</h2>
        <p class="result__item">{{ monthlyPayment | toRUB }}</p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">Необходимый доход</h2>
        <p class="result__item">{{ requaredIncome | toRUB }}</p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">Переплата</h2>
        <p class="result__item">{{ overPayment | toRUB }}</p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">Тело кредита</h2>
        <p class="result__item">{{ creditAmount | toRUB }}</p>
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
      rate: 0
    }
  },

  computed: {
    creditAmount: function () {
      return this.price - this.initialPayment
    },

    monthlyPayment: function () {
      let monthlyTerm = this.term * 12;
      return Math.round(this.creditAmount * (this.rate/1200 + (this.rate/1200)/((1+this.rate/1200)**monthlyTerm-1)))
    },

    requaredIncome: function () {
      return Math.round(5 * this.monthlyPayment/3)
    },

    overPayment: function () {
      if (this.monthlyPayment) {
        return (this.monthlyPayment * (this.term * 12)) - this.price + this.initialPayment
      }
    },
  },

  filters: {
    toRUB: function (value) {
      if (!value) return '';
      return value.toLocaleString()
    }
  }
}
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

.checkbox-list label {
  cursor: pointer;

  width: 35px;
  height: 20px;
  padding: 5px;
  border-radius: 5px;

  background-color: rgb(226, 217, 217);
}

.checkbox-list__input:checked + label {
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

