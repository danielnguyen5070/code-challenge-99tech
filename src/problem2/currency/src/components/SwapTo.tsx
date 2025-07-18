import type { SwapFromProps, Token } from "@/types/swap";
import { ChevronDown } from "lucide-react";

function SwapTo({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function DisplayCurrency({
  setIsSwapOpen,
  token,
}: SwapFromProps & { token: Token | null }) {
  return (
    <div className="space-y-2">
      <div className="flex h-16">
        <div
          onClick={() => setIsSwapOpen(false)}
          className="cursor-pointer w-full bg-gray-800 border-gray-700 rounded-lg px-3 flex items-center justify-between"
        >
          <div className="flex flex-row justify-between items-center gap-2 w-full">
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
              <ChevronDown className={`w-6 h-6 ml-2 transition-transform`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SwapTo;
