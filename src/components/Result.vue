<template>
  <section class="result">
      <div class="result__item-wrapper">
        <h2 class="result__item-title">Ежемесячный платеж</h2>
        <p class="result__item">9458645</p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">Необходимый доход</h2>
        <p class="result__item">45645666</p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">Переплата</h2>
        <p class="result__item">456475</p>
      </div>
      <div class="result-item__wrapper">
        <h2 class="result__item-title">Тело кредита</h2>
        <p class="result__item">56756876875856</p>
      </div>
    </section>
</template>

<style scoped>
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
