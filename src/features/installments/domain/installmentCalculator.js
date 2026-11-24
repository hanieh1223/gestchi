const CREDIT_METHODS = new Set(["bank", "own"]);
const CHEQUE_METHODS = new Set(["own", "cheque"]);

export function calculateInstallmentQuote({ amount, store, method, months, downPayment }) {
  if (!store || !method) {
    throw new Error("روش فروش موجود نیست.");
  }

  const principal = Number(amount);
  const term = Number(months);
  const down = Math.round(Number(downPayment));

  if (!Number.isFinite(principal) || principal <= 0) {
    throw new Error("مبلغ کالا معتبر نیست.");
  }

  if (!Array.isArray(method.months) || !method.months.includes(term)) {
    throw new Error("تعداد اقساط با این روش سازگار نیست.");
  }

  const minimumDownPayment = Math.round(
    principal * Math.max(Number(store.minDown), Number(method.minDown)) / 100,
  );

  if (!Number.isFinite(down) || down < minimumDownPayment || down >= principal) {
    throw new Error("مبلغ نقدی باید حداقل برابر پیش‌پرداخت و کمتر از قیمت کالا باشد.");
  }

  const remainder = principal - down;
  if (remainder > Number(method.maxFinancing)) {
    throw new Error("مانده اقساط از سقف این روش بیشتر است.");
  }

  const rate = Number(store.plans?.[term]);
  if (!Number.isFinite(rate) || rate < 0) {
    throw new Error("درصد طرح معتبر نیست.");
  }

  const markup = Math.round((remainder * rate) / 100);
  const payable = remainder + markup;
  const monthly = Math.floor(payable / term);

  return {
    amount: principal,
    downAmount: down,
    remainder,
    markup,
    rate,
    payable,
    months: term,
    monthly,
    last: payable - monthly * (term - 1),
    total: down + payable,
  };
}

export function getDefaultInstallmentQuote(amount, store, method) {
  if (!store || !method || !Array.isArray(method.months) || method.months.length === 0) {
    throw new Error("روش فروش معتبر نیست.");
  }

  const months = method.months.includes(6) ? 6 : method.months[0];
  const minimumRate = Math.max(Number(store.minDown), Number(method.minDown));
  const minimumDownPayment = Math.ceil((Number(amount) * minimumRate) / 100);
  const downPayment = Math.min(
    Number(amount) - 1,
    Math.max(minimumDownPayment, Number(amount) - Number(method.maxFinancing)),
  );

  return calculateInstallmentQuote({
    amount,
    store,
    method,
    months,
    downPayment,
  });
}

export function getMethodFees(methodId) {
  return (CREDIT_METHODS.has(methodId) ? 39000 : 0) +
    (CHEQUE_METHODS.has(methodId) ? 25000 : 0);
}
