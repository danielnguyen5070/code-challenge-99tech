"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const tokens = [
	{
		symbol: "USDC",
		name: "USDC",
		icon: "💵",
		color: "bg-blue-500",
	},
	{
		symbol: "USDT",
		name: "Tether USD",
		icon: "₮",
		color: "bg-green-500",
	},
	{
		symbol: "WBTC",
		name: "Wrapped BTC",
		icon: "₿",
		color: "bg-orange-500",
	},
	{
		symbol: "WETH",
		name: "Wrapped Ether",
		icon: "Ξ",
		color: "bg-purple-500",
	},
	{
		symbol: "FDUSD",
		name: "First Digital USD",
		icon: "F",
		color: "bg-gray-700",
	},
	{
		symbol: "PEPE",
		name: "Pepe",
		icon: "🐸",
		color: "bg-green-600",
	},
];

export default function Component() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedToken, setSelectedToken] =
		(useState < String) | (null > null);

	const filteredTokens = tokens.filter(
		(token) =>
			token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
			token.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className="w-full max-w-md mx-auto bg-gray-900 rounded-lg p-4 text-white">
			{/* Search Input */}
			<div className="relative mb-4">
				<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
				<Input
					type="text"
					placeholder="Search name or paste address"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-400 pl-10 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
				/>
			</div>

			{/* Token List */}
			<div className="space-y-2">
				{filteredTokens.map((token) => (
					<div
						key={token.symbol}
						onClick={() => setSelectedToken(token.symbol)}
						className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-800 ${
							selectedToken === token.symbol
								? "bg-gray-800 ring-1 ring-blue-500"
								: "bg-gray-850"
						}`}
					>
						{/* Token Icon */}
						<div
							className={`w-10 h-10 rounded-full ${token.color} flex items-center justify-center text-white font-bold mr-3 text-sm`}
						>
							{token.icon}
						</div>

						{/* Token Info */}
						<div className="flex-1">
							<div className="font-semibold text-white text-base">
								{token.symbol}
							</div>
							<div className="text-gray-400 text-sm">
								{token.name}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* No Results */}
			{filteredTokens.length === 0 && (
				<div className="text-center py-8 text-gray-400">
					No tokens found
				</div>
			)}
		</div>
	);
}
