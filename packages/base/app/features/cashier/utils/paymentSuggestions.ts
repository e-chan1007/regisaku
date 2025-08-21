const COINS = [1, 5, 10, 50, 100, 500] as const;
const BILLS = [1000, 5000, 10000] as const;
const DENOMINATIONS = [...COINS, ...BILLS].sort((a, b) => b - a);

/**
 * 支払いに必要な最小の通貨枚数を計算
 */
const countDenominations = (amount: number): number => {
  let count = 0;
  let remaining = amount;
  for (const denom of DENOMINATIONS) {
    if (remaining < denom) continue;
    const num = Math.floor(remaining / denom);
    count += num;
    remaining -= num * denom;
  }
  return count;
};

/**
 * 支払いパターンの候補を提案
 */
export const generatePaymentSuggestions = (price: number): number[] => {
  if (price <= 0) return [];

  const candidates = new Set<number>();

  // ぴったり払い
  candidates.add(price);

  // キリの良い金額で支払う
  const roundingUnits = [5, 10, 50, 100, 500, 1000, 5000, 10000];
  for (const unit of roundingUnits) {
    const payment = Math.ceil(price / unit) * unit;
    if (payment > price) candidates.add(payment);
  }

  const base1000 = Math.floor(price / 1000) * 1000;
  for (const plusAmount of [500, 1500]) {
    const payment = base1000 + plusAmount;
    if (payment > price && payment < base1000 + 2000) candidates.add(payment);
  }

  // お釣りの最適化
  const remainder100 = price % 100;
  if (remainder100 !== 0) {
    const nextBill = BILLS.find((bill) => bill > price);
    if (nextBill) candidates.add(nextBill + remainder100);
    const base100 = Math.floor(price / 100) * 100;
    const next100 = base100 + 100;
    for (let i = 0; i < 10; i++) {
      const payment = next100 + i * 5 + (price % 5);
      if (payment > price && payment < next100 + 50) candidates.add(payment);
    }
  }

  const base5 = Math.floor(price / 5) * 5;
  if (price % 5 !== 0) {
    for (let i = 1; i < 10; i++) {
      const payment = base5 + i * 5 + (price % 5);
      if (payment - price < 50) candidates.add(payment);
    }
  }

  const candidateInfo = Array.from(candidates).map((p) => ({
    payment: p,
    payCount: countDenominations(p),
    changeCount: countDenominations(p - price),
  }));

  const COMPETITION_THRESHOLD = 100;

  const finalSuggestions = candidateInfo.filter((candidate) => {
    const isDominated = candidateInfo.some((other) => {
      if (candidate.payment === other.payment) return false;

      if (
        Math.abs(candidate.payment - other.payment) >= COMPETITION_THRESHOLD
      ) {
        return false;
      }

      const isOtherSuperior =
        other.payCount <= candidate.payCount &&
        other.changeCount <= candidate.changeCount;

      const isOtherStrictlySuperior =
        other.payCount < candidate.payCount ||
        other.changeCount < candidate.changeCount;

      return isOtherSuperior && isOtherStrictlySuperior;
    });

    return !isDominated;
  });

  return finalSuggestions.map((c) => c.payment).sort((a, b) => a - b);
};
