import { Link } from "wouter";
import { ArrowRight, Zap, Shield, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 pt-8 md:pt-16">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          <Zap className="mr-2 h-3.5 w-3.5" />
          Layer 2 Scaling Solution
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl text-balance">
          Scale Ethereum with <span className="text-primary">Arbitrum</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl text-balance">
          Welcome to the Arbitrum Builder Pods lab. Explore the core concepts of Web3, monitor live prices, and mine your first block in our interactive simulator.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/simulator">
              Try the Simulator
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8">
            <Link href="/concepts">
              Learn Concepts
            </Link>
          </Button>
        </div>
      </section>

      {/* Why Layer 2? Section */}
      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-4 order-2 md:order-1">
          <h2 className="text-3xl font-bold tracking-tight">Why Ethereum needed Layer 2</h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Ethereum is incredibly secure and decentralized, but mainnet capacity is limited to roughly 15 transactions per second. During periods of high demand, network congestion leads to slow confirmation times and prohibitively expensive gas fees.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Layer 2 solutions were created to solve this scalability trilemma. By processing transactions off-chain and only settling the final proofs on Ethereum mainnet, Layer 2s drastically increase throughput and reduce costs without sacrificing base-layer security.
          </p>
        </div>
        <div className="order-1 md:order-2 bg-gradient-to-br from-primary/20 via-primary/5 to-background rounded-3xl p-8 border border-primary/10 relative overflow-hidden h-full min-h-[300px] flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <div className="h-16 w-16 rounded-2xl bg-background border border-border flex items-center justify-center shadow-lg">
              <Blocks className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">The Scalability Trilemma</h3>
            <p className="text-sm text-muted-foreground max-w-[250px]">Security, Decentralization, Scalability. Pick two.</p>
          </div>
        </div>
      </section>

      {/* What is Arbitrum Section */}
      <section className="flex flex-col gap-10 bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
        <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">What is Arbitrum?</h2>
          <p className="text-muted-foreground text-lg">
            Arbitrum is an Optimistic Rollup that scales Ethereum. It assumes transactions are valid by default and only runs computation if someone challenges the results, leading to massive efficiency gains.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 pt-4">
          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors shadow-sm">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">Transactions confirm almost instantly compared to Ethereum mainnet's 12-second block time.</p>
          </div>
          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors shadow-sm">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Blocks className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Fractional Cost</h3>
            <p className="text-sm text-muted-foreground">Gas fees are often pennies rather than dollars, opening up entirely new use cases for dApps.</p>
          </div>
          <div className="flex flex-col gap-3 p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-colors shadow-sm">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Ethereum Security</h3>
            <p className="text-sm text-muted-foreground">Derives its security directly from Ethereum mainnet through interactive fraud proofs.</p>
          </div>
        </div>
      </section>

      {/* Real-World Benefit */}
      <section className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto pb-8 md:pb-16">
        <h2 className="text-3xl font-bold tracking-tight">Real-World Benefit</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Because Arbitrum drastically lowers the cost of interacting with smart contracts, high-frequency decentralized applications like perpetual exchanges, dynamic gaming economies, and complex DAOs can operate entirely on-chain without pricing out their users.
        </p>
      </section>
    </div>
  );
}
