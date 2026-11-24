import test from "node:test";
import assert from "node:assert/strict";
import {
  calculateInstallmentQuote,
  getDefaultInstallmentQuote,
  getMethodFees,
} from "./installmentCalculator.js";

const store = { minDown: 25, plans: { 3: 4, 6: 8, 12: 16 } };
const method = { id: "own", minDown: 30, maxFinancing: 100_000_000, months: [3, 6, 12] };

test("calculates markup, monthly installments and final installment", () => {
  const quote = calculateInstallmentQuote({
    amount: 68_000_000,
    store,
    method,
    months: 6,
    downPayment: 20_400_000,
  });

  assert.equal(quote.remainder, 47_600_000);
  assert.equal(quote.markup, 3_808_000);
  assert.equal(quote.payable, 51_408_000);
  assert.equal(quote.monthly, 8_568_000);
  assert.equal(quote.last, 8_568_000);
  assert.equal(quote.total, 71_808_000);
});

test("rejects a down payment below the method minimum", () => {
  assert.throws(
    () => calculateInstallmentQuote({
      amount: 10_000_000,
      store,
      method,
      months: 6,
      downPayment: 2_000_000,
    }),
    /پیش‌پرداخت/,
  );
});

test("rejects a term that is not supported by the selected method", () => {
  assert.throws(
    () => calculateInstallmentQuote({
      amount: 10_000_000,
      store,
      method,
      months: 18,
      downPayment: 3_000_000,
    }),
    /تعداد اقساط/,
  );
});

test("selects a supported default term and respects financing ceiling", () => {
  const quote = getDefaultInstallmentQuote(68_000_000, store, method);
  assert.equal(quote.months, 6);
  assert.ok(quote.remainder <= method.maxFinancing);
});

test("applies fees according to the source method rules", () => {
  assert.equal(getMethodFees("bank"), 39000);
  assert.equal(getMethodFees("cheque"), 25000);
  assert.equal(getMethodFees("own"), 64000);
  assert.equal(getMethodFees("gold"), 0);
});
