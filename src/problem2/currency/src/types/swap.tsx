export type SwapFromProps = { setIsSwapOpen: (isOpen: boolean) => void };

export type Token = {
  currency: string;
  date: string;
  price: string;
};

export type TokenList = Array<Token>;

export type RefFocus = {
  focus: () => void;
};
