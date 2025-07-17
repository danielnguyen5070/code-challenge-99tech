"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function Component() {
	const [swapAmount, setSwapAmount] = useState("6");
	const [fromToken, setFromToken] = useState("DAI");
	const [toToken, setToToken] = useState("USDC");

	const handleSwapTokens = () => {
		const temp = fromToken;
		setFromToken(toToken);
		setToToken(temp);
	};

	return (
		<div className="min-h-screen bg-black flex items-center justify-center p-4">
			<Card className="w-full max-w-md bg-gray-900 border-gray-800">
				<CardContent className="p-6 space-y-6">
					{/* Network Selector */}
					<Select defaultValue="ethereum">
						<SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
							<div className="flex items-center gap-2">
								<div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
									<div className="w-3 h-3 bg-blue-500 rounded-full"></div>
								</div>
								<SelectValue placeholder="Select network" />
							</div>
						</SelectTrigger>
						<SelectContent className="bg-gray-800 border-gray-700">
							<SelectItem value="ethereum" className="text-white">
								Ethereum
							</SelectItem>
							<SelectItem value="polygon" className="text-white">
								Polygon
							</SelectItem>
							<SelectItem value="bsc" className="text-white">
								BSC
							</SelectItem>
						</SelectContent>
					</Select>

					{/* Swap From Section */}
					<div className="space-y-2">
						<label className="text-white font-medium">
							Swap from
						</label>
						<div className="flex gap-2">
							<Select
								value={fromToken}
								onValueChange={setFromToken}
							>
								<SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
											D
										</div>
										<SelectValue />
									</div>
								</SelectTrigger>
								<SelectContent className="bg-gray-800 border-gray-700">
									<SelectItem
										value="DAI"
										className="text-white"
									>
										<div className="flex items-center gap-2">
											<div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
												D
											</div>
											DAI
										</div>
									</SelectItem>
									<SelectItem
										value="USDC"
										className="text-white"
									>
										<div className="flex items-center gap-2">
											<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
												$
											</div>
											USDC
										</div>
									</SelectItem>
									<SelectItem
										value="ETH"
										className="text-white"
									>
										<div className="flex items-center gap-2">
											<div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
												E
											</div>
											ETH
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
							<Input
								value={swapAmount}
								onChange={(e) => setSwapAmount(e.target.value)}
								className="flex-1 bg-gray-800 border-gray-700 text-white text-right"
								placeholder="0"
							/>
							<div className="flex items-center text-gray-400 text-sm min-w-16">
								~$6.00
							</div>
						</div>
					</div>

					{/* Swap Direction Button */}
					<div className="flex justify-end">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleSwapTokens}
							className="text-gray-400 hover:text-white hover:bg-gray-800"
						>
							<ArrowUpDown className="w-4 h-4" />
						</Button>
					</div>

					{/* Swap To Section */}
					<div className="space-y-2">
						<label className="text-white font-medium">
							Swap to
						</label>
						<Select value={toToken} onValueChange={setToToken}>
							<SelectTrigger className="w-full bg-gray-800 border-gray-700 text-white">
								<div className="flex items-center gap-2">
									<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
										$
									</div>
									<SelectValue />
								</div>
							</SelectTrigger>
							<SelectContent className="bg-gray-800 border-gray-700">
								<SelectItem value="USDC" className="text-white">
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
											$
										</div>
										USDC
									</div>
								</SelectItem>
								<SelectItem value="DAI" className="text-white">
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
											D
										</div>
										DAI
									</div>
								</SelectItem>
								<SelectItem value="ETH" className="text-white">
									<div className="flex items-center gap-2">
										<div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
											E
										</div>
										ETH
									</div>
								</SelectItem>
							</SelectContent>
						</Select>

						{/* Token Verification Notice */}
						<div className="flex items-start gap-2 text-xs text-gray-400">
							<Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
							<span>
								<span className="text-blue-400">
									USDC verified on 16 sources.
								</span>{" "}
								Always confirm the token address on a block
								explorer.
							</span>
						</div>
					</div>
					{/* Get Quotes Button */}
					<Button className="w-full bg-white text-black hover:bg-gray-200 font-medium">
						Get Quotes
					</Button>

					{/* Terms of Service */}
					<div className="text-center">
						<a
							href="#"
							className="text-blue-400 text-sm hover:underline"
						>
							Terms of Service
						</a>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
