import type { Token } from "@/types/swap";

export function swapBetweenCurrencies(
  data: Token[],
  amount: number,
  fromCurrency: string,
  toCurrency: string
): number | null {
  // Step 1: Find latest price for each currency
  const latestPrices = new Map<string, Token>();

  for (const entry of data) {
    const current = latestPrices.get(entry.currency);
    if (!current || new Date(entry.date) > new Date(current.date)) {
      latestPrices.set(entry.currency, entry);
    }
  }

  // Step 2: Get price for from/to currencies
  const from = latestPrices.get(fromCurrency);
  const to = latestPrices.get(toCurrency);

  if (!from || !to) {
    console.error("Missing price for:", !from ? fromCurrency : toCurrency);
    return null;
  }

  // Step 3: Convert from → USD → to
  const usdAmount = amount * Number(from.price);
  const convertedAmount = usdAmount / Number(to.price);

  return convertedAmount;
}
