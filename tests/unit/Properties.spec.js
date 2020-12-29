import {shallowMount} from "@vue/test-utils";
import Calculator from "@/components/Calculator.vue";

describe(`Properties.spec.js`, () => {
  const resultValues = {
    CREDIT_AMOUNT: 8000000,
    MONTHLY_PAYMENT: 71906,
    REQUARED_INCOME: 119843,
    OVER_PAYMENT: 4943080,
  };

  let cmp;

  beforeEach(() => {
    cmp = shallowMount(Calculator);
  });

  describe(`Properties`, () => {
    it(`check computed`, () => {
      cmp.setData({
        price: 10000000,
        initialPayment: 2000000,
        term: 15,
        rate: 7
      });

      expect(cmp.vm.creditAmount).toBe(resultValues.CREDIT_AMOUNT);
      expect(cmp.vm.monthlyPayment).toBe(resultValues.MONTHLY_PAYMENT);
      expect(cmp.vm.requaredIncome).toBe(resultValues.REQUARED_INCOME);
      expect(cmp.vm.overPayment).toBe(resultValues.OVER_PAYMENT);
    });
  });
});
