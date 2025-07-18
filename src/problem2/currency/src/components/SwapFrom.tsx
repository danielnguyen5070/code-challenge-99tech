import type { Token } from "@/types/swap";
import { ChevronDown } from "lucide-react";

function SwapFrom({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function EnterAmount({
  setIsSwapOpen,
  token,
  amount,
  setAmount,
}: {
  setIsSwapOpen: (swapOpen: boolean) => void;
  token: Token | null;
  amount: number;
  setAmount: (amount: number) => void;
}) {
  const price = parseFloat(token?.price || "0").toFixed(6);
  return (
    <div className="space-y-2">
      <div className="flex h-16">
        <div
          onClick={() => setIsSwapOpen(false)}
          className="cursor-pointer bg-gray-800 border-gray-700 rounded-l-lg px-3 flex items-center justify-between border-r-2"
        >
          <div className="flex flex-row justify-between items-center gap-2 min-w-40">
            <div className="flex">
              <img
                className="w-10 h-10 rounded-full flex items-center justify-center"
                src={`/public/tokens/${token?.currency}.svg`}
              ></img>
              <div className="text-white text-xl m-auto ml-3">
                {token?.currency}
              </div>
            </div>
            <button className="text-white hover:bg-gray-800 ">
              <ChevronDown className={`w-6 h-6 ml-2`} />
            </button>
          </div>
        </div>
        <div className="w-full relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full bg-gray-800 border-gray-700 text-xl text-white h-full rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left px-3"
            placeholder="0"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm min-w-16">
            ~ {price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapFrom;
