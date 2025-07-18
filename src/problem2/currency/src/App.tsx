"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpDown, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import SwapFrom, { EnterAmount } from "./components/SwapFrom";
import SwapTo, { DisplayCurrency } from "./components/SwapTo";
import SearchBox from "./components/SearchBox";
import axios from "axios";
import type { RefFocus, Token, TokenList } from "./types/swap";
import { swapBetweenCurrencies } from "./utils/amount";
import { ToastContainer, toast } from "react-toastify";
import { flushSync } from "react-dom";

const priceURL = "https://interview.switcheo.com/prices.json";

export default function Component() {
  const [tokens, setTokens] = useState<TokenList>([]);
  const [amount, setAmount] = useState(1);
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);

  const [isSwapFromOpen, setIsSwapFromOpen] = useState(true);
  const [isSwapToOpen, setIsSwapToOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const searchRefFrom = useRef<RefFocus>(null);
  const searchRefTo = useRef<RefFocus>(null);
  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  useEffect(() => {
    axios.get(priceURL).then((res) => {
      const data = res.data;
      const tokenMap = new Map<
        string,
        { currency: string; date: string; price: number }
      >();

      // Keep only the first entry per currency
      for (const key in data) {
        const { currency, date, price } = data[key];
        if (!tokenMap.has(currency)) {
          tokenMap.set(currency, { currency, date, price });
        }
      }

      const deduplicatedTokens = Array.from(tokenMap.values()).map((token) => ({
        ...token,
        price: token.price.toString(),
      }));

      setTokens(deduplicatedTokens);

      if (deduplicatedTokens.length >= 2) {
        setFromToken(deduplicatedTokens[0]);
        setToToken(deduplicatedTokens[1]);
      }
    });
  }, []);

  const amountTo = swapBetweenCurrencies(
    tokens,
    amount,
    fromToken?.currency || "",
    toToken?.currency || ""
  );

  const handleSubmitSwap = () => {
    if (!fromToken || !toToken) return;
    setIsLoading(true);

    setTimeout(() => {
      console.log("Swap submitted:", { fromToken, toToken });
      setIsLoading(false);

      toast.success("Swap submitted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }, 2000); // 2 second delay to simulate API response
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <Card
        className="w-full max-w-md bg-gray-900 border-gray-800"
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >
        <CardContent className="p-6 space-y-6">
          {/* Network Selector */}
          <div className="flex items-center justify-start mb-8 bg-black rounded-lg px-3 py-3 opacity-65">
            <p className="text-gray-500 font-bold bg-amber-400 rounded-full w-6 h-6 flex items-center justify-center ml-2">
              B
            </p>
            <p className="text-gray-500 text-lg font-semibold ml-2">
              user: Bc6d6965C21F79
            </p>
          </div>

          {/* Swap From Section */}
          <p className="text-white font-medium mb-3">Swap from</p>
          <SwapFrom
            children={
              isSwapFromOpen ? (
                <EnterAmount
                  setIsSwapOpen={() => {
                    flushSync(() => {
                      setIsSwapFromOpen(false);
                    });
                    if (searchRefFrom.current) {
                      searchRefFrom.current.focus();
                    }
                  }}
                  token={fromToken}
                  amount={amount}
                  setAmount={setAmount}
                />
              ) : (
                <SearchBox
                  setIsSwapOpen={setIsSwapFromOpen}
                  tokens={tokens.filter(
                    (token) => token.currency !== toToken?.currency
                  )}
                  setToken={setFromToken}
                  ref={searchRefFrom}
                />
              )
            }
          />

          {/* Swap Direction Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSwapTokens}
              className="text-gray-400 hover:text-white hover:bg-gray-800 mt-4"
            >
              <ArrowUpDown className="w-5 h-5" />
            </button>
          </div>

          {/* Swap To Section */}
          <p className="text-white font-medium mb-3">Swap to</p>
          <SwapTo
            children={
              isSwapToOpen ? (
                <DisplayCurrency
                  setIsSwapOpen={() => {
                    flushSync(() => {
                      setIsSwapToOpen(false);
                    });
                    if (searchRefTo.current) {
                      searchRefTo.current.focus();
                    }
                  }}
                  token={toToken}
                />
              ) : (
                <SearchBox
                  setIsSwapOpen={setIsSwapToOpen}
                  tokens={tokens.filter(
                    (token) => token.currency !== fromToken?.currency
                  )}
                  setToken={setToToken}
                  ref={searchRefTo}
                />
              )
            }
          />
          <p className="text-gray-200 font-medium text-2xl -mt-4">{amountTo}</p>

          {/* Token Verification Notice */}
          <div className="flex items-start gap-2 text-xs text-gray-400">
            <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
            <span>
              <span className="text-blue-400">
                USDC verified on 16 sources.
              </span>{" "}
              Always confirm the token address on a block explorer.
            </span>
          </div>

          {/* Get Quotes Button */}
          <button
            className="w-full bg-white text-black hover:bg-gray-200 font-medium rounded py-4"
            onClick={handleSubmitSwap}
          >
            SUBMIT SWAP
          </button>

          {/* Terms of Service */}
          <div className="text-center">
            <a href="#" className="text-blue-400 text-sm hover:underline">
              Terms of Service
            </a>
          </div>
        </CardContent>
      </Card>
      <ToastContainer />
    </div>
  );
}
