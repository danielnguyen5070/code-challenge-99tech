"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";
import { Search } from "lucide-react";
import type { RefFocus, Token, TokenList } from "@/types/swap";
import { createPortal } from "react-dom";

type Position = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};
export default function App({
  setIsSwapOpen,
  tokens,
  setToken,
  ref,
}: {
  setIsSwapOpen: (isOpen: boolean) => void;
  tokens: TokenList;
  setToken: (token: Token | null) => void;
  ref: React.RefObject<RefFocus | null>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchPosition, setSearchPosition] = useState<Position | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tokenListRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close the search box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        tokenListRef.current &&
        !tokenListRef.current.contains(event.target as Node)
      ) {
        setIsSwapOpen(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSwapOpen]);

  const filteredTokens = tokens.filter((token) =>
    token.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useLayoutEffect(() => {
    if (searchRef.current) {
      const rect = searchRef.current.getBoundingClientRect();
      setSearchPosition({
        top: rect.top,
        left: rect.left,
        bottom: rect.bottom,
        right: rect.right,
      });
    }
  }, [searchRef]);

  let scrollX = 0;
  let scrollY = 0;
  if (searchPosition) {
    scrollX = window.scrollX + searchPosition.left;
    scrollY = window.scrollY + searchPosition.top;
  }

  function handleChangeToken(token: Token | null) {
    setToken(token);
    setIsSwapOpen(true);
  }

  useImperativeHandle(ref, () => ({
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return (
    <div className="w-full" ref={containerRef}>
      {/* Search Input */}
      <div
        className="flex h-16 max-w-md rounded-lg text-white bg-gray-800 border-gray-700"
        ref={searchRef}
      >
        <div className="border-r-2 px-4 flex items-center justify-center border-gray-700">
          <Search className=" text-gray-400 " />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full  text-white placeholder-gray-400 pl-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Token List */}
      {searchPosition &&
        createPortal(
          <div
            ref={tokenListRef}
            className="space-y-2 bg-gray-800 rounded-lg max-h-96 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-slate-700 scrollbar-track-slate-300 overflow-y-auto text-white"
            style={{
              position: "absolute",
              top: scrollY + 70, // Adjust for the height of the search input
              left: scrollX,
              width: searchPosition
                ? searchPosition.right - searchPosition.left
                : "0%",
            }}
          >
            {filteredTokens.map((token) => (
              <div
                key={token.currency + token.price}
                onClick={() => handleChangeToken(token)}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800`}
              >
                {/* Token Icon */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold mr-3 text-sm`}
                >
                  <img
                    src={`/public/tokens/${token.currency.toUpperCase()}.svg`}
                    alt={token.currency}
                    className="w-full h-full rounded-full"
                  />
                </div>

                {/* Token Info */}
                <div className="flex-1">
                  <div className="font-semibold text-white text-base">
                    {token.currency}
                  </div>
                  <div className="text-gray-400 text-sm">{token.price}</div>
                </div>
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
}
