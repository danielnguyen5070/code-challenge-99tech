1. interface: duplicates these two fields `currency and amount`

```tsx
interface WalletBalance {
  currency: string;
  amount: number;
}

interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

---------------- to ----------------

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```

2. Incorrect / Inefficient Logic in useMemo

- lhsPriority is undefined. It's likely meant to be balancePriority.

```tsx
if (lhsPriority > -99) {}
```

- The logic is inverted. currently it returns true only if the -99 < amount <= 0 

```tsx
if (lhsPriority > -99) {
    if (balance.amount <= 0) {
        return true;
    }
}
```

- `getPriority` is called multiple times (inside both filter and sort), causing repeated computation.
- prices is not used in `useMemo` — it’s misleading to include it as a dependency
- Row: Wrong Type Used in sortedBalances.map(). `sortedBalances` only has `WalletBalance`

```tsx
const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
		if (lhsPriority > -99) {
		    if (balance.amount <= 0) {
		        return true;
		    }
		}
		return false
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
		    const leftPriority = getPriority(lhs.blockchain);
		    const rightPriority = getPriority(rhs.blockchain);
		    if (leftPriority > rightPriority) {
		        return -1;
		    } else if (rightPriority > leftPriority) {
		        return 1;
		    }
        });
  }, [balances, prices]);

const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
})

============================================ to =========================================

// add priority to FormattedWalletBalance
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
}

const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
  return balances
    .map((balance) => ({
      ...balance,
      priority: getPriority(balance.blockchain),
    }))
    .filter((balance) => balance.priority > -99 && balance.amount > 0)
    .sort((a, b) => b.priority - a.priority)
    .map((balance) => ({
      ...balance,
      formatted: balance.amount.toFixed(),
    }));
}, [balances]);
```

3. Using `index` as key

- React uses `key` to track elements across renders. Index will change every render, can not use it for `key`
- if dont have a `unit key` react don't know which item removed or add new. So React will get lead to unexpected update incorrect

```tsx
<WalletRow 
    className={classes.row}
    key={index}
```

4.  Function Definition Inside Component

- This creates a new getPriority function on every render.

```tsx
const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis': return 100;
      case 'Ethereum': return 50;
      ...
    }
};

// Define Pure Utility Functions Outside
// utils/getPriority.ts
export const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case 'Osmosis': return 100;
    case 'Ethereum': return 50;
    case 'Arbitrum': return 30;
    case 'Zilliqa':
    case 'Neo': return 20;
    default: return -99;
  }
};
```

5. Improvements Applied

```tsx
// src/utils/getPriority.ts

export const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis": return 100;
    case "Ethereum": return 50;
    case "Arbitrum": return 30;
    case "Zilliqa":
    case "Neo": return 20;
    default: return -99;
  }
};


// WalletPage.tsx

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  priority: number;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const formattedBalances: FormattedWalletBalance[] = useMemo(() => {
    return balances
      .map((balance) => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .filter((balance) => balance.priority > -99 && balance.amount > 0)
      .sort((a, b) => b.priority - a.priority)
      .map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(),
      }));
  }, [balances]);

  const rows = formattedBalances.map((balance) => {
    const usdValue = prices[balance.currency] * balance.amount;

    return (
      <WalletRow
        key={balance.currency} // Assumes currency is unique
        className={classes.row}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return (
    <div {...rest}>
      {rows}
    </div>
  );
};

export default WalletPage;
```