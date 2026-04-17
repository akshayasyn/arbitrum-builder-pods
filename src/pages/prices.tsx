import { useState, useEffect } from "react";
import { RefreshCw, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CoinData {
  usd: number;
  usd_24h_change: number;
}

interface PriceData {
  ethereum?: CoinData;
  bitcoin?: CoinData;
  solana?: CoinData;
  arbitrum?: CoinData;
}

export default function Prices() {
  const [data, setData] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin,solana,arbitrum&vs_currencies=usd&include_24hr_change=true"
      );
      if (!response.ok) throw new Error("Failed to fetch prices");
      const jsonData = await response.json();
      setData(jsonData);
      setLastUpdated(new Date());
    } catch (err) {
      setError("Unable to connect to CoinGecko API. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 4 : 2,
      maximumFractionDigits: price < 1 ? 4 : 2,
    }).format(price);
  };

  const formatChange = (change: number) => {
    return `${Math.abs(change).toFixed(2)}%`;
  };

  const coins = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" },
    { id: "arbitrum", name: "Arbitrum", symbol: "ARB" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Live Prices</h1>
          <p className="text-lg text-muted-foreground">
            Real-time market data fetched from CoinGecko.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {lastUpdated && (
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          )}
          <Button 
            onClick={fetchPrices} 
            disabled={loading}
            className="w-full md:w-auto"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-6 flex flex-col items-center justify-center text-center gap-3 text-destructive">
          <AlertCircle className="h-8 w-8" />
          <p className="font-medium">{error}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {coins.map((coin) => {
            const coinData = data?.[coin.id as keyof PriceData];
            const isPositive = coinData && coinData.usd_24h_change >= 0;

            return (
              <Card key={coin.id} className="overflow-hidden border-border/50 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{coin.name}</span>
                    <span className="text-xs font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {coin.symbol}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {loading && !data ? (
                    <div className="space-y-2 mt-2">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ) : coinData ? (
                    <div className="flex flex-col gap-1 mt-1">
                      <span className="text-2xl font-bold tracking-tight">
                        {formatPrice(coinData.usd)}
                      </span>
                      <div className={`flex items-center text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                        {isPositive ? (
                          <TrendingUp className="mr-1 h-3.5 w-3.5" />
                        ) : (
                          <TrendingDown className="mr-1 h-3.5 w-3.5" />
                        )}
                        {formatChange(coinData.usd_24h_change)} (24h)
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground mt-2">Data unavailable</div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
