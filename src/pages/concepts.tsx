import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Concepts() {
  const concepts = [
    {
      title: "Web2 vs Web3",
      left: {
        heading: "Web2 (Read/Write)",
        points: [
          "Centralized platforms (Big Tech)",
          "You are the product (data is monetized)",
          "Requires trust in corporations",
          "Accounts tied to emails and passwords",
        ]
      },
      right: {
        heading: "Web3 (Read/Write/Own)",
        points: [
          "Decentralized networks (Blockchains)",
          "You control your own assets and data",
          "Trustless systems (math and cryptography)",
          "Accounts tied to self-custodied wallets",
        ]
      }
    },
    {
      title: "Ethereum vs Bitcoin",
      left: {
        heading: "Bitcoin (Digital Gold)",
        points: [
          "Primary focus: Store of value & payments",
          "Scripting: Limited, purposefully simple",
          "Consensus: Proof of Work (PoW)",
          "Block time: ~10 minutes",
        ]
      },
      right: {
        heading: "Ethereum (World Computer)",
        points: [
          "Primary focus: Decentralized applications",
          "Scripting: Turing-complete smart contracts",
          "Consensus: Proof of Stake (PoS)",
          "Block time: ~12 seconds",
        ]
      }
    },
    {
      title: "Public Key vs Private Key",
      left: {
        heading: "Public Key",
        points: [
          "Like your bank account number",
          "Safe to share with anyone",
          "Used by others to send you funds",
          "Can be derived from your private key",
        ]
      },
      right: {
        heading: "Private Key",
        points: [
          "Like your ATM PIN or password",
          "Must be kept secret forever",
          "Used to authorize and sign transactions",
          "Cannot be derived from your public key",
        ]
      }
    },
    {
      title: "Blockchain vs Traditional Database",
      left: {
        heading: "Traditional Database",
        points: [
          "Controlled by a single administrator",
          "Data can be modified or deleted freely",
          "Optimized for high speed and volume",
          "Prone to single points of failure",
        ]
      },
      right: {
        heading: "Blockchain",
        points: [
          "Maintained by a distributed network of nodes",
          "Append-only: data is immutable once confirmed",
          "Slower, requires consensus mechanisms",
          "Highly resilient and censorship-resistant",
        ]
      }
    }
  ];

  return (
    <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-4 text-center max-w-2xl mx-auto pt-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Core Concepts</h1>
        <p className="text-lg text-muted-foreground">
          Understanding the fundamentals of Web3 is crucial for building robust decentralized applications.
        </p>
      </div>

      <div className="grid gap-8">
        {concepts.map((concept, i) => (
          <Card key={i} className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
              <CardTitle className="text-2xl">{concept.title}</CardTitle>
              <CardDescription>A simple comparison to clarify the distinctions.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/50">
                <div className="p-6 flex flex-col gap-4">
                  <h3 className="font-bold text-lg text-foreground">{concept.left.heading}</h3>
                  <ul className="flex flex-col gap-3">
                    {concept.left.points.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40 mt-1.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 flex flex-col gap-4 bg-primary/5">
                  <h3 className="font-bold text-lg text-primary">{concept.right.heading}</h3>
                  <ul className="flex flex-col gap-3">
                    {concept.right.points.map((point, j) => (
                      <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
